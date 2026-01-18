# Story 2.5: Saisie Pilier 3 - Logement

Status: done

## Tasks / Subtasks

- [x] Task 1: Créer le Formulaire Logement (AC: 1, 3)
  - [x] Créer `src/features/dvp/components/forms/housing-step-form.tsx`.
  - [x] Champs: Type de logement (Select), Loyer estimé (€).
  - [x] Validation Zod: Loyer > 0.
- [x] Task 2: Feedback Fourchette Prix (AC: 2)
  - [x] Créer un utilitaire `src/features/dvp/utils/housing-prices.ts` (Mock).
  - [x] Afficher "Prix moyen observé à {Ville} : X - Y €".
- [x] Task 3: Sauvegarde
  - [x] Connecter à `dvp.update` via tRPC.

## Dev Notes

### Architecture & Technical Stack
- **Composant**: Implémenté avec React Hook Form et Zod.
- **Données**: Intégré à `dvp.data.housing`.

## Dev Agent Record
- **Agent**: PM -> Dev (Amelia)
- **Action**: Implemented Story 2.5

### Completion Notes List
- **Form**: Created `HousingStepForm` with dynamic price feedback based on city.
- **Utils**: Added `housing-prices.ts` mock.
- **Test**: Unit tests covering rendering, feedback logic, and autosave.

### File List
- `src/features/dvp/components/forms/housing-step-form.tsx` (NEW)
- `src/features/dvp/components/forms/housing-step-form.test.tsx` (NEW)
- `src/features/dvp/utils/housing-prices.ts` (NEW)
- `src/app/dvp/wizard/housing/page.tsx` (NEW)

### Change Log
- 2026-01-17: Implémentation du formulaire Logement.
