import { z } from "zod";

// Schema for the flexible JSONB content of the DVP
export const dvpDataSchema = z.object({
  // Project Pillar
  city: z.string().optional(),
  country: z.string().optional(),
  studyType: z.string().optional(),
  
  // Budget Pillar
  budget: z.object({
    savings: z.number().min(0).optional(),
    guarantorHelp: z.number().min(0).optional(),
    otherIncome: z.number().min(0).optional(),
  }).optional(),

  // Housing Pillar (Placeholder for now)
  housing: z.object({
    type: z.string().optional(),
    cost: z.number().optional(),
  }).optional(),

  // Language Pillar
  language: z.object({
    level: z.string().optional(),
  }).optional(),
});

export type DvpData = z.infer<typeof dvpDataSchema>;

export type ViabilityStatus = "RED" | "AMBER" | "GREEN" | "INCOMPLETE";

export interface ViabilityFinding {
  pillar: "project" | "budget" | "housing" | "language";
  severity: "RED" | "AMBER";
  message: string;
}

export interface ViabilityResult {
  status: ViabilityStatus;
  score: number; // 0-100
  resteAVivre: number;
  findings: ViabilityFinding[];
  calculationTrace: string[]; // Step-by-step logs
  calculatedAt: string;
  rulesVersion: string;
}

export interface BusinessRuleSummary {
  key: string;
  value: any;
  category: string;
}
