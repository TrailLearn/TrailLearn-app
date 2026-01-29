import { describe, it, expect, vi, beforeEach } from "vitest";
import { ShadowBoundaryService } from "~/features/being-profile/services/shadow-boundary-service";
import { db } from "~/server/db";
import { EncryptionService } from "~/lib/encryption";

// Mock DB
vi.mock("~/server/db", () => ({
  db: {
    shadowProfile: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

// Mock Encryption Service
vi.mock("~/lib/encryption", () => ({
  EncryptionService: {
    encrypt: vi.fn((text) => `encrypted:${text}`),
    decrypt: vi.fn((text) => text.replace("encrypted:", "")),
  },
}));

describe("ShadowBoundaryService Encryption", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should decrypt data on retrieval", async () => {
    (db.shadowProfile.findUnique as any).mockResolvedValue({
      fears: "encrypted:Spiders",
      vulnerabilities: "encrypted:None",
    });

    const result = await ShadowBoundaryService.getShadow("user-1");
    
    expect(result).toEqual({
      fears: "Spiders",
      vulnerabilities: "None",
    });
    expect(EncryptionService.decrypt).toHaveBeenCalledTimes(2);
  });

  it("should encrypt data on update", async () => {
    await ShadowBoundaryService.updateShadow("user-1", { fears: "Darkness" });
    
    expect(EncryptionService.encrypt).toHaveBeenCalledWith("Darkness");
    expect(db.shadowProfile.upsert).toHaveBeenCalledWith(expect.objectContaining({
      where: { userId: "user-1" },
      update: expect.objectContaining({ fears: "encrypted:Darkness" }),
      create: expect.objectContaining({ fears: "encrypted:Darkness" }),
    }));
  });
});
