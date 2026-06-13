"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { courses, signals } from "@/lib/courses";
import { cn } from "@/lib/utils";

// Only the "source" courses an applicant can select — the right-side courses
// are recommendation destinations only and are never shown in the dropdown.
const SELECTABLE_IDS = ["cse", "cse-aiml", "cse-core-google", "bca", "bba"];

export default function IntakeForm() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedSignals, setSelectedSignals] = useState<Record<string, string>>({});

  const selectedCourseData = courses.find((c) => c.id === selectedCourse);
  const completedSignals = signals.filter((s) => selectedSignals[s.key]).length;
  const isComplete = selectedCourse !== "" && signals.every((s) => selectedSignals[s.key]);

  function handleSubmit() {
    if (!isComplete) return;
    const params = new URLSearchParams({ course: selectedCourse });
    Object.entries(selectedSignals).forEach(([k, v]) => params.set(`signal_${k}`, v));
    router.push(`/results?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-950 px-5 pt-10 pb-16">
        <div className="max-w-xl mx-auto">

          {/* Brand */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center">
              <span className="text-white text-xs font-black">TI</span>
            </div>
            <span className="text-teal-200 text-xs font-semibold tracking-widest uppercase">
              Techno India University
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            Find your<br />best-fit programme
          </h1>
          <p className="text-teal-300 mt-2.5 text-sm leading-relaxed max-w-xs">
            Tell us what you&apos;re after — we&apos;ll give you a specific, honest recommendation.
          </p>

          {/* Course dropdown */}
          <div className="mt-7">
            <label className="block text-teal-300 text-xs font-semibold mb-2 tracking-wide uppercase">
              Which programme are you considering?
            </label>
            <div className="relative">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full appearance-none bg-white/10 border border-white/25 text-white rounded-xl px-4 py-3.5 pr-10 text-sm font-medium focus:outline-none focus:border-teal-300 focus:bg-white/15 cursor-pointer transition-all duration-200 placeholder:text-teal-300"
              >
                <option value="" disabled className="text-slate-800 bg-white">
                  Select a programme…
                </option>
                {SELECTABLE_IDS.map((id) => {
                  const course = courses.find((c) => c.id === id);
                  if (!course) return null;
                  return (
                    <option key={id} value={id} className="text-slate-900 bg-white font-medium">
                      {course.name}
                    </option>
                  );
                })}
              </select>
              {/* Chevron */}
              <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
                <svg className="w-4 h-4 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Selected course confirmation chip */}
            {selectedCourseData && (
              <div className="mt-3 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-teal-400 flex items-center justify-center shrink-0">
                  <svg className="w-2.5 h-2.5 text-teal-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-teal-200 text-xs italic">{selectedCourseData.tagline}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Signal questions ───────────────────────────────────── */}
      <div className="-mt-4 rounded-t-3xl bg-white flex-1 px-5 pt-7 pb-10">
        <div className="max-w-xl mx-auto space-y-8">

          {/* Section label */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-100" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              Tell us a bit more
            </p>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {signals.map((signal, idx) => (
            <section key={signal.key}>
              <div className="flex items-center gap-2.5 mb-3.5">
                <SignalBadge n={idx + 1} done={!!selectedSignals[signal.key]} />
                <h2 className="font-semibold text-slate-900 text-sm">{signal.question}</h2>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {signal.options.map((option) => {
                  const active = selectedSignals[signal.key] === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSelectedSignals((prev) => ({ ...prev, [signal.key]: option.value }))}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200",
                        active
                          ? "border-teal-600 bg-teal-50"
                          : "border-slate-200 bg-white hover:border-teal-300"
                      )}
                    >
                      <span className={cn("font-medium text-sm", active ? "text-teal-800" : "text-slate-700")}>
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}

          {/* Progress indicator */}
          {(selectedCourse || completedSignals > 0) && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>
                  {(selectedCourse ? 1 : 0) + completedSignals} of {1 + signals.length} answered
                </span>
                {isComplete && <span className="text-teal-600 font-semibold">Ready!</span>}
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((selectedCourse ? 1 : 0) + completedSignals) / (1 + signals.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isComplete}
            className={cn(
              "w-full h-14 rounded-2xl font-bold text-base transition-all duration-200",
              isComplete
                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            )}
          >
            {isComplete ? "Find My Best Fit →" : "Answer all questions to continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SignalBadge({ n, done }: { n: number; done: boolean }) {
  return (
    <div className={cn(
      "w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-all duration-200",
      done ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-400"
    )}>
      {done ? (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : n}
    </div>
  );
}
