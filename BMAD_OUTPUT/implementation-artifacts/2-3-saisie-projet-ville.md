# Story 2.3: Saisie Pilier 1 - Projet & Ville

Status: ready-for-dev

## Story

As a étudiant,
I want définir mon projet de mobilité (Pays, Ville, Type d'études),
So that j'initialise mon dossier.

## Acceptance Criteria

1. [ ] **Given** l'étape 1 du tunnel. **When** je sélectionne une ville cible (ex: Paris) et un niveau d'études. **Then** ces informations sont sauvegardées temporairement (Draft). [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 2.3]
2. [ ] **And** le système propose une estimation par défaut du coût de la vie pour cette ville (Mock pour l'instant, ou simple table de lookup). [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 2.3]
3. [ ] **And** la validation empêche de passer à l'étape suivante sans ville sélectionnée. [Source: UX Requirement]

## Tasks / Subtasks

- [ ] Task 1: Créer le Formulaire Projet (AC: 1, 3)
  - [ ] Créer `src/features/dvp/components/forms/project-step-form.tsx`.
  - [ ] Utiliser `react-hook-form` et `zod` (schéma importé de `src/features/dvp/types.ts`).
  - [ ] Champs: Pays (Select), Ville (Input ou Select), Type d'études (Select).
- [ ] Task 2: Connecter la Sauvegarde (AC: 1)
  - [ ] Utiliser la mutation tRPC `dvp.create` ou `dvp.update` (créée en Story 2.1).
  - [ ] Sauvegarder en `onBlur` ou au clic sur "Suivant".
- [ ] Task 3: Feedback Visuel (AC: 2)
  - [ ] Afficher une "InfoCard" statique ou dynamique montrant "Coût moyen estimé: X€" dès que la ville est choisie (Données mockées dans un premier temps).

## Dev Notes

### Architecture & Technical Stack
- **Library**: `react-hook-form` avec `zodResolver`.
- **UI**: Composants `Form`, `FormControl`, `Select` de shadcn/ui.
- **Data Flow**: Le formulaire doit charger les données existantes (si draft déjà présent) via `dvp.getLatest`.

### Implementation Details
- **Autocomplete**: Pour la ville, un simple Select ou Input suffira pour la V1, ne pas complexifier avec une API Google Maps pour l'instant sauf si facile.
- **Validation**: Stricte. Pas de ville vide.

### References
- [Epic Breakdown](BMAD_OUTPUT/planning-artifacts/epics.md)

## Dev Agent Record
- **Agent**: PM (John)
- **Action**: Created Story 2.3
