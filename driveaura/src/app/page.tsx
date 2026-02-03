import Link from "next/link";
import { BookOpen, Car, Map } from "lucide-react";

import { LEVELS } from "../../../constants/modules";

function LevelIcon({ iconKey }: { iconKey: "book" | "car" | "map" }) {
  if (iconKey === "book") return <BookOpen className="h-5 w-5" />;
  if (iconKey === "car") return <Car className="h-5 w-5" />;
  return <Map className="h-5 w-5" />;
}

export default function ModulesIndexPage() {
  return (
    <div className="px-4 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-white/95 p-6 text-slate-950 shadow-sm ring-1 ring-black/5">
          <h1 className="text-2xl font-bold tracking-tight">
            Learning Modules for All Levels
          </h1>
          <p className="mt-2 text-base leading-7 text-slate-700">
            Choose your license level, follow lessons in order, and jump back to
            earlier topics anytime. Built for focused, self-paced learning.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {LEVELS.map((level) => {
            const href = `/modules/${level.id}`;
            return (
              <Link
                key={level.id}
                href={href}
                className="group rounded-3xl bg-white/95 p-5 text-slate-950 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <LevelIcon iconKey={level.iconKey} />
                  </span>
                  <div>
                    <p className="text-lg font-semibold">{level.title}</p>
                    <p className="text-sm text-slate-600">{level.subtitle}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-700">
                  {level.modules.length} modules ·{" "}
                  {level.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                </p>
                <p className="mt-2 text-sm font-semibold text-indigo-700 group-hover:text-indigo-800">
                  Start learning →
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

