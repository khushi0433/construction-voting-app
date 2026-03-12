import SectionCard from "@/components/SectionCard";

export default function ResultsPage() {
  return (
    <main className="mx-auto max-w-6xl p-6 md:p-10">
      <h1 className="mb-6 text-3xl font-bold">Results</h1>
      <SectionCard title="Segment Totals" subtitle="Replace mock data with aggregated query">
        <div className="rounded-2xl border p-4">
          <div className="text-lg font-semibold">Canopy Design</div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-emerald-400 bg-emerald-50 p-3">
              <div className="font-medium">Modern steel canopy</div>
              <div className="mt-1 text-2xl font-bold">47</div>
              <div className="text-xs text-emerald-700">Winning total</div>
            </div>
            <div className="rounded-xl border p-3">
              <div className="font-medium">Classic canopy</div>
              <div className="mt-1 text-2xl font-bold">31</div>
            </div>
            <div className="rounded-xl border p-3">
              <div className="font-medium">Budget canopy</div>
              <div className="mt-1 text-2xl font-bold">12</div>
            </div>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}
