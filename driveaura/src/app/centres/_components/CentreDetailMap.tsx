"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

import type {
  DrivingCentre,
  LatLng,
  TestRoute,
} from "../../../../constants/driving-centres";
import { LeafletInvalidateSize } from "./LeafletInvalidateSize";
import { LeafletAutoView } from "./LeafletAutoView";

function toLeafletLatLng(latlng: LatLng): [number, number] {
  return [latlng.lat, latlng.lng];
}

function routeColor(testType: TestRoute["testType"]): string {
  return testType === "G" ? "#2563eb" /* blue-600 */ : "#10b981" /* emerald-500 */;
}

export function CentreDetailMap({
  centre,
  activeRouteId,
  activeHighlightId,
}: {
  centre: DrivingCentre;
  activeRouteId?: string | null;
  activeHighlightId?: string | null;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Default = (L.Icon.Default as any);
    Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
    setReady(true);
  }, []);

  const activeRoute = useMemo(
    () => centre.routes.find((r) => r.id === activeRouteId) ?? null,
    [centre.routes, activeRouteId],
  );

  const activeHighlight = useMemo(() => {
    if (!activeRoute || !activeHighlightId) return null;
    return activeRoute.highlights.find((h) => h.id === activeHighlightId) ?? null;
  }, [activeRoute, activeHighlightId]);

  const highlightPins = useMemo(() => {
    if (!activeRoute) return [];
    return activeRoute.highlights
      .filter((h) => h.location)
      .map((h) => ({
        id: h.id,
        title: h.title,
        severity: h.severity,
        location: h.location!,
      }));
  }, [activeRoute]);

  if (!ready) {
    return (
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="animate-pulse p-4">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="mt-3 h-[360px] w-full rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="h-[420px] w-full">
        <MapContainer
          center={toLeafletLatLng(centre.coordinates)}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <LeafletInvalidateSize trigger={activeRouteId ?? ""} />
          <LeafletAutoView
            center={
              activeHighlight?.location
                ? [activeHighlight.location.lat, activeHighlight.location.lng]
                : [centre.coordinates.lat, centre.coordinates.lng]
            }
            points={
              activeRoute?.path?.length
                ? activeRoute.path.map((p) => [p.lat, p.lng] as const)
                : undefined
            }
            trigger={`${String(activeRouteId ?? "")}:${String(activeHighlightId ?? "")}`}
            zoom={14}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={toLeafletLatLng(centre.coordinates)}>
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">{centre.name}</p>
                <p className="text-xs">{centre.addressLine1}</p>
              </div>
            </Popup>
          </Marker>

          {centre.routes.map((route) => {
            const isActive = activeRoute ? activeRoute.id === route.id : false;
            return (
              <Polyline
                key={route.id}
                positions={route.path.map(toLeafletLatLng)}
                pathOptions={{
                  color: routeColor(route.testType),
                  weight: isActive ? 7 : 4,
                  opacity: isActive ? 0.95 : 0.55,
                }}
              />
            );
          })}

          {highlightPins.map((pin) => {
            const isActive = pin.id === activeHighlightId;
            const color =
              pin.severity === "must-do"
                ? "#10b981"
                : pin.severity === "common-mistake"
                  ? "#f43f5e"
                  : "#f59e0b";
            const icon = L.divIcon({
              className: "",
              html: `<div style="
                width: ${isActive ? 14 : 10}px;
                height: ${isActive ? 14 : 10}px;
                border-radius: 9999px;
                background: ${color};
                border: 2px solid rgba(255,255,255,0.9);
                box-shadow: 0 8px 24px rgba(0,0,0,0.25);
              "></div>`,
              iconSize: [isActive ? 14 : 10, isActive ? 14 : 10],
              iconAnchor: [7, 7],
            });
            return (
              <Marker
                key={pin.id}
                position={toLeafletLatLng(pin.location)}
                icon={icon}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-semibold">{pin.title}</p>
                    <p className="text-xs">{pin.severity.replace("-", " ")}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <div className="border-t border-slate-200 px-4 py-3">
        <p className="text-sm font-semibold text-slate-950">
          Practice routes
        </p>
        <p className="mt-1 text-xs text-slate-600">
          Green = G2 routes · Blue = G routes. Tap a route below to highlight it.
        </p>
      </div>
    </div>
  );
}

