import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl p-6 md:p-10">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Construction Voting App</h1>
        <p className="mt-3 text-slate-600">
          Starter project for a six-partner construction decision system with scoring, ballot locking, audit trail, and exports.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-slate-900 px-4 py-2 text-white no-underline" href="/login">Go to login</Link>
          <Link className="rounded-xl border px-4 py-2 no-underline" href="/admin">Admin dashboard</Link>
          <Link className="rounded-xl border px-4 py-2 no-underline" href="/partner">Partner dashboard</Link>
        </div>
      </div>
    </main>
  );
}
