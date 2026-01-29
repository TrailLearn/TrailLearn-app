import { z } from "zod";
import type { BeingProfileData } from "../types";
import type { DvpData } from "../../dvp/types";

export interface ActionableTension {
  id: string;
  title: string;
  description: string;
  type: "OPPORTUNITY" | "RISK" | "HYBRID";
  relatedPillars: ("being" | "doing" | "world" | "money")[];
}

export interface ViabilityStrategy {
  type: "PORTFOLIO" | "SEQUENCING" | "HYBRIDATION" | "CONTEXT_ADJUSTMENT";
  label: string;
  description: string;
  steps: string[];
}

export interface IkigaiAnalysis {
  tensions: ActionableTension[];
  strategies: ViabilityStrategy[];
  toxicityAlerts: string[];
  calculatedAt: string;
}

export interface IkigaiContext {
  marketNeeds?: string[];
  economicReality?: {
    avgSalary?: number;
    livingCost?: number;
  };
}
