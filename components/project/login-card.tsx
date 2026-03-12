"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export function LoginCard() {
  const router = useRouter();

  const [mode, setMode] = useState<"admin" | "partner">("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/partner");
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">Login</h1>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setMode("admin")}
          className={`rounded-xl px-4 py-2 ${
            mode === "admin" ? "bg-slate-900 text-white" : "border"
          }`}
        >
          Admin
        </button>

        <button
          onClick={() => setMode("partner")}
          className={`rounded-xl px-4 py-2 ${
            mode === "partner" ? "bg-slate-900 text-white" : "border"
          }`}
        >
          Partner
        </button>
      </div>

      <div className="mt-6 space-y-3">
        <input
          className="w-full rounded-xl border px-3 py-2"
          placeholder={mode === "admin" ? "Admin email" : "Partner email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full rounded-xl border px-3 py-2"
          placeholder={mode === "admin" ? "Password" : "PIN or password"}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );
}