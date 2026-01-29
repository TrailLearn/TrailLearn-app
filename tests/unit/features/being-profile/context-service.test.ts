import { describe, it, expect, vi, beforeEach } from "vitest";
import { ContextService } from "~/features/being-profile/services/context-service";
import { db } from "~/server/db";

vi.mock("~/server/db", () => ({
  db: {
    beingProfile: {
      findUnique: vi.fn(),
    },
  },
}));

describe("ContextService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return TRV data when profile exists", async () => {
    const mockProfile = {
      userId: "user-1",
      trvFrequency: 6,
      trvLabel: "6 mois",
      vitalRenewalRate: 6,
      complexityLevel: 50,
      meaningScale: 80,
      growthArchetype: "Explorer",
    };

    (db.beingProfile.findUnique as any).mockResolvedValue(mockProfile);

    const result = await ContextService.getUserContext("user-1");

    expect(result).toEqual({
      trvFrequency: 6,
      trvLabel: "6 mois",
      vitalRenewalRate: 6,
      complexityLevel: 50,
      meaningScale: 80,
      growthArchetype: "Explorer",
    });
  });

  it("should return null when profile doesn't exist", async () => {
    (db.beingProfile.findUnique as any).mockResolvedValue(null);

    const result = await ContextService.getUserContext("user-not-found");

    expect(result).toBeNull();
  });
});
