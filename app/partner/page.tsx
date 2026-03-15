"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PartnerDashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login"); return; }

     
      const { data, error } = await supabase
        .from("project_participants")
        .select("project_id, projects(id, title, description, status)")
        .eq("profile_id", user.id);

      if (error) { console.error(error); setLoading(false); return; }

      const assigned = (data || []).map((row: any) => row.projects).filter(Boolean);
      setProjects(assigned);
      setLoading(false);
    };
    load();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loading) return (
    <main className="mx-auto max-w-5xl p-6 md:p-10">
      <p className="text-slate-500">Loading...</p>
    </main>
  );

  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Partner Dashboard</h1>
          <p className="mt-1 text-slate-600">Your assigned voting projects.</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-xl border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          Logout
        </button>
      </header>

      {projects.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <p className="text-slate-500">No projects have been assigned to you yet.</p>
          <p className="mt-1 text-sm text-slate-400">Contact the admin to get assigned to a project.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map(project => (
            <div key={project.id} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <span className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${
                  project.status === "open" ? "bg-green-100 text-green-700" :
                  project.status === "closed" ? "bg-slate-100 text-slate-600" :
                  "bg-amber-100 text-amber-700"
                }`}>
                  {project.status}
                </span>
              </div>
              {project.description && (
                <p className="mt-2 text-sm text-slate-600">{project.description}</p>
              )}
              <div className="mt-4">
                {project.status === "open" ? (
                  <Link
                    href={`/partner/project/${project.id}`}
                    className="inline-block rounded-xl bg-slate-900 px-4 py-2 text-sm text-white no-underline"
                  >
                    Open ballot
                  </Link>
                ) : (
                  <Link
                    href={`/partner/project/${project.id}`}
                    className="inline-block rounded-xl border px-4 py-2 text-sm no-underline"
                  >
                    View ballot
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}