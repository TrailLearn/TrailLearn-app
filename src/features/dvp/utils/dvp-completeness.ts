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

  const status = data.stepStatus || {
    project: "EDITING",
    budget: "EDITING",
    housing: "EDITING",
    language: "EDITING",
  };

  const isCityComplete = status.project === "VALIDATED";
  const isBudgetComplete = status.budget === "VALIDATED";
  const isHousingComplete = status.housing === "VALIDATED";
  const isLanguageComplete = status.language === "VALIDATED";

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
