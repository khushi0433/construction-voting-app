"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
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

  return <>{children}</>;
}
