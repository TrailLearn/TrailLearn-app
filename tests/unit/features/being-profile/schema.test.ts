import { describe, it, expect, vi } from "vitest";

// Mock env before importing db to avoid client-side access error
vi.mock("~/env", () => ({
  env: {
    NODE_ENV: "test",
  },
}));

import { db } from "~/server/db";

describe("BeingProfile Data Model", () => {
  it("should have trvFrequency and trvLabel fields", async () => {
    // These should now exist in the Prisma client
    const profile = await db.beingProfile.findFirst({
      where: {},
      select: {
        trvFrequency: true,
        trvLabel: true,
      }
    });
  });
});
