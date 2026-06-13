import { Suspense } from "react";
import ResultsView from "@/components/ResultsView";

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 rounded-full border-2 border-teal-600 border-t-transparent animate-spin mx-auto" />
              <p className="text-slate-500 text-sm">Finding your best fit…</p>
            </div>
          </div>
        }
      >
        <ResultsView />
      </Suspense>
    </main>
  );
}
