# Story 2.4: Saisie Pilier 2 - Budget & Garants

Status: in-progress

## Story

As a étudiant,
I want saisir mes ressources financières (Épargne, Aides, Garants),
So that le système puisse évaluer ma solvabilité.

## Acceptance Criteria

1. [ ] **Given** l'étape 2 du tunnel. **When** je saisis mon épargne actuelle et le montant mensuel de mes garants. **Then** je peux voir le total mensuel disponible calculé en temps réel. [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 2.4]
2. [ ] **And** les montants sont validés (positifs, numériques). [Source: UX Requirement]
3. [ ] **And** les données sont sauvegardées dans le JSON du DVP. [Source: Architecture Decision]

## Tasks / Subtasks

- [x] Task 1: Créer le Formulaire Budget (AC: 1, 2)
  - [x] Créer `src/features/dvp/components/forms/budget-step-form.tsx`.
  - [x] Champs: Épargne totale (€), Aide mensuelle garants (€), Autres revenus (€).
  - [x] Validation Zod: nombres positifs obligatoires (0 par défaut).
- [x] Task 2: Calculateur Temps Réel (AC: 1)
  - [x] Utiliser `useWatch` de `react-hook-form` pour écouter les champs.
  - [x] Afficher un composant "Total Mensuel Estimé" qui se met à jour instantanément : (Épargne / 10 mois) + Garants + Autres.
- [x] Task 3: Sauvegarde (AC: 3)
  - [x] Connecter à `dvp.update` via tRPC.

## Dev Notes

### Architecture & Technical Stack
- **Input Handling**: Utilisation de `Number()` pour assurer le typage numérique lors du calcul et de la sauvegarde.
- **UX**: Affichage du total mensuel disponible en temps réel avec un style vert.

### Implementation Details
- **Logique**: (Épargne / 10) + Garants + Autres.
- **Autosave**: Implémenté au blur sur tous les champs.

### References
- [Epic Breakdown](BMAD_OUTPUT/planning-artifacts/epics.md)

## Dev Agent Record
- **Agent**: PM (John) -> Dev (Amelia)
- **Action**: Implemented Story 2.4

### Completion Notes List
- **Form**: Created `BudgetStepForm` with real-time estimation.
- **Data**: Integrated with tRPC `dvp.create` and `dvp.update` for autosave.
- **Test**: Added comprehensive unit tests for calculation and autosave.
- **Review**: Refactored to use `STUDY_DURATION_MONTHS` constant and secured data parsing with Zod.

### File List
- `src/features/dvp/components/forms/budget-step-form.tsx` (NEW)
- `src/features/dvp/components/forms/budget-step-form.test.tsx` (NEW)
- `src/features/dvp/utils/cost-estimator.ts` (MODIFIED)
- `src/app/dvp/wizard/budget/page.tsx` (MODIFIED)

### Change Log
- 2026-01-17: Implémentation du formulaire Budget avec calcul temps réel et sauvegarde automatique.
- 2026-01-17: [Auto-Fix] Extraction constante métier et sécurisation du parsing JSON.

### Status
done
