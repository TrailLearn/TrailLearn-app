import { describe, expect, test } from "vitest";
import { getDvpCompleteness } from "./dvp-completeness";
import { type DvpData } from "../types";

describe("DvpCompleteness", () => {
  test("returns all false for undefined data", () => {
    const result = getDvpCompleteness(undefined);
    expect(result.isGlobalComplete).toBe(false);
  });

  test("validates step status correctly", () => {
    // Incomplete (default or explicitly editing)
    expect(getDvpCompleteness({ stepStatus: { housing: "EDITING" } } as DvpData).isHousingComplete).toBe(false);
    
    // Complete (explicitly validated)
    const validData = {
      stepStatus: {
        housing: "VALIDATED",
        project: "VALIDATED",
        budget: "VALIDATED",
        language: "VALIDATED",
      }
    } as DvpData;

    expect(getDvpCompleteness(validData).isHousingComplete).toBe(true);
    expect(getDvpCompleteness(validData).isCityComplete).toBe(true);
    expect(getDvpCompleteness(validData).isGlobalComplete).toBe(true);
  });

  test("handles mixed states", () => {
    const mixedData = {
      stepStatus: {
        housing: "VALIDATED",
        project: "EDITING",
        budget: "VALIDATED",
        language: "EDITING",
      }
    } as DvpData;

    expect(getDvpCompleteness(mixedData).isHousingComplete).toBe(true);
    expect(getDvpCompleteness(mixedData).isCityComplete).toBe(false);
    expect(getDvpCompleteness(mixedData).isGlobalComplete).toBe(false);
  });
});
