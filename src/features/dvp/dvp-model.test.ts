import { describe, it, expect } from "vitest";
import { dvpDataSchema } from "./types";

describe("DVP Data Schema (Zod)", () => {
  it("should validate a partial draft", () => {
    const data = { city: "Paris" };
    const result = dvpDataSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should validate a complete budget", () => {
    const data = {
      city: "Paris",
      budget: {
        savings: 5000,
        guarantorHelp: 300,
      }
    };
    const result = dvpDataSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject negative savings", () => {
    const data = {
      budget: {
        savings: -100
      }
    };
    const result = dvpDataSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
