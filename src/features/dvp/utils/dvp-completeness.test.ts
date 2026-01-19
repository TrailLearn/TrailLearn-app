import { describe, expect, test } from "vitest";
import { getDvpCompleteness } from "./dvp-completeness";
import { type DvpData } from "../types";

describe("DvpCompleteness", () => {
  test("returns all false for undefined data", () => {
    const result = getDvpCompleteness(undefined);
    expect(result.isGlobalComplete).toBe(false);
  });

  test("validates housing completeness correctly", () => {
    // Empty housing
    expect(getDvpCompleteness({ housing: {} } as DvpData).isHousingComplete).toBe(false);

    // Only cost
    expect(getDvpCompleteness({ housing: { cost: 500 } } as DvpData).isHousingComplete).toBe(false);

    // Only type
    expect(getDvpCompleteness({ housing: { type: "studio" } } as DvpData).isHousingComplete).toBe(false);

    // Type empty
    expect(getDvpCompleteness({ housing: { type: "", cost: 500 } } as DvpData).isHousingComplete).toBe(false);

    // Cost negative (should allow 0?)
    expect(getDvpCompleteness({ housing: { type: "studio", cost: -1 } } as DvpData).isHousingComplete).toBe(false);

    // Valid
    expect(getDvpCompleteness({ housing: { type: "studio", cost: 0 } } as DvpData).isHousingComplete).toBe(true);
    expect(getDvpCompleteness({ housing: { type: "coloc", cost: 500 } } as DvpData).isHousingComplete).toBe(true);
  });

  test("validates city completeness", () => {
      expect(getDvpCompleteness({ city: "Paris", country: "France", studyType: "Master" } as DvpData).isCityComplete).toBe(true);
      expect(getDvpCompleteness({ city: "Paris" } as DvpData).isCityComplete).toBe(false);
  });
});
