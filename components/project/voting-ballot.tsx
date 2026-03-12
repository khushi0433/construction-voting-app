"use client";

import { useState } from "react";
import { sampleBallot } from "@/lib/reports/mock-data";

type VotingBallotProps = {
  projectId: string;
};

export function VotingBallot({ projectId }: VotingBallotProps) {
  const [scores, setScores] = useState<Record<string, number | "">>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const saveDraft = () => {
    console.log("Saving draft for project:", projectId);
    console.log(scores);
  };

  const lockVotes = async () => {
  setLoading(true);
  setMessage(null);
  setError(null);

  try {
    console.log("Locking votes for project:", projectId);
    console.log(scores);

    if (Object.keys(scores).length === 0) {
      throw new Error("You must score at least one option.");
    }

    // simulate saving (replace later with Supabase)
    await new Promise((resolve) => setTimeout(resolve, 800));

    setMessage("Your votes have been locked successfully.");
  } catch (err: any) {
    setError(err.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-6">
      {sampleBallot.map((segment) => (
        <div
          key={segment.id}
          className="rounded-2xl border bg-white p-5 shadow-sm"
        >
          <h2 className="text-xl font-semibold">{segment.title}</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {segment.options.map((option) => {
              const key = `${segment.id}-${option.id}`;

              return (
                <div key={option.id} className="rounded-xl border p-4">
                  <div className="font-medium">{option.label}</div>

                  <label className="mt-3 block text-xs text-slate-500">
                    Score 1 to 10
                  </label>

                  <input
                    type="number"
                    min={1}
                    max={10}
                    className="mt-1 w-full rounded-xl border px-3 py-2"
                    value={scores[key] ?? ""}
                    onChange={(e) =>
                      setScores((prev) => ({
                        ...prev,
                        [key]:
                          e.target.value === "" ? "" : Number(e.target.value),
                      }))
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {message && (
  <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-green-700">
    {message}
  </div>
)}

{error && (
  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
    {error}
  </div>
)}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={saveDraft}
          className="rounded-xl border px-4 py-2"
        >
          Save draft
        </button>

        <button
  type="button"
  onClick={lockVotes}
  disabled={loading}
  className="rounded-xl bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
>
  {loading ? "Locking..." : "Lock my votes"}
</button>
      </div>
    </div>
  );
}