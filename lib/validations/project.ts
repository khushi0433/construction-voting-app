import { z } from "zod";

export const optionSchema = z.string().trim().min(1);

export const segmentSchema = z.object({
  title: z.string().trim().min(1),
  options: z.array(optionSchema).length(3),
});

export const projectSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  status: z.enum(["draft", "open", "closed", "archived"]),
  opensAt: z.string().optional(),
  closesAt: z.string().optional(),
  segments: z.array(segmentSchema).min(1),
});
