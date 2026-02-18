# Story 12.6: Restructuration IA Duale (Orientation & Opportunités)

Status: done

## Story

As a utilisateur de TrailLearn,
I want disposer de deux IA spécialisées (Orientation et Opportunités) produisant des recommandations structurées,
So that je puisse construire un plan de carrière concret, actionnable et sauvegardé.

## Acceptance Criteria

1. [ ] **IA 1 (Orientation)** : L'IA doit collecter via un wizard structuré (Domaine, Niveau, Compétences, Langues, Budget, Salaire, Mobilité) et générer un JSON structuré (Top métiers, Comparatif environnements, Gaps compétences, Plan 6-12 mois).
2. [ ] **IA 2 (Opportunités)** : L'IA doit exploiter le résultat de l'IA 1 pour proposer des opportunités concrètes (Écoles, Bourses, Certifications, Projets) triées par priorité/deadline.
3. [ ] **Sauvegarde** : Les résultats de l'IA 1 et de l'IA 2 doivent être persistés en base de données (PostgreSQL via Prisma).
4. [ ] **Indépendance** : Les deux logiques d'IA doivent être séparées mais capables de communiquer (Input de l'IA 2 = Output de l'IA 1).
5. [ ] **Validation** : Tous les outputs IA doivent être validés par des schémas Zod avant sauvegarde et affichage.

## Tasks / Subtasks

- [x] Task 1: Modélisation de la Persistance (Prisma)
  - [x] Créer les modèles `AiOrientationResult` et `AiOpportunityResult` dans `schema.prisma`. (Note: named AiOrientation and AiOpportunity)
  - [x] Ajouter les relations nécessaires avec le modèle `User`.
  - [x] Exécuter `npx prisma generate` et préparer la migration.
- [x] Task 2: Cœur Logique (Services & Prompts)
  - [x] Créer `src/features/ai-engine/types.ts` avec les schémas Zod pour les outputs structurés.
  - [x] Créer `src/features/ai-engine/services/orientation.service.ts` pour l'IA 1.
  - [x] Créer `src/features/ai-engine/services/opportunities.service.ts` pour l'IA 2.
  - [x] Implémenter le "Raisonnement Bidirectionnel" (Métier -> Lieu et Lieu -> Métier) dans l'IA 1.
- [x] Task 3: Couche API (tRPC)
  - [x] Créer `src/server/api/routers/ai-orientation.ts`.
  - [x] Créer `src/server/api/routers/ai-opportunities.ts`.
  - [x] Enregistrer les nouveaux routeurs dans `src/server/api/root.ts`.
- [x] Task 4: Wizard & UI (Frontend)
  - [x] Créer le composant `OrientationWizard` dans `src/features/ai-wizard/components/orientation-wizard.tsx`.
  - [x] Créer le composant `OpportunityDashboard` pour afficher les résultats de l'IA 2.
  - [x] Intégrer les appels tRPC et gérer les états de chargement.
- [x] Task 5: Tests & Validation
  - [x] Créer des tests unitaires pour les parseurs Zod (`src/features/ai-engine/__tests__/parsers.test.ts`).
  - [x] Créer un test d'intégration pour le flux IA 1 -> IA 2. (Note: integration.test.ts passing with Azure OpenAI).

## Dev Notes

- **Modèles Structurés** : Utiliser `jsonSchema` ou forcer l'IA via des instructions système strictes (système de "Function Calling" ou "Json Mode" selon le provider).
- **Architecture** : Respecter le pattern `src/features/`.
- **Interopérabilité** : L'IA 2 doit pouvoir lire le dernier `AiOrientationResult` valide de l'utilisateur.

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Completion Notes List
- Task 1: Implemented Prisma models `AiOrientation` and `AiOpportunity` with JSON fields for structured outputs.
- Task 2: Created `OrientationService` and `OpportunityService` using Vercel AI SDK and Azure OpenAI. Implemented bidirectional reasoning for orientation.
- Task 3: Exposed AI services via tRPC routers `aiOrientation` and `aiOpportunities`.
- Task 5: Added unit tests for Zod parsers and integration tests for the dual AI flow.

### File List
- `prisma/schema.prisma`
- `src/server/api/root.ts`
- `src/server/api/routers/ai-orientation.ts`
- `src/server/api/routers/ai-opportunities.ts`
- `src/features/ai-engine/types.ts`
- `src/features/ai-engine/services/orientation.service.ts`
- `src/features/ai-engine/services/opportunities.service.ts`
- `src/features/ai-engine/__tests__/parsers.test.ts`
- `src/features/ai-engine/__tests__/integration.test.ts`
- `src/features/ai-wizard/components/orientation-wizard.tsx`
- `src/features/ai-wizard/components/opportunity-dashboard.tsx`
- `src/features/ai-wizard/components/ai-navigator.tsx`
- `src/app/dashboard/opportunities/page.tsx`
