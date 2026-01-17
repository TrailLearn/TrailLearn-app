# Story 2.2: Tunnel de Saisie - Structure "Focus Tunnel"

Status: review

## Story

As a étudiant,
I want être guidé étape par étape dans la saisie de mon dossier,
So that je ne sois pas submergé par la quantité d'informations demandée.

## Acceptance Criteria

1. [x] **Given** un utilisateur connecté sur le Dashboard. **When** je clique sur "Démarrer mon DVP". **Then** j'accède à une interface de type "Wizard" (Focus Tunnel) isolée (layout minimaliste). [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 2.2]
2. [x] **And** je vois une barre de progression claire indiquant l'étape actuelle sur le total (ex: 1/4). [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 2.2]
3. [x] **And** je peux naviguer entre les étapes (Suivant / Précédent) sans perdre mes données (état local ou URL). [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 2.2]
4. [x] **And** l'URL reflète l'étape en cours (ex: `/dvp/wizard/step-1`) pour permettre le rechargement de page. [Source: Architecture Decision]

## Tasks / Subtasks

- [x] Task 1: Créer le Layout Wizard (AC: 1)
  - [x] Créer `src/app/dvp/wizard/layout.tsx`.
  - [x] Implémenter un header simplifié (Logo + "Quitter") pour réduire la charge cognitive (Focus Mode).
- [x] Task 2: Implémenter le Composant Stepper (AC: 2)
  - [x] Créer `src/features/dvp/components/wizard-stepper.tsx`.
  - [x] Utiliser shadcn/ui (Progress ou Steps custom) pour afficher la progression.
  - [x] Afficher les labels des étapes : "Projet", "Budget", "Logement", "Synthèse".
- [x] Task 3: Gestion de la Navigation et État (AC: 3, 4)
  - [x] Configurer les routes : `/dvp/wizard/project`, `/dvp/wizard/budget`, etc.
  - [x] Implémenter la logique "Suivant/Précédent" via `next/navigation` (`useRouter` ou simple `Link` pour V1).
  - [x] S'assurer que le bouton "Suivant" est désactivé si l'étape n'est pas valide (placeholder implemented).

## Dev Notes

### Architecture & Technical Stack
- **UX Pattern**: "Focus Tunnel". Le layout doit être différent du Dashboard principal (pas de sidebar complexe). L'attention doit être 100% sur le formulaire.
- **State Management**: Préférer l'état dans l'URL (`/step-1`, `/step-2`) combiné à `react-hook-form` persisté ou un store Zustand léger si besoin de persistance cross-step avant sauvegarde DB.
- **Routing**: Utiliser des Nested Layouts ou des pages distinctes dans `src/app/dvp/wizard/`.

### Implementation Details
- **Feature-First**: Composants spécifiques au wizard dans `src/features/dvp/components/wizard/`.
- **Navigation**: Ne pas bloquer la navigation "Précédent" du navigateur.

### References
- [UX Design Specification](BMAD_OUTPUT/planning-artifacts/ux-design-specification.md)
- [Epic Breakdown](BMAD_OUTPUT/planning-artifacts/epics.md)

## Dev Agent Record
- **Agent**: PM (John) -> Dev (Amelia)
- **Action**: Implemented Story 2.2

### Completion Notes List
- **Layout**: Created isolated wizard layout at `src/app/dvp/wizard/layout.tsx`.
- **Components**: Created `WizardStepper` component.
- **Routing**: Setup `project` and `budget` steps with navigation.

### File List
- `src/app/dvp/wizard/layout.tsx` (NEW)
- `src/features/dvp/components/wizard-stepper.tsx` (NEW)
- `src/app/dvp/wizard/page.tsx` (NEW)
- `src/app/dvp/wizard/project/page.tsx` (NEW)
- `src/app/dvp/wizard/budget/page.tsx` (NEW)

### Change Log
- 2026-01-17: Mise en place de la structure "Focus Tunnel" (Layout, Stepper, Navigation).

### Status
review