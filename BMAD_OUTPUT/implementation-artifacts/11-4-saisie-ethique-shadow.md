# Story 11.4: Saisie Éthique des Zones d'Ombre

Status: ready-for-dev

## Story

As a utilisateur vulnérable,
I want déclarer mes freins psychologiques dans un cadre sécurisant et sans pression,
So that je puisse être honnête sans culpabilité.

## Acceptance Criteria

1. [ ] **Given** l'interface de saisie "Zone d'Ombre", **When** j'accède au formulaire, **Then** un consentement explicite ("Je comprends que ces données servent à...") est requis. [Source: epics.md#Story 11.4]
2. [ ] **And** je peux choisir de passer ("Skip") cette section sans pénalité bloquante. [Source: epics.md#Story 11.4]
3. [ ] **And** un bouton "Effacer mes ombres" permet la suppression immédiate et définitive de ces données spécifiques. [Source: epics.md#Story 11.4]
4. [ ] **And** l'UI utilise un langage "Safe" (non-jugeant, expliquant l'utilité). [Source: epics.md#Story 11.4]

## Tasks / Subtasks

- [ ] Task 1: UI Components
  - [ ] Create `ShadowZoneForm` with specific "Safe Mode" styling (calm colors, clear disclaimers).
  - [ ] Implement Consent Checkbox before showing fields.
  - [ ] Add "Passer cette étape" primary action.
- [ ] Task 2: Delete Feature
  - [ ] Add "Effacer mes ombres" button (Red/Warning).
  - [ ] Connect to `deleteShadowProfile` endpoint.
- [ ] Task 3: Wording Review
  - [ ] Ensure all copy is validated for non-judgmental tone.

## Dev Notes

- **UX**: This is a sensitive area. No "required" fields except consent.
- **Privacy**: The "Delete" button must truly delete the record from DB immediately.

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List