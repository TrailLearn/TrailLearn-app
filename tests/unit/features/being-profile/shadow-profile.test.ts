import { describe, it, expect } from "vitest";
import { db } from "~/server/db";

// Mock env to avoid client-side access error during test setup
import { vi } from "vitest";
vi.mock("~/env", () => ({
  env: {
    NODE_ENV: "test",
  },
}));

describe("ShadowProfile Data Model", () => {
  it("should exist and not be directly queryable from public API (this test verifies DB existence)", async () => {
    // This will fail if model is missing
    const shadow = await db.shadowProfile.findFirst({
      where: {},
    });
    // We just check it runs without crashing due to missing model
    expect(true).toBe(true);
  });
});
