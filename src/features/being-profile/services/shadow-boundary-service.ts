import { db } from "~/server/db";

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
    return shadow;
  },

  /**
   * Updates or creates shadow data.
   */
  async updateShadow(userId: string, data: { fears?: string; vulnerabilities?: string }) {
    return db.shadowProfile.upsert({
      where: { userId },
      create: {
        userId,
        ...data,
      },
      update: {
        ...data,
      },
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
