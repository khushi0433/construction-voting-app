import { mockProjects } from "@/lib/reports/mock-data";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <main className="mx-auto max-w-6xl p-6 md:p-10">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-600">Create projects, open or close voting, review results, and export audit data.</p>
        </div>
        <button className="rounded-xl bg-slate-900 px-4 py-2 text-white">Create Project</button>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockProjects.map((project) => (
          <div key={project.id} className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-sm text-slate-500">Status: {project.status}</p>
              </div>
              <span className="rounded-full border px-3 py-1 text-xs font-medium">{project.participantCount} partners</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={`/admin/projects/${project.id}/results`} className="rounded-xl border px-3 py-2 no-underline">Results</Link>
              <Link href={`/admin/projects/${project.id}/audit`} className="rounded-xl border px-3 py-2 no-underline">Audit</Link>
              <Link href="/admin/partners" className="rounded-xl border px-3 py-2 no-underline">Partners</Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
