import { describe, it, expect } from "vitest";
import { OrientationService } from "../services/orientation.service";
import { OpportunityService } from "../services/opportunities.service";

// Skip integration tests in CI if no API KEY
const skipIntegration = !process.env.OPENAI_API_KEY && !process.env.AZURE_API_KEY && !process.env.DEEPSEEK_API_KEY;

describe("Dual AI Integration Flow", () => {
  it.skipIf(skipIntegration)("should generate a chat response", async () => {
    // 1. Orientation Chat
    const orientation = await OrientationService.chat([
      { role: "user", content: "Je veux devenir ingénieur à Berlin" }
    ]);

    expect(orientation).toBeDefined();
  }, 30000);
});
