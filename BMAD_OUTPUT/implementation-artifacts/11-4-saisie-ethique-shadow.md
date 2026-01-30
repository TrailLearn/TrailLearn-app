# Story 11.4: Saisie Éthique des Zones d'Ombre

Status: done

## Story

As a utilisateur vulnérable,
I want déclarer mes freins psychologiques dans un cadre sécurisant et sans pression,
So that je puisse être honnête sans culpabilité.

## Acceptance Criteria

1. [x] **Given** l'interface de saisie "Zone d'Ombre", **When** j'accède au formulaire, **Then** un consentement explicite ("Je comprends que ces données servent à...") est requis. [Source: epics.md#Story 11.4]
2. [x] **And** je peux choisir de passer ("Skip") cette section sans pénalité bloquante. [Source: epics.md#Story 11.4]
3. [x] **And** un bouton "Effacer mes ombres" permet la suppression immédiate et définitive de ces données spécifiques. [Source: epics.md#Story 11.4]
4. [x] **And** l'UI utilise un langage "Safe" (non-jugeant, expliquant l'utilité). [Source: epics.md#Story 11.4]

## Tasks / Subtasks

- [x] Task 1: UI Components
  - [x] Create `ShadowZoneForm` with specific "Safe Mode" styling (calm colors, clear disclaimers).
  - [x] Implement Consent Checkbox before showing fields.
  - [x] Add "Passer cette étape" primary action.
- [x] Task 2: Delete Feature
  - [x] Add "Effacer mes ombres" button (Red/Warning).
  - [x] Connect to `deleteShadowProfile` endpoint.
- [x] Task 3: Wording Review
  - [x] Ensure all copy is validated for non-judgmental tone.

## Dev Notes

- **UX**: This is a sensitive area. No "required" fields except consent.
- **Privacy**: The "Delete" button must truly delete the record from DB immediately.

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Completion Notes List
- Created `ShadowZoneForm` with `shadcn/ui` components and `calm` styling.
- Implemented explicit consent mechanism before revealing sensitive fields.
- Added "Passer cette étape" (Skip) functionality.
- Implemented "Effacer mes ombres" (Hard delete) with confirmation.
- Added tRPC procedures (`getShadow`, `updateShadow`, `deleteShadow`) in `being-profile` router.
- Verified with unit tests covering consent, skipping, and deletion.

### Code Review Fixes (2026-01-30)
- Replaced native `window.confirm` with accessible `Dialog` component for deletion confirmation.
- Improved checkbox styling with custom Tailwind classes for better visual integration.
- Updated unit tests to simulate `Dialog` interactions properly.

### File List
- `src/features/being-profile/components/shadow-zone-form.tsx`
- `src/server/api/routers/being-profile.ts`
- `tests/unit/features/being-profile/ShadowZoneForm.test.tsx`