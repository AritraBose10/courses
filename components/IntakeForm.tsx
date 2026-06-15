"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { courses, signals } from "@/lib/courses";
import { cn } from "@/lib/utils";

const SELECTABLE_IDS = ["cse", "cse-aiml", "bca", "bba"];
const SELECTABLE_COURSES = SELECTABLE_IDS.map((id) => courses.find((c) => c.id === id)!).filter(Boolean);

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
          <div className="flex items-center gap-3 mb-8">
            <img src="/tiu-logo-circle.png" alt="TIU" className="w-10 h-10 shrink-0" />
            <div>
              <p className="text-white font-bold text-sm leading-tight tracking-wide">Techno India University</p>
              <p className="text-teal-300 text-[10px] font-semibold tracking-widest uppercase mt-0.5">Course Finder</p>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            Find your<br />best-fit programme
          </h1>
          <p className="text-teal-300 mt-2.5 text-sm leading-relaxed max-w-xs">
            Tell us what you&apos;re after — we&apos;ll give you a specific, honest recommendation.
          </p>

          {/* Combobox */}
          <div className="mt-7">
            <label className="block text-teal-300 text-xs font-semibold mb-2 tracking-wide uppercase">
              Which programme are you considering?
            </label>
            <CourseCombobox
              selected={selectedCourse}
              onSelect={(id) => setSelectedCourse(id)}
            />

            {/* Confirmation chip */}
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

          {!selectedCourse ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium text-sm">Select a programme above</p>
              <p className="text-slate-400 text-xs mt-1">A few quick questions will follow</p>
            </div>
          ) : (
          <>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-100" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              3 quick questions
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
                        active ? "border-teal-600 bg-teal-50" : "border-slate-200 bg-white hover:border-teal-300"
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

          {/* Progress */}
          {completedSignals > 0 && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>{completedSignals} of {signals.length} answered</span>
                {isComplete && <span className="text-teal-600 font-semibold">Ready!</span>}
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${completedSignals / signals.length * 100}%` }}
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
            {isComplete ? "Find My Best Fit →" : "Answer all 3 questions to continue"}
          </button>
          </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Combobox ──────────────────────────────────────────────────────────────────

function CourseCombobox({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedName = SELECTABLE_COURSES.find((c) => c.id === selected)?.name ?? "";

  // Normalise query: collapse "btech" / "b.tech" / "b tech" → "b.tech" for matching
  const normalise = (s: string) =>
    s.toLowerCase().replace(/b\.?\s*tech/g, "btech").replace(/\s+/g, " ").trim();

  const suggestions = query.trim() === ""
    ? SELECTABLE_COURSES
    : SELECTABLE_COURSES.filter((c) => {
        const haystack = normalise(`${c.name} ${c.degree}`);
        return normalise(query)
          .split(" ")
          .filter(Boolean)
          .every((token) => haystack.includes(token));
      });

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        // If nothing confirmed, reset input to show selected name or empty
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setOpen(true);
    // Clear selection if user edits the field
    if (selected) onSelect("");
  }

  function handleSelect(id: string) {
    onSelect(id);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  }

  function handleFocus() {
    setOpen(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      inputRef.current?.blur();
    }
  }

  // Highlight matching part of a name
  function highlight(name: string) {
    if (!query.trim()) return <span>{name}</span>;
    const idx = name.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return <span>{name}</span>;
    return (
      <>
        {name.slice(0, idx)}
        <mark className="bg-teal-200 text-teal-900 rounded-sm">{name.slice(idx, idx + query.length)}</mark>
        {name.slice(idx + query.length)}
      </>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={selected && !open ? selectedName : query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Type to search a programme…"
          autoComplete="off"
          className={cn(
            "w-full bg-white/10 border rounded-xl px-4 py-3.5 pr-10 text-sm font-medium",
            "placeholder:text-teal-400 focus:outline-none transition-all duration-200",
            open
              ? "border-teal-300 bg-white/20 text-white"
              : selected
              ? "border-teal-400 bg-white/15 text-white"
              : "border-white/25 text-white"
          )}
        />
        {/* Icon: check if selected, search otherwise */}
        <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
          {selected && !open ? (
            <svg className="w-4 h-4 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          )}
        </div>
      </div>

      {/* Suggestion list */}
      {open && (
        <ul className="absolute left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
          {suggestions.length === 0 ? (
            <li className="px-4 py-3 text-sm text-slate-400 italic">No matching programmes</li>
          ) : (
            suggestions.map((course) => (
              <li key={course.id}>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault(); // prevent blur before click
                    handleSelect(course.id);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm transition-colors duration-100 cursor-pointer",
                    course.id === selected
                      ? "bg-teal-50 text-teal-800 font-semibold"
                      : "text-slate-800 hover:bg-slate-50"
                  )}
                >
                  <span className="font-medium">{highlight(course.name)}</span>
                  <span className="block text-xs text-slate-400 mt-0.5">{course.degree}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

// ── Step badge ────────────────────────────────────────────────────────────────

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
