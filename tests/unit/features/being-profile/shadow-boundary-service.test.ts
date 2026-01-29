import { describe, it, expect, vi, beforeEach } from "vitest";
import { ShadowBoundaryService } from "~/features/being-profile/services/shadow-boundary-service";
import { db } from "~/server/db";

vi.mock("~/server/db", () => ({
  db: {
    shadowProfile: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe("ShadowBoundaryService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should retrieve shadow data", async () => {
    const mockData = { fears: "Darkness", vulnerabilities: "None" };
    (db.shadowProfile.findUnique as any).mockResolvedValue(mockData);

    const result = await ShadowBoundaryService.getShadow("user-1");
    expect(result).toEqual(mockData);
    expect(db.shadowProfile.findUnique).toHaveBeenCalledWith({
      where: { userId: "user-1" },
      select: { fears: true, vulnerabilities: true },
    });
  });

  it("should update shadow data", async () => {
    await ShadowBoundaryService.updateShadow("user-1", { fears: "Spiders" });
    expect(db.shadowProfile.upsert).toHaveBeenCalledWith(expect.objectContaining({
      where: { userId: "user-1" },
      update: { fears: "Spiders" },
    }));
  });

  it("should delete shadow data", async () => {
    await ShadowBoundaryService.deleteShadow("user-1");
    expect(db.shadowProfile.delete).toHaveBeenCalledWith({
      where: { userId: "user-1" },
    });
  });
});
