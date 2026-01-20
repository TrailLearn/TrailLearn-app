import { type DvpData, type ViabilityResult, type ViabilityFinding, type BusinessRuleSummary } from "../types";

export function calculateViability(
  data: DvpData | undefined | null,
  rules: BusinessRuleSummary[]
): ViabilityResult {
  const findings: ViabilityFinding[] = [];
  const trace: string[] = [];
  const now = new Date().toISOString();
  
  trace.push("Démarrage du calcul de viabilité.");

  // Default values if no rules found
  const defaultThresholds = {
    seuil_survie: 200,
    seuil_confort: 500,
    min_language_level: "B2",
  };

  const thresholds = rules.find(r => r.key === "viability_thresholds")?.value || defaultThresholds;
  trace.push(`Seuils chargés: ${JSON.stringify(thresholds)}`);

  const cityIndices = rules.find(r => r.key === "city_cost_indices")?.value || { default: 1.0 };

  if (!data) {
    trace.push("Erreur: Données DVP absentes.");
    return {
      status: "INCOMPLETE",
      score: 0,
      resteAVivre: 0,
      findings: [],
      calculationTrace: trace,
      calculatedAt: now,
      rulesVersion: "1.0.0",
    };
  }

  // Check completeness (minimal required fields for calculation)
  const isMinimalDataPresent = 
    data.budget && 
    data.housing?.cost !== undefined && 
    data.city;

  if (!isMinimalDataPresent) {
    trace.push("Erreur: Données critiques manquantes (Budget, Logement ou Ville).");
    return {
      status: "INCOMPLETE",
      score: 0,
      resteAVivre: 0,
      findings: [],
      calculationTrace: trace,
      calculatedAt: now,
      rulesVersion: "1.0.0",
    };
  }

  // 1. Calculate Resources
  const monthlySavings = (data.budget?.savings || 0) / 12;
  const monthlyResources = (data.budget?.guarantorHelp || 0) + (data.budget?.otherIncome || 0) + monthlySavings;
  trace.push(`Ressources mensuelles: ${Math.round(monthlyResources)}€ (dont ${Math.round(monthlySavings)}€ épargne lissée)`);
  
  // 2. Calculate Reste à Vivre
  const housingCost = data.housing?.cost || 0;
  let resteAVivre = monthlyResources - housingCost;
  trace.push(`Loyer: ${housingCost}€, Reste à vivre brut: ${Math.round(resteAVivre)}€`);

  // 3. Apply City Cost Index
  const cityKey = data.city?.toLowerCase().trim() || "default";
  const index = cityIndices[cityKey] || cityIndices.default || 1.0;
  trace.push(`Ville: ${data.city}, Index coût: ${index}`);
  
  const adjustedSurvie = thresholds.seuil_survie * index;
  const adjustedConfort = thresholds.seuil_confort * index;
  trace.push(`Seuils ajustés pour ${data.city}: Survie=${adjustedSurvie}€, Confort=${adjustedConfort}€`);

  // 4. Language Check
  const minLang = thresholds.min_language_level || "B2";
  const userLang = data.language?.level || "A0";
  trace.push(`Niveau langue: ${userLang} (Requis: ${minLang})`);
  
  const langLevels = ["A0", "A1", "A2", "B1", "B2", "C1", "C2"];
  const minIdx = langLevels.indexOf(minLang);
  const userIdx = langLevels.indexOf(userLang);

  if (userIdx < minIdx) {
    if (userIdx <= minIdx - 2) {
      findings.push({
        pillar: "language",
        severity: "RED",
        message: `Niveau de langue (${userLang}) très insuffisant pour un parcours académique (minimum recommandé: ${minLang}).`,
      });
      trace.push("Alerte Langue: RED");
    } else {
      findings.push({
        pillar: "language",
        severity: "AMBER",
        message: `Niveau de langue (${userLang}) inférieur au recommandé (${minLang}).`,
      });
      trace.push("Alerte Langue: AMBER");
    }
  }

  // 5. Final Status & Score
  let status: "GREEN" | "AMBER" | "RED" = "GREEN";
  let score = 100;

  if (resteAVivre < adjustedSurvie) {
    status = "RED";
    score = 30;
    trace.push(`Diagnostic Budget: RED (Reste à vivre ${Math.round(resteAVivre)} < ${Math.round(adjustedSurvie)})`);
    findings.push({
      pillar: "budget",
      severity: "RED",
      message: `Reste à vivre mensuel (${Math.round(resteAVivre)}€) critique. Le minimum vital estimé est de ${Math.round(adjustedSurvie)}€ pour ${data.city}.`,
    });
  } else if (resteAVivre < adjustedConfort) {
    status = "AMBER";
    score = 65;
    trace.push(`Diagnostic Budget: AMBER (Reste à vivre ${Math.round(resteAVivre)} < ${Math.round(adjustedConfort)})`);
    findings.push({
      pillar: "budget",
      severity: "AMBER",
      message: `Budget serré. Reste à vivre (${Math.round(resteAVivre)}€) proche du seuil de survie.`,
    });
  } else {
    trace.push("Diagnostic Budget: GREEN");
  }

  // If language is RED, global status becomes RED
  if (findings.some(f => f.severity === "RED")) {
    status = "RED";
    score = Math.min(score, 40);
    trace.push("Diagnostic Global forcé à RED cause Langue.");
  }

  trace.push(`Calcul terminé. Statut: ${status}, Score: ${score}`);

  return {
    status,
    score,
    resteAVivre,
    findings,
    calculationTrace: trace,
    calculatedAt: now,
    rulesVersion: "1.0.0",
  };
}