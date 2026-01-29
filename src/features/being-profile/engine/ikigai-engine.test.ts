import { describe, it, expect } from "vitest";
import { analyzeIkigai } from "./ikigai-engine";
import type { BeingProfileData } from "../types";

describe("IkigaiEngine", () => {
  it("detects fast metabolism tension for high TRV", () => {
    const profile: BeingProfileData = {
      values: [],
      sabotagePatterns: [],
      shadowTriggers: [],
      vitalRenewalRate: 6,
    };
    
    const analysis = analyzeIkigai(profile, {});
    
    expect(analysis.tensions.some(t => t.id === "t-001")).toBe(true);
    expect(analysis.strategies.some(s => s.type === "PORTFOLIO")).toBe(true);
  });

  it("detects toxicity alert for low exposure tolerance", () => {
    const profile: BeingProfileData = {
      values: [],
      sabotagePatterns: [],
      shadowTriggers: [],
      exposureTolerance: 20,
    };

    
    const analysis = analyzeIkigai(profile, {});
    
    expect(analysis.toxicityAlerts.length).toBeGreaterThan(0);
    expect(analysis.toxicityAlerts[0]).toContain("Risque d'exposition élevé");
  });

  it("returns no alerts for a balanced profile", () => {
    const profile: BeingProfileData = {
      values: [],
      sabotagePatterns: [],
      shadowTriggers: [],
    };
    const context = {
      economicReality: { avgSalary: 1200 }
    };
    
    const analysis = analyzeIkigai(profile, context);
    
    expect(analysis.strategies.some(s => s.type === "HYBRIDATION")).toBe(true);
  });
});
