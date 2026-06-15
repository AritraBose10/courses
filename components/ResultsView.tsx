"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { courses, resolveRoute, signalToStrengths, signals, Course } from "@/lib/courses";

function SaturationPill({ level }: { level: "Low" | "Medium" | "High" }) {
  const config = {
    Low: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", label: "Low saturation" },
    Medium: { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50 border-amber-200", label: "Medium saturation" },
    High: { dot: "bg-red-400", text: "text-red-600", bg: "bg-red-50 border-red-200", label: "High saturation" },
  }[level];
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${config.bg} ${config.text} w-fit`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      {config.label}
    </div>
  );
}

function StatLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide mb-1">{children}</p>;
}

function CompareCard({
  label, labelBg, labelColor, border, course, chipBg, salaryColor, textColor, cta,
}: {
  label: string; labelBg: string; labelColor: string; border: string;
  course: Course; chipBg: string; salaryColor: string; textColor: string; cta: React.ReactNode;
}) {
  const s = course.comparisonStats;
  return (
    <div className={`bg-white rounded-2xl border-2 ${border} shadow-sm flex flex-col overflow-hidden`}>
      <div className={`${labelBg} px-3 py-1.5`}>
        <span className={`${labelColor} text-[10px] font-bold tracking-wide uppercase`}>{label}</span>
      </div>
      <div className="p-3 flex flex-col gap-3">
        <h3 className="font-bold text-slate-900 text-xs leading-snug">{course.name}</h3>

        {s && (
          <>
            <SaturationPill level={s.saturation} />

            <div>
              <StatLabel>Starting salary</StatLabel>
              <p className={`text-sm font-bold ${salaryColor}`}>{s.salaryRange}</p>
            </div>

            <div>
              <StatLabel>Market signal</StatLabel>
              <p className={`text-[11px] ${textColor} leading-snug`}>{s.demandSignal}</p>
            </div>

            <div>
              <StatLabel>Top roles</StatLabel>
              <div className="flex flex-wrap gap-1">
                {s.topRoles.map((r, i) => (
                  <span key={i} className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${chipBg}`}>{r}</span>
                ))}
              </div>
            </div>

            <div>
              <StatLabel>Career ceiling</StatLabel>
              <div className="flex flex-wrap gap-1">
                {s.careerCeiling.map((r, i) => (
                  <span key={i} className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${chipBg}`}>{r}</span>
                ))}
              </div>
            </div>

            <div>
              <StatLabel>Who&apos;s hiring</StatLabel>
              <div className="flex flex-wrap gap-1">
                {s.topHirers.map((h, i) => (
                  <span key={i} className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${chipBg}`}>{h}</span>
                ))}
              </div>
            </div>

            <div>
              <StatLabel>Skills you graduate with</StatLabel>
              <div className="flex flex-wrap gap-1">
                {s.keySkills.map((sk, i) => (
                  <span key={i} className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${chipBg}`}>{sk}</span>
                ))}
              </div>
            </div>

            <div>
              <StatLabel>Postgrad edge</StatLabel>
              <p className={`text-[11px] ${textColor} leading-snug italic`}>{s.postgradEdge}</p>
            </div>
          </>
        )}

        {cta}
      </div>
    </div>
  );
}

export default function ResultsView() {
  const searchParams = useSearchParams();

  const sourceCourseId = searchParams.get("course") ?? "";
  const userSignals: Record<string, string> = {};
  signals.forEach((s) => {
    const val = searchParams.get(`signal_${s.key}`);
    if (val) userSignals[s.key] = val;
  });

  const sourceCourse = courses.find((c) => c.id === sourceCourseId);
  const resolved = resolveRoute(sourceCourseId, userSignals);
  const destCourseId = resolved?.destinationCourseId ?? sourceCourseId;
  const recommendedCourse = courses.find((c) => c.id === destCourseId) ?? sourceCourse;
  const isRedirected = !!resolved && destCourseId !== sourceCourseId;

  if (!sourceCourse || !recommendedCourse) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <p className="text-slate-600 mb-3">We couldn&apos;t find that programme.</p>
          <Link
            href="/"
            className="text-teal-600 font-semibold underline underline-offset-2 cursor-pointer"
          >
            Start over
          </Link>
        </div>
      </div>
    );
  }

  // Derive matched strengths from user signals
  const strengthMap = signalToStrengths[recommendedCourse.id] ?? {};
  const matchedStrengths = new Set<string>();
  Object.entries(userSignals).forEach(([key, val]) => {
    (strengthMap[`${key}:${val}`] ?? []).forEach((s) => matchedStrengths.add(s));
  });
  const whyFits = Array.from(matchedStrengths).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-950 text-white px-5 pt-8 pb-14">
        <div className="max-w-xl mx-auto">
          {/* Brand + back nav */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src="/tiu-logo.svg" alt="TIU" className="w-9 h-9 shrink-0" />
              <div>
                <p className="text-white font-bold text-sm leading-tight tracking-wide">Techno India University</p>
                <p className="text-teal-300 text-[10px] font-semibold tracking-widest uppercase mt-0.5">Course Finder</p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-teal-300 hover:text-white text-sm transition-colors duration-150 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Start over
            </Link>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Our top pick for you
            </span>
            {isRedirected && (
              <span className="inline-block bg-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
                Better fit than your original choice
              </span>
            )}
          </div>

          <p className="text-teal-300 text-xs font-semibold tracking-widest uppercase mb-1">
            {recommendedCourse.degree}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-balance">
            {recommendedCourse.name}
          </h1>
          <p className="text-teal-200 mt-2 text-sm italic leading-relaxed">
            &ldquo;{recommendedCourse.tagline}&rdquo;
          </p>

          {/* Pitch angle */}
          {resolved?.pitchAngle && (
            <div className="mt-6 bg-white/10 border border-white/20 rounded-2xl px-5 py-4">
              <p className="text-sm text-teal-100 leading-relaxed">
                {resolved.pitchAngle}
              </p>
            </div>
          )}

          {/* Hero CTA */}
          <a
            href="#apply"
            className="mt-7 inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold px-7 py-3.5 rounded-2xl transition-all duration-200 text-sm cursor-pointer shadow-lg shadow-orange-900/30 hover:shadow-orange-900/40"
          >
            Apply for {recommendedCourse.name} →
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="-mt-6 rounded-t-3xl bg-slate-50 relative z-10 pb-12">
        <div className="max-w-xl mx-auto px-5 pt-8 space-y-6">

          {/* Why this fits you */}
          {whyFits.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-bold text-slate-900 text-base mb-1">Why this fits you</h2>
              <p className="text-xs text-slate-400 mb-4">Based on what you told us.</p>
              <div className="space-y-3">
                {whyFits.map((strength, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{strength}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Comparison section */}
          {isRedirected ? (
            <section>
              <h2 className="font-bold text-slate-900 text-base mb-1">Head-to-head</h2>
              <p className="text-xs text-slate-400 mb-4">
                Same first two years. Here&apos;s what changes after that.
              </p>

              <div className="grid grid-cols-2 gap-3">

                {/* Recommended card */}
                <CompareCard
                  label="Recommended"
                  labelBg="bg-teal-600"
                  labelColor="text-white"
                  border="border-teal-500"
                  course={recommendedCourse}
                  chipBg="bg-teal-50 border-teal-200 text-teal-800"
                  salaryColor="text-teal-700"
                  textColor="text-slate-700"
                  cta={
                    <a href="#apply" id="apply" className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-all duration-200 text-xs cursor-pointer">
                      Apply →
                    </a>
                  }
                />

                {/* Original choice card */}
                <CompareCard
                  label="Your pick"
                  labelBg="bg-slate-100"
                  labelColor="text-slate-500"
                  border="border-slate-200"
                  course={sourceCourse}
                  chipBg="bg-slate-50 border-slate-200 text-slate-500"
                  salaryColor="text-slate-500"
                  textColor="text-slate-500"
                  cta={
                    <a href="#" className="block w-full text-center border-2 border-slate-200 hover:border-teal-400 text-slate-500 hover:text-teal-700 font-semibold py-2 rounded-lg transition-all duration-200 text-xs cursor-pointer">
                      Apply
                    </a>
                  }
                />

              </div>
            </section>
          ) : (
            /* No redirect — show curriculum directly */
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-bold text-slate-900 text-base mb-4">Curriculum highlights</h2>
              <ul className="space-y-2 mb-6">
                {recommendedCourse.curriculumHighlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              {recommendedCourse.overlapNote && (
                <p className="text-xs text-teal-800 bg-teal-50 rounded-xl px-3 py-2.5 font-medium leading-relaxed">
                  {recommendedCourse.overlapNote}
                </p>
              )}
            </section>
          )}

          {/* Programme strengths */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="font-bold text-slate-900 text-base mb-4">What makes this programme strong</h2>
            <div className="space-y-3">
              {recommendedCourse.realStrengths.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Labs (if present) */}
          {recommendedCourse.labs && recommendedCourse.labs.length > 0 && (
            <section className="bg-teal-600 rounded-2xl p-6 text-white">
              <h2 className="font-bold text-base mb-3">Facilities & labs</h2>
              <div className="flex flex-wrap gap-2">
                {recommendedCourse.labs.map((lab, i) => (
                  <span key={i} className="bg-white/15 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    {lab}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Final CTA */}
          <div className="space-y-3 pt-2">
            <a
              href="#"
              className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-4 rounded-2xl transition-all duration-200 text-base cursor-pointer shadow-lg shadow-orange-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              Apply for {recommendedCourse.name} →
            </a>
            <Link
              href="/"
              className="block text-center text-sm text-slate-400 hover:text-teal-600 cursor-pointer transition-colors duration-150"
            >
              Start over with a different programme
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
