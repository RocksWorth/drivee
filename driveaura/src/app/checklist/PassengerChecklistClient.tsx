"use client";

import { useMemo, useReducer } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  RotateCcw,
  XCircle,
} from "lucide-react";

import { getChecklistDefinition, QUICK_REFERENCE } from "./checklistData";
import type { GradeValue, TestMode } from "./types";

type Answers = Record<string, GradeValue>;

type State = {
  mode: TestMode;
  answersByMode: Record<TestMode, Answers>;
  submitted: boolean;
};

type Action =
  | { type: "set_mode"; mode: TestMode; initialAnswers: Answers }
  | { type: "set_answer"; itemId: string; value: Exclude<GradeValue, null> }
  | { type: "reset_mode"; initialAnswers: Answers }
  | { type: "submit" }
  | { type: "edit" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "set_mode": {
      return {
        mode: action.mode,
        answersByMode: {
          ...state.answersByMode,
          [action.mode]: state.answersByMode[action.mode] ?? action.initialAnswers,
        },
        submitted: false,
      };
    }
    case "set_answer": {
      return {
        ...state,
        answersByMode: {
          ...state.answersByMode,
          [state.mode]: {
            ...state.answersByMode[state.mode],
            [action.itemId]: action.value,
          },
        },
      };
    }
    case "reset_mode": {
      return {
        ...state,
        submitted: false,
        answersByMode: {
          ...state.answersByMode,
          [state.mode]: action.initialAnswers,
        },
      };
    }
    case "submit":
      return { ...state, submitted: true };
    case "edit":
      return { ...state, submitted: false };
    default:
      return state;
  }
}

function buildInitialAnswers(mode: TestMode): Answers {
  const def = getChecklistDefinition(mode);
  const ids = def.categories.flatMap((c) => c.items.map((i) => i.id));
  return Object.fromEntries(ids.map((id) => [id, null])) as Answers;
}

