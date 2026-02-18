import { describe, it, expect } from "vitest";
import { OrientationOutputSchema, OpportunityOutputSchema } from "../types";

describe("AI Engine Parsers", () => {
  it("should validate a valid OrientationOutput", () => {
    const validData = {
      recommendedJobs: [
        { title: "Software Engineer", relevance: "Strong background in logic", estimatedSalary: "50k-70k", marketDemand: "high" }
      ],
      environmentComparison: [
        { location: "Paris", pros: ["Hub tech"], cons: ["Expensive"], costOfLiving: "High" }
      ],
      skillsGaps: [
        { skill: "TypeScript", priority: "critical", learningDifficulty: "Medium" }
      ],
      actionPlan: {
        shortTerm: ["Learn TS basics"],
        mediumTerm: ["Build a project"],
        longTerm: ["Apply for jobs"]
      }
    };

    const result = OrientationOutputSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail on invalid OrientationOutput", () => {
    const invalidData = {
      recommendedJobs: [{ title: "Broken" }] // Missing fields
    };

    const result = OrientationOutputSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should validate a valid OpportunityOutput", () => {
    const validData = {
      priorityOpportunities: [
        { type: "bootcamp", name: "Le Wagon", provider: "Le Wagon", whyMe: "Fast track to coding", deadline: "", link: "" }
      ],
      concretePaths: [
        { name: "Fullstack Path", steps: ["Step 1", "Step 2"] }
      ],
      recommendedCertifications: [
        { name: "AWS Certified Developer", justification: "High demand" }
      ],
      portfolioProjects: [
        { title: "E-commerce app", description: "MERN stack", relevanceToTarget: "Shows fullstack skills" }
      ],
      weeklyPlan: [
        { week: 1, focus: "Setup", tasks: ["Task 1"] }
      ]
    };

    const result = OpportunityOutputSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
