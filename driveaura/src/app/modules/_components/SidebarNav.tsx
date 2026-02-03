"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { BookOpen, Car, ChevronDown, Map, Menu, X } from "lucide-react";

import type { Level } from "../../../../constants/modules";

function LevelIcon({ iconKey }: { iconKey: Level["iconKey"] }) {
  if (iconKey === "book") return <BookOpen className="h-4 w-4" />;
  if (iconKey === "car") return <Car className="h-4 w-4" />;
  return <Map className="h-4 w-4" />;
}

function getActiveIds(pathname: string): { levelId?: string; lessonId?: string } {
  // /modules/[level]/[lessonId]
  const parts = pathname.split("?")[0]?.split("#")[0]?.split("/") ?? [];
  const idx = parts.findIndex((p) => p === "modules");
  if (idx === -1) return {};
  const levelId = parts[idx + 1];
  const lessonId = parts[idx + 2];
  return { levelId, lessonId };
}

export function SidebarNav({
  levels,
  title,
}: {
  levels: Level[];
  title?: string;
}) {
  const pathname = usePathname();
  const active = useMemo(() => getActiveIds(pathname), [pathname]);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Expanded state (tree style) — auto-expand active level
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const isExpanded = (levelId: string) => expanded[levelId] ?? active.levelId === levelId;

  const NavTree = (
    <div className="h-full w-full">
      <div className="px-4 pt-4">
        <p className="text-sm font-semibold tracking-tight text-white">
          {title ?? "Learning Modules"}
        </p>
        <p className="mt-1 text-xs text-slate-300">
          Jump levels anytime. Revisit earlier lessons whenever you want.
        </p>
      </div>

      <div className="mt-4 space-y-3 px-2 pb-6">
        {levels.map((level) => {
          const open = isExpanded(level.id);
          return (
            <div key={level.id} className="rounded-2xl bg-white/5 ring-1 ring-white/10">
              <div className="flex items-stretch gap-1 p-1">
                <Link
                  href={`/modules/${level.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    "flex flex-1 items-center gap-2 rounded-2xl px-3 py-3 text-left transition",
                    "min-h-12",
                    active.levelId === level.id && !active.lessonId
                      ? "bg-white text-slate-950"
                      : "hover:bg-white/10",
                  )}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white">
                    <LevelIcon iconKey={level.iconKey} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white">
                      {level.title}
                    </span>
                    <span className="block truncate text-xs text-slate-300">
                      {level.subtitle}
                    </span>
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [level.id]: !open }))
                  }
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl px-3 text-slate-200 ring-1 ring-white/10 transition hover:bg-white/10"
                  aria-expanded={open}
                  aria-label={`Toggle ${level.title} lessons`}
                >
                  <ChevronDown
                    className={clsx(
                      "h-4 w-4 transition-transform",
                      open && "rotate-180",
                    )}
                  />
                </button>
              </div>

              {open && (
                <div className="px-2 pb-3">
                  {level.modules.map((mod) => (
                    <div key={mod.id} className="mt-2">
                      <p className="px-2 py-1 text-xs font-semibold text-slate-200">
                        {mod.title}
                      </p>
                      <div className="space-y-1">
                        {mod.lessons.map((lesson) => {
                          const href = `/modules/${level.id}/${lesson.id}`;
                          const isActive =
                            active.levelId === level.id && active.lessonId === lesson.id;
                          return (
                            <Link
                              key={lesson.id}
                              href={href}
                              onClick={() => setMobileOpen(false)}
                              className={clsx(
                                "block rounded-xl px-3 py-3 text-sm transition",
                                "min-h-12",
                                isActive
                                  ? "bg-white text-slate-950"
                                  : "text-slate-100 hover:bg-white/10",
                              )}
                              aria-current={isActive ? "page" : undefined}
                            >
                              <span className="block font-medium">
                                {lesson.title}
                              </span>
                              {lesson.summary && (
                                <span
                                  className={clsx(
                                    "mt-0.5 block text-xs",
                                    isActive ? "text-slate-700" : "text-slate-300",
                                  )}
                                >
                                  {lesson.summary}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm font-semibold text-white">
            Drive<span className="text-amber-400">Aura</span>
          </Link>
          <Link
            href="/centres"
            className="text-xs font-semibold text-slate-300 hover:text-white"
          >
            Centres
          </Link>
          <Link
            href="/checklist"
            className="text-xs font-semibold text-slate-300 hover:text-white"
          >
            Checklist
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white/10 px-3 text-sm font-semibold text-white ring-1 ring-white/10"
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden h-[calc(100vh-0px)] w-[340px] shrink-0 border-r border-white/10 bg-slate-950/85 backdrop-blur lg:block">
        <div className="h-full overflow-y-auto">{NavTree}</div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu overlay"
          />

          <div className="absolute left-0 top-0 h-full w-[90%] max-w-sm bg-slate-950 text-white shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="text-sm font-semibold">Modules</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white/10 px-3 text-sm font-semibold text-white ring-1 ring-white/10"
              >
                <X className="h-4 w-4" />
                Close
              </button>
            </div>
            <div className="h-[calc(100%-3.5rem)] overflow-y-auto">{NavTree}</div>
          </div>
        </div>
      )}
    </>
  );
}

