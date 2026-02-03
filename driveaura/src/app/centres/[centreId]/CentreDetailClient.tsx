"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import clsx from "clsx";
import {
  AlertCircle,
  ArrowLeft,
  Car,
  ExternalLink,
  Map,
  MapPin,
  PlayCircle,
  Route,
} from "lucide-react";

import type { DrivingCentre, TestRoute } from "../../../../constants/driving-centres";
import { VideoEmbed } from "../_components/VideoEmbed";

const CentreDetailMap = dynamic(
  () => import("../_components/CentreDetailMap").then((m) => m.CentreDetailMap),
  {
    ssr: false,
    loading: () => (
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="animate-pulse p-4">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="mt-3 h-[360px] w-full rounded-2xl bg-slate-200" />
        </div>
      </div>
    ),
  },
);

function timeToHms(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function youtubeWatchUrlFromEmbed(embedUrl: string, tSeconds?: number): string {
  // supports https://www.youtube.com/embed/<id>
  const m = embedUrl.match(/youtube\.com\/embed\/([^?]+)/);
  const id = m?.[1];
  if (!id) return embedUrl;
  const t = tSeconds ? `?t=${tSeconds}` : "";
  return `https://www.youtube.com/watch?v=${id}${t}`;
}

export default function CentreDetailClient({ centre }: { centre: DrivingCentre }) {
  const [activeRouteId, setActiveRouteId] = useState<string | null>(
    centre.routes[0]?.id ?? null,
  );
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null);

  const activeRoute = useMemo(
    () => centre.routes.find((r) => r.id === activeRouteId) ?? centre.routes[0] ?? null,
    [centre.routes, activeRouteId],
  );

  const mapsQuery = encodeURIComponent(`${centre.addressLine1} ${centre.addressLine2 ?? ""}`);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-sky-950/20 to-slate-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <Link href="/" className="text-sm font-semibold text-white">
                Drive<span className="text-amber-400">Aura</span>
              </Link>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Link
                  href="/centres"
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white/5 px-3 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All centres
                </Link>
                <Link
                  href="/centres"
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white/5 px-3 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
                  aria-current="page"
                >
                  <Map className="h-4 w-4" />
                  Centres
                </Link>
                <Link
                  href="/modules"
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white/5 px-3 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
                >
                  <Car className="h-4 w-4" />
                  Modules
                </Link>
                <Link
                  href="/checklist"
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white/5 px-3 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
                >
                  <AlertCircle className="h-4 w-4" />
                  Checklist
                </Link>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-emerald-500/15 px-3 text-sm font-semibold text-emerald-100 ring-1 ring-emerald-500/20 hover:bg-emerald-500/20"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in Maps
                </a>
              </div>
            </div>

            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-white">{centre.city}</p>
              <p className="text-xs text-slate-300">{centre.testsOffered.join(" · ")}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left column */}
          <section className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white/95 p-6 text-slate-950 shadow-sm ring-1 ring-black/5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h1 className="text-2xl font-bold tracking-tight">
                    {centre.name}
                  </h1>
                  <p className="mt-2 text-sm text-slate-700">
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-sky-700" />
                      {centre.addressLine1}
                      {centre.addressLine2 ? `, ${centre.addressLine2}` : ""}
                    </span>
                  </p>
                  {centre.hoursNote && (
                    <p className="mt-2 text-sm text-slate-600">{centre.hoursNote}</p>
                  )}
                </div>

                <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
                  Calm prep mode
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-950">
                    Arrival checklist
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                    {centre.arrivalTips.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white/95 p-6 text-slate-950 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center gap-2">
                <Route className="h-5 w-5 text-indigo-700" />
                <h2 className="text-lg font-bold tracking-tight">Practice Routes</h2>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Choose a route to highlight it on the map and unlock its walkthrough + key spots.
              </p>

              <div className="mt-4 space-y-2">
                {centre.routes.map((r) => {
                  const selected = r.id === activeRouteId;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        setActiveRouteId(r.id);
                        setActiveHighlightId(null);
                      }}
                      className={clsx(
                        "w-full rounded-2xl border px-4 py-3 text-left transition",
                        "active:scale-[0.99]",
                        selected
                          ? "border-indigo-200 bg-indigo-50"
                          : "border-slate-200 bg-white hover:bg-slate-50",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-950">
                            {r.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-600">
                            {r.testType} ·{" "}
                            {r.distanceKm ? `${r.distanceKm.toFixed(1)} km` : "—"} ·{" "}
                            {r.durationMin ? `${r.durationMin} min` : "—"}
                          </p>
                        </div>
                        <span
                          className={clsx(
                            "shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                            r.testType === "G2"
                              ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                              : "bg-blue-50 text-blue-800 ring-blue-200",
                          )}
                        >
                          {r.testType}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl bg-white/95 p-6 text-slate-950 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-700" />
                <h2 className="text-lg font-bold tracking-tight">What to Expect</h2>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold">Examiner focus</p>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
                    {centre.whatToExpect.examinerFocus.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold">Parking & arrival</p>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
                    {centre.whatToExpect.parkingNotes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold">Local quirks</p>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
                    {centre.whatToExpect.localQuirks.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Right column */}
          <section className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl bg-white/95 p-4 text-slate-950 shadow-sm ring-1 ring-black/5">
              <CentreDetailMap
                centre={centre}
                activeRouteId={activeRouteId}
                activeHighlightId={activeHighlightId}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {centre.routes.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setActiveRouteId(r.id);
                      setActiveHighlightId(null);
                    }}
                    className={clsx(
                      "rounded-full px-3 py-1 text-xs font-semibold ring-1 transition",
                      r.id === activeRouteId
                        ? "bg-slate-950 text-white ring-slate-950"
                        : "bg-slate-50 text-slate-700 ring-slate-200 hover:bg-slate-100",
                    )}
                  >
                    {r.testType}: {r.name}
                  </button>
                ))}
              </div>
            </div>

            {activeRoute && (
              <div className="rounded-3xl bg-white/95 p-6 text-slate-950 shadow-sm ring-1 ring-black/5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="h-5 w-5 text-emerald-700" />
                      <h2 className="text-lg font-bold tracking-tight">
                        Walkthrough Video
                      </h2>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {activeRoute.walkthroughVideo.title}
                    </p>
                  </div>
                  <span
                    className={clsx(
                      "shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                      activeRoute.testType === "G2"
                        ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                        : "bg-blue-50 text-blue-800 ring-blue-200",
                    )}
                  >
                    {activeRoute.testType}
                  </span>
                </div>

                <div className="mt-4">
                  <VideoEmbed
                    title={activeRoute.walkthroughVideo.title}
                    embedUrl={activeRoute.walkthroughVideo.embedUrl}
                  />
                </div>

                <div className="mt-6">
                  <h3 className="text-base font-semibold">
                    Key intersections & lane changes
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Tap a row to focus it on the map. Use the timestamp to jump in the video.
                  </p>

                  <div className="mt-3 space-y-2">
                    {activeRoute.highlights.map((h) => {
                      const watchUrl = youtubeWatchUrlFromEmbed(
                        activeRoute.walkthroughVideo.embedUrl,
                        h.timestampSeconds,
                      );
                      const badge =
                        h.severity === "must-do"
                          ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                          : h.severity === "common-mistake"
                            ? "bg-rose-50 text-rose-800 ring-rose-200"
                            : "bg-amber-50 text-amber-800 ring-amber-200";
                      const selected = activeHighlightId === h.id;
                      return (
                        <button
                          key={h.id}
                          type="button"
                          onClick={() => setActiveHighlightId(h.id)}
                          className={clsx(
                            "w-full rounded-2xl border bg-white p-4 text-left transition",
                            "active:scale-[0.99]",
                            selected
                              ? "border-sky-300 bg-sky-50"
                              : "border-slate-200 hover:bg-slate-50",
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold">{h.title}</p>
                              <p className="mt-1 text-sm text-slate-600">
                                {h.description}
                              </p>
                            </div>
                            <span
                              className={clsx(
                                "shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                                badge,
                              )}
                            >
                              {h.severity.replace("-", " ")}
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <a
                              href={watchUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-xs font-semibold text-white transition hover:bg-slate-900"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <PlayCircle className="h-4 w-4" />
                              {timeToHms(h.timestampSeconds)}
                            </a>
                            <span className="text-xs text-slate-500">
                              {h.location ? "Also pinned on the map" : "No map pin (text-only)"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-slate-300">
              Note: Routes and videos are mock data right now—swap in real centre-specific
              coordinates and walkthrough links when ready.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

