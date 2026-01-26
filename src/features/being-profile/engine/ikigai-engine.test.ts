import { describe, it, expect } from "vitest";
import { analyzeIkigai } from "./ikigai-engine";
import { BeingProfileData } from "../types";

describe("IkigaiEngine", () => {
  it("should detect tension for high TRV and suggest portfolio strategy", () => {
    const profile: BeingProfileData = {
      values: [],
      vitalRenewalRate: 6, // 6 months, very high renewal need
      sabotagePatterns: [],
    };
    
    const analysis = analyzeIkigai(profile, {});
    
    expect(analysis.tensions.some(t => t.id === "t-001")).toBe(true);
    expect(analysis.strategies.some(s => s.type === "PORTFOLIO")).toBe(true);
  });

  it("should trigger toxicity alert for low exposure tolerance", () => {
    const profile: BeingProfileData = {
      values: [],
      exposureTolerance: 10, // Very low
      sabotagePatterns: [],
    };
    
    const analysis = analyzeIkigai(profile, {});
    
    expect(analysis.toxicityAlerts.length).toBeGreaterThan(0);
    expect(analysis.toxicityAlerts[0]).toContain("Risque d'exposition élevé");
  });

  it("should suggest hybridation for low economic reality", () => {
    const profile: BeingProfileData = {
      values: [],
      sabotagePatterns: [],
    };
    const context = {
      economicReality: { avgSalary: 1200 }
    };
    
    const analysis = analyzeIkigai(profile, context);
    
    expect(analysis.strategies.some(s => s.type === "HYBRIDATION")).toBe(true);
  });
});
