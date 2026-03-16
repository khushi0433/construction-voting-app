import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName, projectId } = await req.json();

    if (!email || !fullName || !projectId) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceRoleKey || !supabaseUrl) {
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // 1. Check if a user with this email already exists
    let userId: string;
    let reused = false;
    const { data: listData } = await adminClient.auth.admin.listUsers({ perPage: 1000 });
    const existingUser = listData?.users?.find(
      (u) => u.email?.toLowerCase() === email.trim().toLowerCase()
    );

    if (existingUser) {
      // Reuse existing user — skip creation entirely
      userId = existingUser.id;
      reused = true;
    } else {
      // New user — password is required
      if (!password || password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
      }

      const { data: authData, error: authErr } = await adminClient.auth.admin.createUser({
        email: email.trim(),
        password: password.trim(),
        email_confirm: true,
        user_metadata: { full_name: fullName.trim(), role: "partner" },
      });

      if (authErr) {
        return NextResponse.json({ error: authErr.message }, { status: 400 });
      }
      userId = authData.user.id;
    }

    // 2. Upsert profile (safe for both new and existing users)
    const { error: profileErr } = await adminClient
      .from("profiles")
      .upsert(
        { id: userId, full_name: fullName.trim(), email: email.trim(), role: "partner" },
        { onConflict: "id" }
      );

    if (profileErr) {
      return NextResponse.json({ error: profileErr.message }, { status: 400 });
    }

    // 3. Add to project_participants
    const { error: ppErr } = await adminClient
      .from("project_participants")
      .insert({ project_id: projectId, profile_id: userId });

    if (ppErr) {
      if (ppErr.code === "23505") {
        return NextResponse.json({ error: "This partner is already assigned to this project." }, { status: 409 });
      }
      return NextResponse.json({ error: ppErr.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, userId, reused });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unexpected error." }, { status: 500 });
  }
}