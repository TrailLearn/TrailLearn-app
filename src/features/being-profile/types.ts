import { z } from "zod";

export const valueSchema = z.object({
  name: z.string(),
  intensity: z.number().min(0).max(100),
  description: z.string().optional(),
});

export const sabotagePatternSchema = z.object({
  type: z.string(), // e.g., "Analysis Paralysis", "Authority Rejection"
  triggers: z.array(z.string()),
  mitigationStrategy: z.string().optional(),
});

export const beingProfileSchema = z.object({
  // Experience Texture
  values: z.array(valueSchema).default([]),
  meaningScale: z.number().min(0).max(100).optional(),
  complexityLevel: z.number().min(0).max(100).optional(),
  psychologicalSafety: z.number().min(0).max(100).optional(),

  // Evolutionary Kinetics
  vitalRenewalRate: z.number().int().positive().optional(),
  growthArchetype: z.string().optional(),
  kineticSignature: z.any().optional(), // Can be refined later

  // Shadow Zone
  sabotagePatterns: z.array(sabotagePatternSchema).default([]),
  exposureTolerance: z.number().min(0).max(100).optional(),
  shadowTriggers: z.array(z.string()).default([]),
});

export type BeingProfileData = z.infer<typeof beingProfileSchema>;
export type Value = z.infer<typeof valueSchema>;
export type SabotagePattern = z.infer<typeof sabotagePatternSchema>;
