"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { MapPin } from "lucide-react";

import type { DrivingCentre, LatLng, TestRoute } from "../../../../constants/driving-centres";
import { LeafletInvalidateSize } from "./LeafletInvalidateSize";
import { LeafletAutoView } from "./LeafletAutoView";

function toLeafletLatLng(latlng: LatLng): [number, number] {
  return [latlng.lat, latlng.lng];
}

function routeColor(testType: TestRoute["testType"]): string {
  return testType === "G" ? "#2563eb" /* blue-600 */ : "#10b981" /* emerald-500 */;
}

export function CentresMap({
  centres,
  selectedCentreId,
  showRoutesForSelected = true,
  className,
  invalidateKey,
}: {
  centres: DrivingCentre[];
  selectedCentreId?: string | null;
  showRoutesForSelected?: boolean;
  className?: string;
  /**
   * Changes to this value will force Leaflet to recalc layout (fixes mobile toggle).
   */
  invalidateKey?: string | number | boolean;
}) {
  const [ready, setReady] = useState(false);

  // Fix Leaflet default marker icons for bundlers.
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

  const selectedCentre = useMemo(
    () => centres.find((c) => c.id === selectedCentreId) ?? null,
    [centres, selectedCentreId],
  );

  const center = selectedCentre?.coordinates ?? centres[0]?.coordinates ?? { lat: 43.7, lng: -79.4 };

  const routesToRender = useMemo(() => {
    if (!showRoutesForSelected || !selectedCentre) return [];
    return selectedCentre.routes;
  }, [selectedCentre, showRoutesForSelected]);

  const focusPoints = useMemo(() => {
    if (!selectedCentre) return centres.map((c) => [c.coordinates.lat, c.coordinates.lng] as const);
    const pathPoints =
      routesToRender[0]?.path?.map((p) => [p.lat, p.lng] as const) ?? [];
    // If we have routes, fit to the first route path, otherwise just the centre
    return pathPoints.length >= 2
      ? pathPoints
      : [[selectedCentre.coordinates.lat, selectedCentre.coordinates.lng] as const];
  }, [centres, selectedCentre, routesToRender]);

  if (!ready) {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 ${className ?? ""}`}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-sky-500/10 via-emerald-500/5 to-transparent" />
        <div className="relative p-5">
          <div className="h-5 w-40 rounded bg-white/10" />
          <div className="mt-3 h-3 w-64 rounded bg-white/10" />
          <div className="mt-6 h-[360px] w-full rounded-2xl bg-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between px-1 pb-3">
        <p className="text-sm font-semibold text-white">Map</p>
        <p className="text-xs text-slate-300">
          {selectedCentre ? (
            <>
              Showing routes for{" "}
              <span className="font-semibold text-white">
                {selectedCentre.city}
              </span>
            </>
          ) : (
            "Select a centre to preview routes"
          )}
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="h-[420px] w-full">
          <MapContainer
            center={toLeafletLatLng(center)}
            zoom={12}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <LeafletInvalidateSize trigger={invalidateKey ?? selectedCentreId ?? ""} />
            <LeafletAutoView
              center={[center.lat, center.lng]}
              points={focusPoints}
              trigger={`${String(invalidateKey ?? "")}:${String(selectedCentreId ?? "")}`}
              zoom={12}
            />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {centres.map((c) => (
              <Marker key={c.id} position={toLeafletLatLng(c.coordinates)}>
                <Popup>
                  <div className="space-y-1">
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs">{c.addressLine1}</p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {routesToRender.map((route) => (
              <Polyline
                key={route.id}
                positions={route.path.map(toLeafletLatLng)}
                pathOptions={{
                  color: routeColor(route.testType),
                  weight: 5,
                  opacity: 0.9,
                }}
              />
            ))}
          </MapContainer>
        </div>

        <div className="border-t border-white/10 p-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-200">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
              <MapPin className="h-3.5 w-3.5 text-sky-300" />
              Centres
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              G2 routes
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              G routes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

