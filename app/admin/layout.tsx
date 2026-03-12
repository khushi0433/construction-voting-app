"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, loading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, loading, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl p-6 md:p-10">
        <p>Loading...</p>
      </main>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <header className="border-b bg-white px-6 py-3 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-end">
          <button
            onClick={handleLogout}
            className="rounded-xl border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </header>
      {children}
    </>
  );
}
