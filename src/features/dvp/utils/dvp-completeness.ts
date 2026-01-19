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

  // Budget is complete if the object exists and has values
  const isBudgetComplete = !!(
    data.budget &&
    (data.budget.savings !== undefined ||
      data.budget.guarantorHelp !== undefined ||
      data.budget.otherIncome !== undefined)
  );

  // Housing complete: Type non empty AND Cost is >= 0
  const isHousingComplete = !!(
    data.housing?.type && 
    data.housing.type.trim() !== "" &&
    (data.housing.cost ?? -1) >= 0
  );

  const isLanguageComplete = !!(data.language?.level && data.language.level.trim() !== "");

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
