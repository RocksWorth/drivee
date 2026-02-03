"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";

import type { LessonQuizBlock } from "../../../../constants/modules";

type AnswerState = {
  selectedIndex: number | null;
  revealed: boolean;
};

export function LessonQuiz({ block }: { block: LessonQuizBlock }) {
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});

  const score = useMemo(() => {
    const questions = block.questions;
    const graded = questions.filter((q) => answers[q.id]?.revealed);
    const correct = graded.filter(
      (q) => answers[q.id]?.selectedIndex === q.correctIndex,
    );
    return {
      gradedCount: graded.length,
      correctCount: correct.length,
      total: questions.length,
    };
  }, [answers, block.questions]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-indigo-700" />
          <div>
            <p className="text-base font-semibold text-slate-950">
              {block.title ?? "Quick Check"}
            </p>
            {block.subtitle && (
              <p className="text-sm text-slate-600">{block.subtitle}</p>
            )}
          </div>
        </div>
        <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
          {score.correctCount}/{score.gradedCount} correct
        </div>
      </header>

      <div className="mt-4 space-y-5">
        {block.questions.map((q, idx) => {
          const state = answers[q.id] ?? { selectedIndex: null, revealed: false };
          const isCorrect = state.revealed && state.selectedIndex === q.correctIndex;
          const isWrong = state.revealed && state.selectedIndex !== null && !isCorrect;

          return (
            <div key={q.id} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-950">
                {idx + 1}. {q.prompt}
              </p>

              <div className="mt-3 grid grid-cols-1 gap-2">
                {q.options.map((opt, optIdx) => {
                  const selected = state.selectedIndex === optIdx;
                  const showCorrect = state.revealed && optIdx === q.correctIndex;
                  const showWrong = state.revealed && selected && optIdx !== q.correctIndex;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [q.id]: { ...state, selectedIndex: optIdx },
                        }))
                      }
                      className={clsx(
                        "min-h-12 w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold ring-1 transition active:scale-[0.99]",
                        selected ? "ring-indigo-300 bg-indigo-50" : "ring-slate-200 bg-white hover:bg-slate-50",
                        showCorrect && "ring-emerald-300 bg-emerald-50",
                        showWrong && "ring-rose-300 bg-rose-50",
                      )}
                      aria-pressed={selected}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-slate-950">{opt}</span>
                        {showCorrect && (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                        )}
                        {showWrong && (
                          <XCircle className="mt-0.5 h-4 w-4 text-rose-600" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  {state.revealed ? (
                    <span
                      className={clsx(
                        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                        isCorrect
                          ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                          : "bg-rose-50 text-rose-800 ring-rose-200",
                      )}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5" />
                      )}
                      {isCorrect ? "Correct" : "Review"}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">
                      Pick an answer, then reveal.
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {!state.revealed ? (
                    <button
                      type="button"
                      disabled={state.selectedIndex === null}
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [q.id]: { ...state, revealed: true },
                        }))
                      }
                      className={clsx(
                        "min-h-11 rounded-xl px-4 text-xs font-semibold ring-1 transition active:scale-[0.99]",
                        state.selectedIndex === null
                          ? "cursor-not-allowed bg-slate-100 text-slate-400 ring-slate-200"
                          : "bg-slate-950 text-white ring-slate-950 hover:bg-slate-900",
                      )}
                    >
                      Reveal answer
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [q.id]: { selectedIndex: null, revealed: false },
                        }))
                      }
                      className="min-h-11 rounded-xl bg-white px-4 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 active:scale-[0.99]"
                    >
                      Try again
                    </button>
                  )}
                </div>
              </div>

              {state.revealed && q.explanation && (
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {block.footerNote && (
        <p className="mt-4 text-xs text-slate-500">{block.footerNote}</p>
      )}
    </section>
  );
}

