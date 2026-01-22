import { describe, it, expect } from "vitest";
import { calculateClarity } from "./calculate-clarity";
import { type DvpData } from "../../dvp/types";

describe("calculateClarity", () => {
  it("should return 0 for empty data", () => {
    const result = calculateClarity(null);
    expect(result.score).toBe(0);
  });

  it("should return intermediate score when data is present but not validated", () => {
    const data: DvpData = {
      city: "Paris",
      country: "France",
      budget: { savings: 1000 },
      stepStatus: {
        project: "EDITING",
        budget: "EDITING",
        housing: "EDITING",
        language: "EDITING"
      }
    };
    
    const result = calculateClarity(data);
    // Completion: 0% * 0.7 = 0
    // Coherence: (Project + Budget) = 50% * 0.3 = 15
    expect(result.score).toBe(15);
  });

  it("should return high score when everything is validated", () => {
    const data: DvpData = {
      city: "Paris",
      country: "France",
      budget: { savings: 1000 },
      housing: { cost: 500 },
      language: { level: "B2" },
      stepStatus: {
        project: "VALIDATED",
        budget: "VALIDATED",
        housing: "VALIDATED",
        language: "VALIDATED"
      }
    };
    
    const result = calculateClarity(data);
    expect(result.score).toBe(100);
  });

  it("should reflect progress when a step is validated", () => {
    const data: DvpData = {
      city: "Paris",
      country: "France",
      stepStatus: {
        project: "VALIDATED",
        budget: "EDITING",
        housing: "EDITING",
        language: "EDITING"
      }
    };
    
    const result = calculateClarity(data);
    // Completion: 25% * 0.7 = 17.5
    // Coherence: 25% * 0.3 = 7.5
    // Total: 25
    expect(result.score).toBe(25);
  });
});
