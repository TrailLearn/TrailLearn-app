import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const rules = [
    // Housing Prices
    {
      key: "housing_prices_paris",
      category: "housing",
      value: {
        residence: { min: 450, max: 700 },
        coloc: { min: 600, max: 900 },
        studio: { min: 800, max: 1200 },
        homestay: { min: 500, max: 800 },
      },
      description: "Prix indicatifs des logements à Paris",
    },
    {
      key: "housing_prices_lyon",
      category: "housing",
      value: {
        residence: { min: 350, max: 550 },
        coloc: { min: 450, max: 650 },
        studio: { min: 600, max: 850 },
        homestay: { min: 400, max: 600 },
      },
      description: "Prix indicatifs des logements à Lyon",
    },
    {
      key: "housing_prices_default",
      category: "housing",
      value: {
        residence: { min: 300, max: 500 },
        coloc: { min: 400, max: 600 },
        studio: { min: 500, max: 800 },
        homestay: { min: 350, max: 550 },
      },
      description: "Prix indicatifs des logements par défaut",
    },
    // Viability Thresholds
    {
      key: "viability_thresholds",
      category: "viability",
      value: {
        seuil_survie: 200, // Reste à vivre minimum (hors loyer)
        seuil_confort: 500,
        min_language_level: "B2",
      },
      description: "Seuils globaux de viabilité",
    },
    // City Cost Indices
    {
        key: "city_cost_indices",
        category: "city",
        value: {
            paris: 1.2,
            lyon: 1.0,
            default: 0.8,
        },
        description: "Indices du coût de la vie par ville",
    },
    // Clarity Index Heuristic
    {
      key: "clarity_heuristic_weights",
      category: "ai",
      value: {
        completion_weight: 0.7,
        coherence_weight: 0.3,
      },
      description: "Pondération de l'Indice de Clarté (V1)",
    },
    // Notification Templates
    {
      key: "notification_templates",
      category: "system",
      value: {
        re_optimize: "Bonjour {{name}}, certaines de vos échéances sont passées. Votre coach est prêt à vous aider à réorganiser votre plan !",
      },
      description: "Modèles de messages pour les notifications automatiques",
    }
  ];

  for (const rule of rules) {
    await prisma.businessRule.upsert({
      where: { key: rule.key },
      update: rule,
      create: rule,
    });
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
