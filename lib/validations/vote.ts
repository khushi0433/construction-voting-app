import { z } from "zod";

export const voteInputSchema = z.object({
  projectId: z.string().uuid(),
  segmentId: z.string().uuid(),
  optionId: z.string().uuid(),
  score: z.number().int().min(1).max(10),
});

export const voteLockSchema = z.object({
  projectId: z.string().uuid(),
  voterId: z.string().uuid(),
});
