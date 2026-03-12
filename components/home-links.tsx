"use client";

import Link from "next/link";
import { useAdmin } from "@/hooks/useAdmin";

export function HomeLinks() {
  const { isAdmin, loading } = useAdmin();

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link className="rounded-xl bg-slate-900 px-4 py-2 text-white no-underline" href="/login">
        Go to login
      </Link>
      {!loading && isAdmin && (
        <Link className="rounded-xl border px-4 py-2 no-underline" href="/admin">
          Admin dashboard
        </Link>
      )}
      <Link className="rounded-xl border px-4 py-2 no-underline" href="/partner">
        Partner dashboard
      </Link>
    </div>
  );
}
