"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

/**
 * Leaflet commonly "glitches" (gray tiles / wrong offsets) when initialized
 * while hidden (e.g. mobile tab toggle). Calling invalidateSize() fixes it.
 */
export function LeafletInvalidateSize({ trigger }: { trigger?: string | number | boolean }) {
  const map = useMap();

  useEffect(() => {
    const t1 = window.setTimeout(() => map.invalidateSize(), 50);
    const t2 = window.setTimeout(() => map.invalidateSize(), 250);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [map, trigger]);

  useEffect(() => {
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [map]);

  return null;
}

