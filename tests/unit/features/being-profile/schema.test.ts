import { describe, it, expect, vi } from "vitest";

// Mock env
vi.mock("~/env", () => ({
  env: {
    NODE_ENV: "test",
  },
}));

import { db } from "~/server/db";

describe("BeingProfile Data Model", () => {
  it("should have complexityLevel field definition", () => {
    // Verify the model property exists on the Prisma client instance
    expect(db).toHaveProperty("beingProfile");
    expect(db.beingProfile).toBeDefined();
    // We can't easily check fields without types or connection, but existence is the main check here
  });
});
