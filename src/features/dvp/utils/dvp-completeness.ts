import { type DvpData } from "../types";

export interface DvpCompleteness {
  isCityComplete: boolean;
  isBudgetComplete: boolean;
  isHousingComplete: boolean;
  isLanguageComplete: boolean;
  isGlobalComplete: boolean;
}

export function getDvpCompleteness(data: DvpData | undefined | null): DvpCompleteness {
  if (!data) {
    return {
      isCityComplete: false,
      isBudgetComplete: false,
      isHousingComplete: false,
      isLanguageComplete: false,
      isGlobalComplete: false,
    };
  }

  const isCityComplete = !!(data.city && data.studyType);

  // Budget is complete if at least one field is filled (or specific business rule? 
  // Assuming basic presence of the object for now, but user prompt implies checking values)
  // For now keeping it simple as per original logic, or improving if obvious.
  // Original logic: data?.budget (just check existence?)
  // Let's make it a bit more robust: at least one value is defined.
  const isBudgetComplete = !!(
    data.budget &&
    ((data.budget.savings ?? -1) >= 0 ||
    (data.budget.guarantorHelp ?? -1) >= 0 ||
    (data.budget.otherIncome ?? -1) >= 0)
  );

  // Housing complete: Type non empty AND Cost >= 0
  const isHousingComplete = !!(
    data.housing &&
    data.housing.type && 
    data.housing.type.trim() !== "" &&
    (data.housing.cost ?? -1) >= 0
  );

  const isLanguageComplete = !!(data.language && data.language.level);

  const isGlobalComplete =
    isCityComplete && isBudgetComplete && isHousingComplete && isLanguageComplete;

  return {
    isCityComplete,
    isBudgetComplete,
    isHousingComplete,
    isLanguageComplete,
    isGlobalComplete,
  };
}
