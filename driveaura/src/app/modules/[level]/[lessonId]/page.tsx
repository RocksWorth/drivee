import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

import {
  getAdjacentLesson,
  getLessonPath,
  type LicenseLevelId,
} from "../../../../../constants/modules";
import { LessonRenderer } from "../../_components/LessonRenderer";

function Breadcrumbs({
  levelTitle,
  moduleTitle,
  lessonTitle,
  levelId,
}: {
  levelTitle: string;
  moduleTitle: string;
  lessonTitle: string;
  levelId: LicenseLevelId;
}) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
      <Link
        href="/modules"
        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-slate-100"
      >
        <Home className="h-4 w-4" />
        Modules
      </Link>
      <span className="text-slate-400">/</span>
      <Link
        href={`/modules/${levelId}`}
        className="rounded-lg px-2 py-1 hover:bg-slate-100"
      >
        {levelTitle}
      </Link>
      <span className="text-slate-400">/</span>
      <span className="rounded-lg px-2 py-1 font-medium text-slate-900">
        {moduleTitle}
      </span>
      <span className="text-slate-400">/</span>
      <span className="rounded-lg px-2 py-1 font-semibold text-slate-950">
        {lessonTitle}
      </span>
    </nav>
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ level: string; lessonId: string }>;
}) {
  const { level, lessonId } = await params;
  const levelId = level as LicenseLevelId;

  const path = getLessonPath(levelId, lessonId);
  if (!path) notFound();

  const adjacent = getAdjacentLesson(levelId, lessonId);

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-white/95 p-5 text-slate-950 shadow-sm ring-1 ring-black/5 sm:p-6">
          <Breadcrumbs
            levelTitle={path.level.title}
            moduleTitle={path.module.title}
            lessonTitle={path.lesson.title}
            levelId={levelId}
          />

          <header className="mt-4">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {path.lesson.title}
            </h1>
            {path.lesson.summary && (
              <p className="mt-2 text-base leading-7 text-slate-700">
                {path.lesson.summary}
              </p>
            )}
          </header>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <LessonRenderer blocks={path.lesson.blocks} />
          </div>

          <div className="mt-10 flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
            {adjacent.prev ? (
              <Link
                href={`/modules/${levelId}/${adjacent.prev.id}`}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-900"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {adjacent.next ? (
              <Link
                href={`/modules/${levelId}/${adjacent.next.id}`}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-700 px-4 text-sm font-semibold text-white transition hover:bg-indigo-600"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href="/modules"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-amber-500 px-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                Back to levels
              </Link>
            )}
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-300">
          Focus mode: content is intentionally clean for readability.
        </p>
      </div>
    </div>
  );
}

