export const STUDY_DURATION_MONTHS = 10;

export const COST_ESTIMATES: Record<string, { cost: number; currency: string }> = {
  paris: { cost: 1200, currency: "€" },
  lyon: { cost: 850, currency: "€" },
  bordeaux: { cost: 800, currency: "€" },
  london: { cost: 1100, currency: "£" },
  montreal: { cost: 1000, currency: "CAD" },
  bruxelles: { cost: 900, currency: "€" },
};

export const DEFAULT_COST = { cost: 800, currency: "€" };

export function getEstimatedCost(city: string) {
  if (!city) return null;
  const normalizedCity = city.toLowerCase().trim();
  // Simple lookup, could be improved with fuzzy match later
  return COST_ESTIMATES[normalizedCity] || DEFAULT_COST;
}
