# Story 2.7: Synthèse & Validation DVP

Status: done

## Tasks / Subtasks

- [x] Task 1: Créer la Page Synthèse (AC: 1)
  - [x] `src/app/dvp/wizard/summary/page.tsx`.
  - [x] Afficher les données `existingDvp` sous forme de cartes (Card Shadcn) par pilier.
- [x] Task 2: Validation Complétude (AC: 2)
  - [x] Vérifier la présence des données critiques (Ville, Budget > 0, Logement défini).
  - [x] Si incomplet, désactiver le bouton "Valider" ou afficher un warning.
- [x] Task 3: Action Valider (AC: 3)
  - [x] Bouton "Lancer l'analyse".
  - [x] Au clic, changer le status du DVP en "COMPLETED" (via mutation `dvp.submit` à créer ou `update`).
  - [x] Redirection vers `/dvp/cockpit` (page à créer ou placeholder).

## Dev Notes

### Architecture
- **Navigation**: Dernière étape du Wizard.
- **Data**: Lecture seule principalement.

## Dev Agent Record
- **Agent**: PM -> Dev (Amelia)
- **Action**: Implemented Story 2.7

### Completion Notes List
- **Component**: `SummaryView` validates completeness of all 4 pillars.
- **UX**: Visual feedback (green check/yellow alert) per section.
- **Test**: Unit tests ensure validation logic works correctly.

### File List
- `src/features/dvp/components/summary-view.tsx` (NEW)
- `src/features/dvp/components/summary-view.test.tsx` (NEW)
- `src/app/dvp/wizard/summary/page.tsx` (NEW)

### Change Log
- 2026-01-17: Implémentation de la synthèse et validation de complétude.
