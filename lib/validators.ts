import { z } from "zod";

export const scoreSchema = z.number().int().min(1).max(10);

export const segmentSchema = z.object({
  title: z.string().min(1),
  options: z.array(z.string().min(1)).length(3)
});

export const votePayloadSchema = z.object({
  projectId: z.string().uuid(),
  segmentId: z.string().uuid(),
  voterId: z.string().uuid(),
  scores: z.array(scoreSchema).length(3)
});
