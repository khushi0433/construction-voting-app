import { mockResultSummary } from "@/lib/reports/mock-data";

export default function ResultsPage() {
  return (
    <main className="mx-auto max-w-6xl p-6 md:p-10">
      <h1 className="text-3xl font-bold">Project Results</h1>
      <p className="mt-2 text-slate-600">Replace this mock summary with a grouped aggregate query from Supabase.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {mockResultSummary.map((segment) => (
          <div key={segment.segment} className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold">{segment.segment}</h2>
            <div className="mt-4 space-y-3">
              {segment.options.map((option) => (
                <div key={option.label} className={`rounded-xl border p-3 ${option.isWinner ? "border-emerald-400 bg-emerald-50" : ""}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-2xl font-bold">{option.total}</span>
                  </div>
                </div>
              ))}
              {segment.isTie && <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm">Tie detected. Mark for review.</div>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
