import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Home } from "lucide-react";

import {
  getFirstLessonId,
  getLevel,
  type LicenseLevelId,
} from "../../../../constants/modules";

export default async function LevelLandingPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level: levelParam } = await params;
  const levelId = levelParam as LicenseLevelId;
  const level = getLevel(levelId);
  if (!level) notFound();

  const firstLessonId = getFirstLessonId(levelId);

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-white/95 p-6 text-slate-950 shadow-sm ring-1 ring-black/5">
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <Link
              href="/modules"
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-slate-100"
            >
              <Home className="h-4 w-4" />
              Modules
            </Link>
            <span className="text-slate-400">/</span>
            <span className="rounded-lg px-2 py-1 font-semibold text-slate-950">
              {level.title}
            </span>
          </nav>

          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            {level.title} Learning Hub
          </h1>
          <p className="mt-2 text-base leading-7 text-slate-700">
            {level.subtitle}
          </p>

          {firstLessonId && (
            <div className="mt-6">
              <Link
                href={`/modules/${levelId}/${firstLessonId}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-indigo-700 px-5 text-sm font-semibold text-white transition hover:bg-indigo-600"
              >
                Start from the first lesson
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4">
          {level.modules.map((mod) => (
            <div
              key={mod.id}
              className="rounded-3xl bg-white/95 p-5 text-slate-950 shadow-sm ring-1 ring-black/5"
            >
              <h2 className="text-lg font-semibold">{mod.title}</h2>
              {mod.description && (
                <p className="mt-1 text-sm text-slate-600">{mod.description}</p>
              )}

              <div className="mt-4 space-y-2">
                {mod.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/modules/${levelId}/${lesson.id}`}
                    className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:bg-slate-50"
                  >
                    <p className="text-sm font-semibold">{lesson.title}</p>
                    {lesson.summary && (
                      <p className="mt-1 text-sm text-slate-600">
                        {lesson.summary}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

