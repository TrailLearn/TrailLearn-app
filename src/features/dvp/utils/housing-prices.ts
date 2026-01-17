export const HOUSING_TYPES = [
  { value: "residence", label: "Résidence Universitaire" },
  { value: "coloc", label: "Colocation" },
  { value: "studio", label: "Studio Indépendant" },
  { value: "homestay", label: "Chez l'habitant" },
] as const;

// Mock prices per city and type
export const MOCK_HOUSING_PRICES: Record<string, Record<string, { min: number; max: number }>> = {
  paris: {
    residence: { min: 450, max: 700 },
    coloc: { min: 600, max: 900 },
    studio: { min: 800, max: 1200 },
    homestay: { min: 500, max: 800 },
  },
  lyon: {
    residence: { min: 350, max: 550 },
    coloc: { min: 450, max: 650 },
    studio: { min: 600, max: 850 },
    homestay: { min: 400, max: 600 },
  },
  // Default fallback
  default: {
    residence: { min: 300, max: 500 },
    coloc: { min: 400, max: 600 },
    studio: { min: 500, max: 800 },
    homestay: { min: 350, max: 550 },
  },
};

export function getHousingPriceRange(city: string | undefined, type: string) {
  if (!type) return null;
  const normalizedCity = city?.toLowerCase().trim() || "default";
  const cityPrices = MOCK_HOUSING_PRICES[normalizedCity] || MOCK_HOUSING_PRICES.default;
  return cityPrices?.[type] || MOCK_HOUSING_PRICES.default?.studio; // Fallback safe
}
