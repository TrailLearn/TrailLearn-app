import { describe, it, expect } from "vitest";
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
