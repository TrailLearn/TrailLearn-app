import { type DvpData } from "../../dvp/types";
import { getDvpCompleteness } from "../../dvp/utils/dvp-completeness";

export interface ClarityResult {
  score: number; // 0-100
  details: {
    completion: number;
    coherence: number;
    breakdown: {
      project: boolean;
      budget: boolean;
      housing: boolean;
      language: boolean;
    };
  };
  rulesVersion: string;
}

/**
 * Calculates the Clarity Index (V1).
 * 
 * Heuristic:
 * - 70% Weight: Administrative Completion (Validated Steps)
 * - 30% Weight: Data Presence (Coherence/Filling)
 */
export function calculateClarity(data: DvpData | undefined | null, preferences?: any): ClarityResult {
  const rulesVersion = "1.0.0";
  
  // Normalize preferences to avoid null access
  const prefs = preferences || {};

  // 1. Completion Score (70% weight) - Strict Administrative Validation (Wizard only)
  const completeness = getDvpCompleteness(data);
  const validatedCount = [
    completeness.isCityComplete,
    completeness.isBudgetComplete,
    completeness.isHousingComplete,
    completeness.isLanguageComplete
  ].filter(Boolean).length;
  
  const completionScore = (validatedCount / 4) * 100;

  // 2. Coherence/Data Presence Score (30% weight) - Flexible (Wizard OR Chat Memory)
  const dvp = data || {};
  const presence = {
    project: !!(dvp.city || prefs.city) && !!(dvp.country || prefs.country),
    budget: !!(dvp.budget?.savings !== undefined || prefs.budget !== undefined),
    housing: !!(dvp.housing?.cost !== undefined), // Housing is harder to extract from chat currently
    language: !!(dvp.language?.level || prefs.languageLevel), // Assuming prefs might have this
  };

  const presenceCount = Object.values(presence).filter(Boolean).length;
  const coherenceScore = (presenceCount / 4) * 100;

  // 3. Final Weighted Score
  const finalScore = Math.round((completionScore * 0.7) + (coherenceScore * 0.3));

  return {
    score: finalScore,
    details: {
      completion: Math.round(completionScore),
      coherence: Math.round(coherenceScore),
      breakdown: presence
    },
    rulesVersion,
  };
}
