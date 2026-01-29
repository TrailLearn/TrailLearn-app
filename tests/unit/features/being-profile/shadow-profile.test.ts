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
  it("should exist on the Prisma client", () => {
    // Verify model exists
    expect(db).toHaveProperty("shadowProfile");
    expect(db.shadowProfile).toBeDefined();
  });
});
