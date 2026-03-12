import { VotingBallot } from "@/components/project/voting-ballot";

export default function PartnerProjectPage() {
  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10">
      <h1 className="text-3xl font-bold">Voting Ballot</h1>
      <p className="mt-2 text-slate-600">This starter uses local state only. Replace with fetched project ballot data and save/lock server actions.</p>
      <div className="mt-8">
        <VotingBallot />
      </div>
    </main>
  );
}
