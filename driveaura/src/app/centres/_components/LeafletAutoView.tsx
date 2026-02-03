"use client";

import { useEffect, useMemo } from "react";
import { useMap } from "react-leaflet";

type LatLngTuple = readonly [number, number];

function boundsFromPoints(points: ReadonlyArray<LatLngTuple>) {
  const lats = points.map((p) => p[0]);
  const lngs = points.map((p) => p[1]);
  const south = Math.min(...lats);
  const north = Math.max(...lats);
  const west = Math.min(...lngs);
  const east = Math.max(...lngs);
  // Leaflet's LatLngBoundsExpression types expect mutable tuples.
  return [
    [south, west],
    [north, east],
  ] as [[number, number], [number, number]];
}

export function LeafletAutoView({
  center,
  points,
  trigger,
  padding = 32,
  zoom = 13,
}: {
  center: LatLngTuple;
  /**
   * If provided, map will fit bounds to these points.
   */
  points?: ReadonlyArray<LatLngTuple>;
  /**
   * Any change here re-applies the view.
   */
  trigger?: string | number | boolean;
  padding?: number;
  zoom?: number;
}) {
  const map = useMap();

  const bounds = useMemo(() => {
    if (!points || points.length < 2) return null;
    return boundsFromPoints(points);
  }, [points]);

  useEffect(() => {
    // Delay a bit to let tiles/container settle (esp. after toggles)
    const t = window.setTimeout(() => {
      if (bounds) {
        map.fitBounds(bounds, { padding: [padding, padding], animate: true });
      } else {
        map.setView([center[0], center[1]], zoom, { animate: true });
      }
    }, 80);
    return () => window.clearTimeout(t);
  }, [map, center, bounds, padding, zoom, trigger]);

  return null;
}

