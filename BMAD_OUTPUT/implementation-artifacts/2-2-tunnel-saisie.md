# Story 2.2: Tunnel de Saisie - Structure "Focus Tunnel"

Status: ready-for-dev

## Story

As a étudiant,
I want être guidé étape par étape dans la saisie de mon dossier,
So that je ne sois pas submergé par la quantité d'informations demandée.

## Acceptance Criteria

1. [ ] **Given** un utilisateur connecté sur le Dashboard. **When** je clique sur "Démarrer mon DVP". **Then** j'accède à une interface de type "Wizard" (Focus Tunnel) isolée (layout minimaliste). [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 2.2]
2. [ ] **And** je vois une barre de progression claire indiquant l'étape actuelle sur le total (ex: 1/4). [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 2.2]
3. [ ] **And** je peux naviguer entre les étapes (Suivant / Précédent) sans perdre mes données (état local ou URL). [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 2.2]
4. [ ] **And** l'URL reflète l'étape en cours (ex: `/dvp/wizard/step-1`) pour permettre le rechargement de page. [Source: Architecture Decision]

## Tasks / Subtasks

- [ ] Task 1: Créer le Layout Wizard (AC: 1)
  - [ ] Créer `src/app/(dashboard)/dvp/wizard/layout.tsx`.
  - [ ] Implémenter un header simplifié (Logo + "Quitter") pour réduire la charge cognitive (Focus Mode).
- [ ] Task 2: Implémenter le Composant Stepper (AC: 2)
  - [ ] Créer `src/features/dvp/components/wizard-stepper.tsx`.
  - [ ] Utiliser shadcn/ui (Progress ou Steps custom) pour afficher la progression.
  - [ ] Afficher les labels des étapes : "Projet", "Budget", "Logement", "Synthèse".
- [ ] Task 3: Gestion de la Navigation et État (AC: 3, 4)
  - [ ] Configurer les routes : `/dvp/wizard/project`, `/dvp/wizard/budget`, etc.
  - [ ] Implémenter la logique "Suivant/Précédent" via `next/navigation` (`useRouter`).
  - [ ] S'assurer que le bouton "Suivant" est désactivé si l'étape n'est pas valide (préparation pour validation future).

## Dev Notes

### Architecture & Technical Stack
- **UX Pattern**: "Focus Tunnel". Le layout doit être différent du Dashboard principal (pas de sidebar complexe). L'attention doit être 100% sur le formulaire.
- **State Management**: Préférer l'état dans l'URL (`/step-1`, `/step-2`) combiné à `react-hook-form` persisté ou un store Zustand léger si besoin de persistance cross-step avant sauvegarde DB.
- **Routing**: Utiliser des Nested Layouts ou des pages distinctes dans `src/app/(dashboard)/dvp/wizard/`.

### Implementation Details
- **Feature-First**: Composants spécifiques au wizard dans `src/features/dvp/components/wizard/`.
- **Navigation**: Ne pas bloquer la navigation "Précédent" du navigateur.

### References
- [UX Design Specification](BMAD_OUTPUT/planning-artifacts/ux-design-specification.md)
- [Epic Breakdown](BMAD_OUTPUT/planning-artifacts/epics.md)

## Dev Agent Record
- **Agent**: PM (John)
- **Action**: Created Story 2.2
