import SectionCard from "@/components/SectionCard";

export default function AuditPage() {
  return (
    <main className="mx-auto max-w-7xl p-6 md:p-10">
      <h1 className="mb-6 text-3xl font-bold">Audit Trail</h1>
      <SectionCard title="Voting Audit" subtitle="Partner, scores, timestamps, lock state">
        <div className="overflow-x-auto rounded-2xl border">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Project</th>
                <th className="p-3 text-left">Segment</th>
                <th className="p-3 text-left">Partner</th>
                <th className="p-3 text-left">Scores</th>
                <th className="p-3 text-left">Last Edited</th>
                <th className="p-3 text-left">Locked At</th>
                <th className="p-3 text-left">Locked</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">Sample Project</td>
                <td className="p-3">Canopy Design</td>
                <td className="p-3">Mazhar Iqbal</td>
                <td className="p-3">8 / 5 / 2</td>
                <td className="p-3">2026-03-10 14:15</td>
                <td className="p-3">2026-03-10 14:17</td>
                <td className="p-3">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionCard>
    </main>
  );
}
