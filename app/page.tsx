import { HomeLinks } from "@/components/home-links";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl p-6 md:p-10">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Construction Voting App</h1>
        <p className="mt-3 text-slate-600">
          Starter project for a six-partner construction decision system with scoring, ballot locking, audit trail, and exports.
        </p>
        <HomeLinks />
      </div>
    </main>
  );
}
