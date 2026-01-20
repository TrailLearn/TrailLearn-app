import { describe, expect, it } from "vitest";
import { calculateViability } from "./calculate-viability";
import { type BusinessRuleSummary, type DvpData } from "../types";

const mockRules: BusinessRuleSummary[] = [
  {
    key: "viability_thresholds",
    category: "viability",
    value: {
      seuil_survie: 200,
      seuil_confort: 500,
      min_language_level: "B2",
    },
  },
  {
    key: "city_cost_indices",
    category: "city",
    value: {
      paris: 1.2,
      lyon: 1.0,
      default: 0.8,
    },
  }
];

describe("calculateViability", () => {
  it("returns INCOMPLETE if critical data is missing", () => {
    const result = calculateViability({ city: "Paris" } as DvpData, mockRules);
    expect(result.status).toBe("INCOMPLETE");
  });

  it("returns GREEN for a comfortable budget in Paris", () => {
    const data: DvpData = {
      city: "Paris",
      budget: {
        savings: 2400, // 200/mo
        guarantorHelp: 1000,
        otherIncome: 0
      },
      housing: {
        cost: 500
      },
      language: {
        level: "B2"
      }
    };
    
    // Resources: 1000 + 200 = 1200
    // Reste à vivre: 1200 - 500 = 700
    // Adjusted thresholds: 200*1.2=240, 500*1.2=600
    // 700 > 600 -> GREEN
    
    const result = calculateViability(data, mockRules);
    expect(result.status).toBe("GREEN");
    expect(result.resteAVivre).toBe(700);
    expect(result.calculationTrace.length).toBeGreaterThan(0);
    expect(result.calculationTrace).toContain("Diagnostic Budget: GREEN");
  });

  it("returns AMBER for a tight budget in Paris", () => {
    const data: DvpData = {
      city: "Paris",
      budget: {
        savings: 0,
        guarantorHelp: 800,
        otherIncome: 0
      },
      housing: {
        cost: 500
      },
      language: {
        level: "B2"
      }
    };
    
    // Resources: 800
    // Reste à vivre: 800 - 500 = 300
    // Adjusted thresholds: 240, 600
    // 240 < 300 < 600 -> AMBER
    
    const result = calculateViability(data, mockRules);
    expect(result.status).toBe("AMBER");
    expect(result.findings[0]?.message).toContain("Budget serré");
  });

  it("returns RED for a critical budget", () => {
    const data: DvpData = {
      city: "Lyon",
      budget: {
        savings: 0,
        guarantorHelp: 500,
        otherIncome: 0
      },
      housing: {
        cost: 400
      },
      language: {
        level: "B2"
      }
    };
    
    // Resources: 500
    // Reste à vivre: 100
    // Thresholds: 200, 500 (index 1.0)
    // 100 < 200 -> RED
    
    const result = calculateViability(data, mockRules);
    expect(result.status).toBe("RED");
    expect(result.findings[0]?.severity).toBe("RED");
  });

  it("returns RED if language is very insufficient", () => {
    const data: DvpData = {
      city: "Paris",
      budget: {
        savings: 12000,
        guarantorHelp: 0,
        otherIncome: 0
      },
      housing: {
        cost: 400
      },
      language: {
        level: "A1"
      }
    };
    
    // Budget is GREEN (1000 - 400 = 600)
    // Language: A1 << B2 -> RED
    
    const result = calculateViability(data, mockRules);
    expect(result.status).toBe("RED");
    expect(result.findings.some(f => f.pillar === "language" && f.severity === "RED")).toBe(true);
  });
});
