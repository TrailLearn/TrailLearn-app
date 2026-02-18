import { z } from "zod";

// --- IA 1: Orientation ---

export const OrientationInputsSchema = z.object({
  studyDomain: z.string(),
  academicLevel: z.string(),
  currentSkills: z.array(z.string()),
  languages: z.array(z.string()),
  approximateBudget: z.string(),
  targetSalary: z.string(),
  mobility: z.enum(["local", "europe", "international"]),
  targetEnvironment: z.string().optional(), // Country or City
  targetJob: z.string().optional(), // If user already has an idea
});

export type OrientationInputs = z.infer<typeof OrientationInputsSchema>;

export const OrientationOutputSchema = z.object({
  recommendedJobs: z.array(z.object({
    title: z.string(),
    relevance: z.string(), // Why it's a good fit
    estimatedSalary: z.string(),
    marketDemand: z.enum(["high", "medium", "low"]),
  })),
  environmentComparison: z.array(z.object({
    location: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    costOfLiving: z.string(),
  })),
  skillsGaps: z.array(z.object({
    skill: z.string(),
    priority: z.enum(["critical", "important", "optional"]),
    learningDifficulty: z.string(),
  })),
  actionPlan: z.object({
    shortTerm: z.array(z.string()), // 0-3 months
    mediumTerm: z.array(z.string()), // 3-6 months
    longTerm: z.array(z.string()), // 6-12 months
  }),
});

export type OrientationOutput = z.infer<typeof OrientationOutputSchema>;

// --- IA 2: Opportunities ---

export const OpportunityInputsSchema = z.object({
  targetJob: z.string(),
  targetEnvironment: z.string(),
  horizonMonths: z.number().min(3).max(12),
  financialConstraints: z.string(),
});

export type OpportunityInputs = z.infer<typeof OpportunityInputsSchema>;

export const OpportunityOutputSchema = z.object({
  priorityOpportunities: z.array(z.object({
    type: z.enum(["school", "master", "bootcamp", "scholarship", "contest", "event"]),
    name: z.string(),
    provider: z.string(),
    deadline: z.string(), // Use empty string if not available
    link: z.string(), // Use empty string if not available
    whyMe: z.string(), // Justification
  })),
  concretePaths: z.array(z.object({
    name: z.string(),
    steps: z.array(z.string()),
  })),
  recommendedCertifications: z.array(z.object({
    name: z.string(),
    justification: z.string(),
  })),
  portfolioProjects: z.array(z.object({
    title: z.string(),
    description: z.string(),
    relevanceToTarget: z.string(),
  })),
  weeklyPlan: z.array(z.object({
    week: z.number(),
    focus: z.string(),
    tasks: z.array(z.string()),
  })),
});

export type OpportunityOutput = z.infer<typeof OpportunityOutputSchema>;

// --- UI Blocks for Chat ---

export type UIBlockType = 
  | "JOB_RECOMMENDATION" 
  | "ENVIRONMENT_COMPARISON" 
  | "SKILLS_GAP" 
  | "ACTION_PLAN"
  | "OPPORTUNITY_LIST"
  | "WEEKLY_PLAN";

export interface UIBlock {
  type: UIBlockType;
  data: any; // Strictly typed in components
}

