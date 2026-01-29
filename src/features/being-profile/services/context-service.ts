import { db } from "~/server/db";

/**
 * Service to aggregate and expose user context across features.
 * Prevents silos by providing a unified interface for profile-related data.
 */
export const ContextService = {
  /**
   * Retrieves the "Being Profile" context for a specific user.
   * Includes TRV, Complexity, and other existential metrics.
   */
  async getUserContext(userId: string) {
    const profile = await db.beingProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return null;
    }

    return {
      trvFrequency: profile.trvFrequency,
      trvLabel: profile.trvLabel,
      vitalRenewalRate: profile.vitalRenewalRate,
      complexityLevel: profile.complexityLevel,
      meaningScale: profile.meaningScale,
      growthArchetype: profile.growthArchetype,
    };
  },
};