function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export default function PassengerChecklistClient() {
  const [state, dispatch] = useReducer(reducer, {
    mode: "G2",
    answersByMode: { G2: buildInitialAnswers("G2"), G: buildInitialAnswers("G") },
    submitted: false,
  });

  const definition = useMemo(
    () => getChecklistDefinition(state.mode),
    [state.mode],
  );

  const allItems = useMemo(() => {
    return definition.categories.flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        categoryId: category.id,
        categoryTitle: category.title,
      })),
    );
  }, [definition.categories]);

  const answers = state.answersByMode[state.mode] ?? buildInitialAnswers(state.mode);
  const totalCount = allItems.length;
  const answeredCount = allItems.reduce((acc, item) => acc + (answers[item.id] !== null ? 1 : 0), 0);
  const yesCount = allItems.reduce((acc, item) => acc + (answers[item.id] === true ? 1 : 0), 0);

  const completionPercent = totalCount === 0 ? 0 : (answeredCount / totalCount) * 100;
  const readinessPercent = totalCount === 0 ? 0 : (yesCount / totalCount) * 100;
  const passes = readinessPercent >= definition.passThresholdPercent;
  const canSubmit = answeredCount === totalCount && totalCount > 0;

  const strengths = useMemo(() => {
    if (!state.submitted) return [];
    return allItems.filter((i) => answers[i.id] === true);
  }, [allItems, answers, state.submitted]);

  const improvements = useMemo(() => {
    if (!state.submitted) return [];
    return allItems.filter((i) => answers[i.id] === false);
  }, [allItems, answers, state.submitted]);

  const quickRef = QUICK_REFERENCE[state.mode];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/40 to-slate-950 text-white">
      {/* Sticky header + progress */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-4">
          <div className="min-w-0">
            <Link href="/" className="text-sm font-semibold text-white">
              Drive<span className="text-amber-400">Aura</span>
            </Link>
            <div className="mt-1 flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-amber-400" />
              <p className="truncate text-base font-semibold">
                Passenger Checklist
              </p>
            </div>
          </div>

          <div className="inline-flex rounded-full bg-white/5 p-1 ring-1 ring-white/10">
            {(["G2", "G"] as const).map((mode) => {
              const selected = state.mode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "set_mode",
                      mode,
                      initialAnswers: buildInitialAnswers(mode),
                    })
                  }
                  className={clsx(
                    "min-h-11 rounded-full px-4 text-sm font-semibold transition",
                    selected
                      ? "bg-white text-slate-950"
                      : "text-slate-200 hover:bg-white/10",
                  )}
                  aria-pressed={selected}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-2">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <Link
              href="/"
              className="rounded-full bg-white/5 px-3 py-1 text-slate-200 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/modules"
              className="rounded-full bg-white/5 px-3 py-1 text-slate-200 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
            >
              Modules
            </Link>
            <Link
              href="/centres"
              className="rounded-full bg-white/5 px-3 py-1 text-slate-200 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
            >
              Centres
            </Link>
            <Link
              href="/checklist"
              className="rounded-full bg-white px-3 py-1 text-slate-950 ring-1 ring-white"
              aria-current="page"
            >
              Checklist
            </Link>
          </nav>
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-4">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>
              Progress:{" "}
              <span className="font-semibold text-white">
                {answeredCount}/{totalCount}
              </span>
            </span>
            <span className="font-semibold text-white">
              {formatPercent(completionPercent)}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-fuchsia-400 transition-all"
              style={{ width: `${completionPercent}%` }}
              aria-hidden
            />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-2xl px-4 py-6 pb-24">
        {/* Quick reference */}
        <section className="rounded-2xl bg-white/95 p-4 text-slate-950 shadow-sm ring-1 ring-black/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
            <div className="min-w-0">
              <h2 className="text-base font-semibold">{quickRef.title}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                {quickRef.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-slate-500">{quickRef.note}</p>
            </div>
          </div>
        </section>

        {/* Results */}
        {state.submitted && (
          <section className="mt-6 rounded-2xl bg-white/95 p-4 text-slate-950 shadow-sm ring-1 ring-black/5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-indigo-700" />
                <div>
                  <h2 className="text-base font-semibold">Results Summary</h2>
                  <p className="text-sm text-slate-600">
                    Readiness Score:{" "}
                    <span className="font-semibold text-slate-950">
                      {formatPercent(readinessPercent)}
                    </span>{" "}
                    (pass ≥ {definition.passThresholdPercent}%)
                  </p>
                </div>
              </div>

              <span
                className={clsx(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ring-1",
                  passes
                    ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                    : "bg-rose-50 text-rose-800 ring-rose-200",
                )}
              >
                {passes ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                {passes ? "Pass" : "Needs work"}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
                <p className="text-sm font-semibold text-emerald-900">
                  Strengths
                </p>
                <ul className="mt-2 space-y-2 text-sm text-emerald-900">
                  {strengths.length === 0 ? (
                    <li className="text-emerald-700/80">
                      No strengths recorded yet.
                    </li>
                  ) : (
                    strengths.map((item) => (
                      <li key={item.id} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                        <span className="min-w-0">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-emerald-700/80">
                            {" "}
                            · {item.categoryTitle}
                          </span>
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div className="rounded-xl bg-rose-50 p-3 ring-1 ring-rose-100">
                <p className="text-sm font-semibold text-rose-900">
                  Areas to improve
                </p>
                <ul className="mt-2 space-y-2 text-sm text-rose-900">
                  {improvements.length === 0 ? (
                    <li className="text-rose-700/80">No issues flagged.</li>
                  ) : (
                    improvements.map((item) => (
                      <li key={item.id} className="flex gap-2">
                        <AlertTriangle className="mt-0.5 h-4 w-4 text-rose-600" />
                        <span className="min-w-0">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-rose-700/80">
                            {" "}
                            · {item.categoryTitle}
                          </span>
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Checklist */}
        <section className="mt-6 space-y-4">
          {definition.categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl bg-white/95 p-4 text-slate-950 shadow-sm ring-1 ring-black/5"
            >
              <div className="mb-3">
                <h3 className="text-base font-semibold">{category.title}</h3>
                {category.description && (
                  <p className="mt-1 text-sm text-slate-600">
                    {category.description}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                {category.items.map((item) => {
                  const value = answers[item.id];
                  return (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-950">
                            {item.title}
                          </p>
                          {item.detail && (
                            <p className="mt-1 text-sm text-slate-600">
                              {item.detail}
                            </p>
                          )}
                        </div>
                        <span
                          className={clsx(
                            "shrink-0 rounded-full px-2 py-1 text-xs font-semibold ring-1",
                            value === null
                              ? "bg-slate-50 text-slate-600 ring-slate-200"
                              : value
                                ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                                : "bg-rose-50 text-rose-800 ring-rose-200",
                          )}
                        >
                          {value === null ? "Unrated" : value ? "Yes" : "No"}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch({
                              type: "set_answer",
                              itemId: item.id,
                              value: true,
                            })
                          }
                          className={clsx(
                            "min-h-12 rounded-xl px-4 text-sm font-semibold ring-1 transition active:scale-[0.99]",
                            value === true
                              ? "bg-emerald-600 text-white ring-emerald-600"
                              : "bg-emerald-50 text-emerald-900 ring-emerald-200 hover:bg-emerald-100",
                          )}
                          aria-pressed={value === true}
                        >
                          <span className="inline-flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Yes
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            dispatch({
                              type: "set_answer",
                              itemId: item.id,
                              value: false,
                            })
                          }
                          className={clsx(
                            "min-h-12 rounded-xl px-4 text-sm font-semibold ring-1 transition active:scale-[0.99]",
                            value === false
                              ? "bg-rose-600 text-white ring-rose-600"
                              : "bg-rose-50 text-rose-900 ring-rose-200 hover:bg-rose-100",
                          )}
                          aria-pressed={value === false}
                        >
                          <span className="inline-flex items-center justify-center gap-2">
                            <XCircle className="h-4 w-4" />
                            No
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Sticky action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: "reset_mode",
                initialAnswers: buildInitialAnswers(state.mode),
              })
            }
            className="min-h-12 flex-1 rounded-xl bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/15 active:scale-[0.99]"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </span>
          </button>

          {state.submitted ? (
            <button
              type="button"
              onClick={() => dispatch({ type: "edit" })}
              className="min-h-12 flex-[1.2] rounded-xl bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100 active:scale-[0.99]"
            >
              Edit checklist
            </button>
          ) : (
            <button
              type="button"
              onClick={() => dispatch({ type: "submit" })}
              disabled={!canSubmit}
              className={clsx(
                "min-h-12 flex-[1.2] rounded-xl px-4 text-sm font-semibold shadow-sm transition active:scale-[0.99]",
                canSubmit
                  ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                  : "cursor-not-allowed bg-slate-700 text-slate-300",
              )}
            >
              {canSubmit
                ? `Submit (${formatPercent(readinessPercent)} readiness)`
                : `Answer ${totalCount - answeredCount} more`}
            </button>
          )}
        </div>
        <div className="mx-auto max-w-2xl px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-xs text-slate-400">
          Tip: Tap “Yes/No” quickly—big buttons are designed for in-car use.
        </div>
      </div>
    </div>
  );
}

