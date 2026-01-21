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
export function calculateClarity(data: DvpData | undefined | null): ClarityResult {
  const rulesVersion = "1.0.0";
  
  if (!data) {
    return {
      score: 0,
      details: {
        completion: 0,
        coherence: 0,
        breakdown: { project: false, budget: false, housing: false, language: false }
      },
      rulesVersion,
    };
  }

  // 1. Completion Score (70% weight)
  const completeness = getDvpCompleteness(data);
  const validatedCount = [
    completeness.isCityComplete,
    completeness.isBudgetComplete,
    completeness.isHousingComplete,
    completeness.isLanguageComplete
  ].filter(Boolean).length;
  
  const completionScore = (validatedCount / 4) * 100;

  // 2. Coherence/Data Presence Score (30% weight)
  // Check if data is present even if not validated
  const presence = {
    project: !!(data.city && data.country),
    budget: !!(data.budget && (data.budget.savings !== undefined || data.budget.guarantorHelp !== undefined)),
    housing: !!(data.housing && data.housing.cost !== undefined),
    language: !!(data.language && data.language.level),
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
