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

// Mock EncryptionService to prevent env var access and logic errors
vi.mock("~/lib/encryption", () => ({
  EncryptionService: {
    encrypt: vi.fn((text) => `enc:${text}`),
    decrypt: vi.fn((text) => text.replace("enc:", "")),
  },
}));

describe("ShadowBoundaryService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should retrieve and decrypt shadow data", async () => {
    // DB returns "encrypted" data
    const mockDbData = { fears: "enc:Darkness", vulnerabilities: "enc:None" };
    (db.shadowProfile.findUnique as any).mockResolvedValue(mockDbData);

    const result = await ShadowBoundaryService.getShadow("user-1");
    
    // Service should return "decrypted" data
    expect(result).toEqual({ fears: "Darkness", vulnerabilities: "None" });
    
    expect(db.shadowProfile.findUnique).toHaveBeenCalledWith({
      where: { userId: "user-1" },
      select: { fears: true, vulnerabilities: true },
    });
  });

  it("should encrypt and update shadow data", async () => {
    await ShadowBoundaryService.updateShadow("user-1", { fears: "Spiders" });
    
    // Check that DB received "encrypted" data
    expect(db.shadowProfile.upsert).toHaveBeenCalledWith(expect.objectContaining({
      where: { userId: "user-1" },
      update: expect.objectContaining({ fears: "enc:Spiders" }),
    }));
  });

  it("should delete shadow data", async () => {
    await ShadowBoundaryService.deleteShadow("user-1");
    expect(db.shadowProfile.delete).toHaveBeenCalledWith({
      where: { userId: "user-1" },
    });
  });
});
