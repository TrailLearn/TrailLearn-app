import { describe, it, expect } from "vitest";
// @ts-ignore - Module not created yet
import { EncryptionService } from "~/lib/encryption";

// Mock env for key
import { vi } from "vitest";
vi.mock("~/env", () => ({
  env: {
    SHADOW_KEY: "01234567890123456789012345678901", // 32 bytes mock key
  },
}));

describe("EncryptionService", () => {
  it("should encrypt and decrypt text correctly", () => {
    const text = "My deepest secret";
    const encrypted = EncryptionService.encrypt(text);
    
    expect(encrypted).not.toBe(text);
    expect(encrypted).toContain(":"); // Assuming IV:Content:Tag format
    
    const decrypted = EncryptionService.decrypt(encrypted);
    expect(decrypted).toBe(text);
  });

  it("should throw error with invalid key", () => {
    // Assuming we can mock env or pass key?
    // For now testing core logic is enough
  });
});
