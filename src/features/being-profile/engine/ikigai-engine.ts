import type { BeingProfileData } from "../types";
import type { IkigaiAnalysis, IkigaiContext, ActionableTension, ViabilityStrategy } from "./types";
import type { DvpData } from "../../dvp/types";

export function analyzeIkigai(
  profile: BeingProfileData,
  context: IkigaiContext,
  dvpData?: DvpData
): IkigaiAnalysis {
  const tensions: ActionableTension[] = [];
  const strategies: ViabilityStrategy[] = [];
  const toxicityAlerts: string[] = [];
  const now = new Date().toISOString();

  // 1. Shadow Guard (Filtre de Toxicité)
  if (profile.exposureTolerance !== undefined && profile.exposureTolerance < 30) {
    toxicityAlerts.push(
      "Risque d'exposition élevé : ton profil indique une faible tolérance à l'exposition publique. Évite les rôles de front-office pur ou de porte-parole sans préparation."
    );
  }

  // 2. Actionable Tensions (Générateur de Tensions)
  // Example: High TRV vs Stable Market
  if (profile.vitalRenewalRate && profile.vitalRenewalRate < 12) {
    tensions.push({
      id: "t-001",
      title: "Métabolisme Rapide vs Continuité",
      description: "Ton besoin de renouvellement est élevé. Un parcours linéaire classique pourrait t'épuiser par ennui.",
      type: "RISK",
      relatedPillars: ["being", "doing"],
    });
    
    // Suggest a strategy
    strategies.push({
      type: "PORTFOLIO",
      label: "Approche par Projets (Portfolio)",
      description: "Au lieu d'un seul rôle, compose ton activité autour de 2 ou 3 projets simultanés pour nourrir ton TRV.",
      steps: [
        "Identifier un socle stable de 3 jours",
        "Dédier 2 jours à l'exploration ou au freelance",
        "Réévaluer tous les 6 mois"
      ]
    });
  }

  // 3. Viability Strategy (Stratège de Viabilité)
  if (context.economicReality && context.economicReality.avgSalary && context.economicReality.avgSalary < 1500) {
    strategies.push({
      type: "HYBRIDATION",
      label: "Hybridation Économique",
      description: "Le revenu direct est faible. Envisage de monétiser une compétence 'transverse' pour sécuriser ton projet de vie.",
      steps: [
        "Lister tes compétences techniques 'vendables' (ex: tech, design)",
        "Proposer des missions de conseil en parallèle",
        "Réduire tes charges fixes via un changement de territoire"
      ]
    });
  }

  return {
    tensions,
    strategies,
    toxicityAlerts,
    calculatedAt: now,
  };
}
