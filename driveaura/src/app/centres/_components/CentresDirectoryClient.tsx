"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import clsx from "clsx";
import { Filter, Map as MapIcon, Search, List as ListIcon, ArrowRight } from "lucide-react";

import type { DrivingCentre } from "../../../../constants/driving-centres";
const CentresMap = dynamic(
  () => import("./CentresMap").then((m) => m.CentresMap),
  {
    ssr: false,
    loading: () => (
      <div className="lg:sticky lg:top-[92px]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-sky-500/10 via-emerald-500/5 to-transparent" />
          <div className="relative p-5">
            <div className="h-5 w-40 rounded bg-white/10" />
            <div className="mt-3 h-3 w-64 rounded bg-white/10" />
            <div className="mt-6 h-[360px] w-full rounded-2xl bg-white/10" />
          </div>
        </div>
      </div>
    ),
  },
);

type ViewMode = "list" | "map";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

function pill(selected: boolean) {
  return clsx(
    "min-h-11 rounded-full px-4 text-sm font-semibold ring-1 transition active:scale-[0.99]",
    selected
      ? "bg-white text-slate-950 ring-white"
      : "bg-white/5 text-white ring-white/10 hover:bg-white/10",
  );
}

export function CentresDirectoryClient({ centres }: { centres: DrivingCentre[] }) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<string>("all");
  const [tests, setTests] = useState<{ G2: boolean; G: boolean }>({ G2: true, G: true });
  const [selectedCentreId, setSelectedCentreId] = useState<string | null>(centres[0]?.id ?? null);
  const [mobileView, setMobileView] = useState<ViewMode>("list");
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const cities = useMemo(() => {
    const set = new Set(centres.map((c) => c.city));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [centres]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return centres.filter((c) => {
      const matchesQuery =
        q.length === 0 ||
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.addressLine1.toLowerCase().includes(q);
      const matchesCity = city === "all" || c.city === city;
      const matchesTests =
        (tests.G2 && c.testsOffered.includes("G2")) || (tests.G && c.testsOffered.includes("G"));
      return matchesQuery && matchesCity && matchesTests;
    });
  }, [centres, query, city, tests]);

  const selected = useMemo(
    () => centres.find((c) => c.id === selectedCentreId) ?? null,
    [centres, selectedCentreId],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-sky-950/30 to-slate-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <Link href="/" className="text-sm font-semibold text-white">
                Drive<span className="text-amber-400">Aura</span>
              </Link>
              <h1 className="mt-1 text-lg font-bold tracking-tight sm:text-xl">
                Ontario DriveTest Centres
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                Pick a centre, preview practice routes, and watch walkthroughs.
              </p>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/modules" className="text-sm text-slate-300 hover:text-white">
                Modules
              </Link>
              <span className="text-slate-500">•</span>
              <Link href="/checklist" className="text-sm text-slate-300 hover:text-white">
                Checklist
              </Link>
              <span className="text-slate-500">•</span>
              <Link
                href="/centres"
                className="text-sm font-semibold text-white"
                aria-current="page"
              >
                Centres
              </Link>
            </div>
          </div>

          {/* Search + filters */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-12">
            <div className="sm:col-span-6">
              <label className="sr-only" htmlFor="centre-search">
                Search centres
              </label>
              <div className="flex min-h-12 items-center gap-2 rounded-2xl bg-white/5 px-3 ring-1 ring-white/10">
                <Search className="h-4 w-4 text-slate-300" />
                <input
                  id="centre-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Brampton, Etobicoke, Mississauga…"
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="flex min-h-12 items-center gap-2 rounded-2xl bg-white/5 px-3 ring-1 ring-white/10">
                <Filter className="h-4 w-4 text-slate-300" />
                <label className="sr-only" htmlFor="city-filter">
                  City filter
                </label>
                <select
                  id="city-filter"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none"
                >
                  {cities.map((c) => (
                    <option key={c} value={c} className="bg-slate-950">
                      {c === "all" ? "All cities" : c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="flex items-center justify-between gap-2 rounded-2xl bg-white/5 p-1 ring-1 ring-white/10">
                <button
                  type="button"
                  className={pill(tests.G2)}
                  onClick={() => setTests((t) => ({ ...t, G2: !t.G2 }))}
                  aria-pressed={tests.G2}
                >
                  G2
                </button>
                <button
                  type="button"
                  className={pill(tests.G)}
                  onClick={() => setTests((t) => ({ ...t, G: !t.G }))}
                  aria-pressed={tests.G}
                >
                  G
                </button>
              </div>
            </div>
          </div>

          {/* Mobile view toggle */}
          <div className="mt-3 flex gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => setMobileView("list")}
              className={clsx(
                "min-h-11 flex-1 rounded-2xl px-4 text-sm font-semibold ring-1 transition",
                mobileView === "list"
                  ? "bg-white text-slate-950 ring-white"
                  : "bg-white/5 text-white ring-white/10",
              )}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <ListIcon className="h-4 w-4" />
                List
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMobileView("map")}
              className={clsx(
                "min-h-11 flex-1 rounded-2xl px-4 text-sm font-semibold ring-1 transition",
                mobileView === "map"
                  ? "bg-white text-slate-950 ring-white"
                  : "bg-white/5 text-white ring-white/10",
              )}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <MapIcon className="h-4 w-4" />
                Map
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* List */}
          {(isDesktop || mobileView === "list") && (
            <section className="lg:col-span-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">
                Centres{" "}
                <span className="text-slate-300">({filtered.length})</span>
              </p>
              {selected && (
                <Link
                  href={`/centres/${selected.id}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Open details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200">
                  <p className="text-sm font-semibold">No matches.</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Try clearing filters or searching by city name.
                  </p>
                </div>
              ) : (
                filtered.map((c) => {
                  const isSelected = selectedCentreId === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCentreId(c.id)}
                      className={clsx(
                        "w-full rounded-3xl border p-5 text-left transition",
                        "active:scale-[0.99]",
                        isSelected
                          ? "border-sky-300/30 bg-white text-slate-950"
                          : "border-white/10 bg-white/5 text-white hover:bg-white/10",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-base font-bold tracking-tight">
                            {c.city}
                          </p>
                          <p
                            className={clsx(
                              "mt-0.5 text-sm",
                              isSelected ? "text-slate-700" : "text-slate-300",
                            )}
                          >
                            {c.name}
                          </p>
                          <p
                            className={clsx(
                              "mt-2 text-sm",
                              isSelected ? "text-slate-700" : "text-slate-300",
                            )}
                          >
                            {c.addressLine1}
                          </p>
                        </div>

                        <span
                          className={clsx(
                            "shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                            isSelected
                              ? "bg-slate-100 text-slate-700 ring-slate-200"
                              : "bg-white/5 text-slate-200 ring-white/10",
                          )}
                        >
                          {c.testsOffered.join(" · ")}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span
                          className={clsx(
                            "rounded-full px-3 py-1 text-xs font-semibold ring-1",
                            isSelected
                              ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                              : "bg-emerald-500/10 text-emerald-200 ring-emerald-500/20",
                          )}
                        >
                          {c.routes.filter((r) => r.testType === "G2").length} G2 routes
                        </span>
                        <span
                          className={clsx(
                            "rounded-full px-3 py-1 text-xs font-semibold ring-1",
                            isSelected
                              ? "bg-blue-50 text-blue-800 ring-blue-200"
                              : "bg-blue-500/10 text-blue-200 ring-blue-500/20",
                          )}
                        >
                          {c.routes.filter((r) => r.testType === "G").length} G routes
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
            </section>
          )}

          {/* Map */}
          {(isDesktop || mobileView === "map") && (
            <section className="lg:col-span-7">
              <CentresMap
                centres={filtered.length > 0 ? filtered : centres}
                selectedCentreId={selectedCentreId}
                invalidateKey={mobileView}
                className="lg:sticky lg:top-[92px]"
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

