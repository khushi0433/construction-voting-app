export async function requireAdmin() {
  // TODO: Replace with server-side Supabase session lookup and role check.
  return { id: "admin-seed", role: "admin" };
}

export async function requirePartner() {
  // TODO: Replace with server-side Supabase session lookup and assignment validation.
  return { id: "partner-seed", role: "partner" };
}
