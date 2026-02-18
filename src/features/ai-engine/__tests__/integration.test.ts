import { describe, it, expect, vi } from "vitest";
import { OrientationService } from "../services/orientation.service";
import { OpportunityService } from "../services/opportunities.service";

// Skip integration tests in CI if no API KEY
const skipIntegration = !process.env.OPENAI_API_KEY && !process.env.AZURE_API_KEY && !process.env.DEEPSEEK_API_KEY;

describe("Dual AI Integration Flow", () => {
  it.skipIf(skipIntegration)("should generate a full flow from orientation to opportunities", async () => {
    // 1. Orientation
    const orientation = await OrientationService.generatePlan({
      studyDomain: "Informatique",
      academicLevel: "Master 1",
      currentSkills: ["JavaScript", "React"],
      languages: ["Francais"],
      approximateBudget: "5000 Euros",
      targetSalary: "45k Euros",
      mobility: "international",
      targetEnvironment: "Berlin",
    });

    expect(orientation.recommendedJobs.length).toBeGreaterThan(0);
    const targetJob = orientation.recommendedJobs[0]?.title ?? "Unknown";

    // 2. Opportunities
    const opportunities = await OpportunityService.generateOpportunities({
      targetJob,
      targetEnvironment: "Berlin",
      horizonMonths: 6,
      financialConstraints: "Budget serre",
    });

    expect(opportunities.priorityOpportunities.length).toBeGreaterThan(0);
    expect(opportunities.weeklyPlan.length).toBeGreaterThan(0);
  }, 30000); // Increase timeout for LLM calls
});
