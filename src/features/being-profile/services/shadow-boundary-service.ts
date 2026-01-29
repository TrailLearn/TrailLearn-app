import { db } from "~/server/db";
import { EncryptionService } from "~/lib/encryption";

/**
 * Boundary Service for Shadow Profile Access.
 * Enforces strict architectural separation.
 * Only this service should access the ShadowProfile table.
 */
export const ShadowBoundaryService = {
  /**
   * Retrieves shadow data for a specific user.
   * Access must be explicitly granted by the caller context.
   */
  async getShadow(userId: string) {
    // Explicitly select only necessary fields, never return the whole object blindly
    const shadow = await db.shadowProfile.findUnique({
      where: { userId },
      select: {
        fears: true,
        vulnerabilities: true,
      },
    });

    if (!shadow) return null;

    // Decrypt data on read with error handling
    try {
      return {
        fears: shadow.fears ? EncryptionService.decrypt(shadow.fears) : null,
        vulnerabilities: shadow.vulnerabilities ? EncryptionService.decrypt(shadow.vulnerabilities) : null,
      };
    } catch (error) {
      console.error("[ShadowBoundaryService] Decryption failed for user", userId, error);
      // Fail secure: return nulls rather than crashing or returning garbage
      return { fears: null, vulnerabilities: null };
    }
  },

  /**
   * Updates or creates shadow data.
   */
  async updateShadow(userId: string, data: { fears?: string; vulnerabilities?: string }) {
    if (!data.fears && !data.vulnerabilities) {
      return null; // Nothing to update
    }

    // Encrypt data on write
    const updateData: any = {};
    if (data.fears) updateData.fears = EncryptionService.encrypt(data.fears);
    if (data.vulnerabilities) updateData.vulnerabilities = EncryptionService.encrypt(data.vulnerabilities);

    return db.shadowProfile.upsert({
      where: { userId },
      create: {
        userId,
        fears: updateData.fears,
        vulnerabilities: updateData.vulnerabilities,
      },
      update: updateData,
    });
  },
  
  /**
   * Hard delete of shadow data.
   * "Right to be forgotten" / "Effacer mes ombres"
   */
  async deleteShadow(userId: string) {
    return db.shadowProfile.delete({
      where: { userId },
    });
  }
};
