import { mockAuditRows } from "@/lib/reports/mock-data";

export default function AuditPage() {
  return (
    <main className="mx-auto max-w-7xl p-6 md:p-10">
      <h1 className="text-3xl font-bold">Audit Trail</h1>
      <p className="mt-2 text-slate-600">Full review of partner votes, timestamps, and lock status.</p>
      <div className="mt-6 overflow-x-auto rounded-2xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Segment</th>
              <th className="p-3">Partner</th>
              <th className="p-3">Option 1</th>
              <th className="p-3">Option 2</th>
              <th className="p-3">Option 3</th>
              <th className="p-3">Total</th>
              <th className="p-3">Locked</th>
              <th className="p-3">Last Edited</th>
              <th className="p-3">Locked At</th>
            </tr>
          </thead>
          <tbody>
            {mockAuditRows.map((row, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-3">{row.segment}</td>
                <td className="p-3">{row.partner}</td>
                <td className="p-3">{row.option1}</td>
                <td className="p-3">{row.option2}</td>
                <td className="p-3">{row.option3}</td>
                <td className="p-3">{row.total}</td>
                <td className="p-3">{row.locked}</td>
                <td className="p-3">{row.lastEdited}</td>
                <td className="p-3">{row.lockedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
