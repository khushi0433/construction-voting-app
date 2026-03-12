import { defaultPartnerSeed } from "@/lib/reports/mock-data";

export default function PartnerManagementPage() {
  return (
    <main className="mx-auto max-w-4xl p-6 md:p-10">
      <h1 className="text-3xl font-bold">Partner Management</h1>
      <p className="mt-2 text-slate-600">Create accounts, reset credentials, and assign partners to projects.</p>
      <div className="mt-6 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Temporary PIN</th>
            </tr>
          </thead>
          <tbody>
            {defaultPartnerSeed.map((partner) => (
              <tr key={partner.name} className="border-t">
                <td className="p-3">{partner.name}</td>
                <td className="p-3">Partner</td>
                <td className="p-3">Active</td>
                <td className="p-3">{partner.pin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
