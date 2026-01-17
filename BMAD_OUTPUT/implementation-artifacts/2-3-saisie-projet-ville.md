# Story 2.3: Saisie Pilier 1 - Projet & Ville

Status: review

## Story

As a étudiant,
I want définir mon projet de mobilité (Pays, Ville, Type d'études),
So that j'initialise mon dossier.

## Acceptance Criteria

1. [x] **Given** l'étape 1 du tunnel. **When** je sélectionne une ville cible (ex: Paris) et un niveau d'études. **Then** ces informations sont sauvegardées temporairement (Draft). [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 2.3]
2. [x] **And** le système propose une estimation par défaut du coût de la vie pour cette ville (Mock pour l'instant, ou simple table de lookup). [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 2.3]
3. [x] **And** la validation empêche de passer à l'étape suivante sans ville sélectionnée. [Source: UX Requirement]

## Tasks / Subtasks

- [x] Task 1: Créer le Formulaire Projet (AC: 1, 3)
  - [x] Créer `src/features/dvp/components/forms/project-step-form.tsx`.
  - [x] Utiliser `react-hook-form` et `zod` (schéma importé de `src/features/dvp/types.ts`).
  - [x] Champs: Pays (Select), Ville (Input ou Select), Type d'études (Select).
- [x] Task 2: Connecter la Sauvegarde (AC: 1)
  - [x] Utiliser la mutation tRPC `dvp.create` ou `dvp.update` (créée en Story 2.1).
  - [x] Sauvegarder en `onBlur` ou au clic sur "Suivant".
- [x] Task 3: Feedback Visuel (AC: 2)
  - [x] Afficher une "InfoCard" statique ou dynamique montrant "Coût moyen estimé: X€" dès que la ville est choisie (Données mockées dans un premier temps).
- [x] Task 4: Code Review Fixes (Auto-fix)
  - [x] Créer tests unitaires `project-step-form.test.tsx` (Red-Green).
  - [x] Implémenter Autosave sur `onBlur` et `onChange`.
  - [x] Refactoriser typage `any` -> `DvpData`.
  - [x] Extraire logique d'estimation dans `cost-estimator.ts`.

## Dev Notes

### Architecture & Technical Stack
- **Library**: `react-hook-form` avec `zodResolver`.
- **UI**: Composants `Form`, `FormControl`, `Select` de shadcn/ui.
- **Data Flow**: Le formulaire doit charger les données existantes (si draft déjà présent) via `dvp.getLatest`.

### Implementation Details
- **Autocomplete**: Pour la ville, un simple Select ou Input suffira pour la V1, ne pas complexifier avec une API Google Maps pour l'instant sauf si facile.
- **Validation**: Stricte. Pas de ville vide.
- **Estimations**: Extraites dans `src/features/dvp/utils/cost-estimator.ts`.

### References
- [Epic Breakdown](BMAD_OUTPUT/planning-artifacts/epics.md)

## Dev Agent Record
- **Agent**: PM (John) -> Dev (Amelia) -> Reviewer (Auto-fix)
- **Action**: Implemented Story 2.3 & Applied Review Fixes

### Completion Notes List
- **Form**: Implemented `ProjectStepForm` with React Hook Form & Zod.
- **Data**: Integrated tRPC queries (getLatest) and mutations (create/update).
- **UX**: Added live visual feedback for city cost estimation.
- **Quality**: Added comprehensive unit tests and improved type safety.

### File List
- `src/features/dvp/components/forms/project-step-form.tsx` (MODIFIED)
- `src/features/dvp/components/forms/project-step-form.test.tsx` (NEW)
- `src/features/dvp/utils/cost-estimator.ts` (NEW)
- `src/app/dvp/wizard/project/page.tsx` (MODIFIED)

### Change Log
- 2026-01-17: Implémentation du formulaire "Projet" avec sauvegarde automatique (draft) et estimation visuelle.
- 2026-01-17: [Auto-Fix] Ajout tests unitaires, autosave sur blur, extraction cost estimator, typage strict.

### Status
done