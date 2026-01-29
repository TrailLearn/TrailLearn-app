# Story 13.1: Calculateur de Viabilité Holistique (Extension V1)

Status: ready-for-dev

## Story

As a utilisateur cherchant l'équilibre,
I want que mon score de viabilité reflète mon énergie autant que mes finances,
So that je ne m'engage pas dans un projet rentable mais épuisant.

## Acceptance Criteria

1. [ ] **Given** un calcul de viabilité lancé (extends Story 3.2 - Moteur V1), **When** le moteur traite les données, **Then** il intègre le TRV (Story 11.1) et la Complexité (Story 11.2) comme variables de pondération. [Source: epics.md#Story 13.1]
2. [ ] **And** le score final est décomposable en 3 sous-scores visibles (Finance / Énergie / Sens) pour une transparence totale. [Source: epics.md#Story 13.1]
3. [ ] **And** si le score baisse, une explication contextuelle est fournie (ex: "Viable financièrement, mais risque d'ennui élevé car votre TRV est court"). [Source: epics.md#Story 13.1]
4. [ ] **And** le résultat est présenté comme une "Hypothèse de travail" et non une vérité absolue. [Source: epics.md#Story 13.1]

## Tasks / Subtasks

- [ ] Task 1: Engine Logic Update
  - [ ] Update `src/features/engine/logic` to accept `UserProfile` (TRV, Complexity).
  - [ ] Implement weighting algorithm:
    - If Project Duration > User TRV -> Energy Score decreases.
    - If Project Complexity != User Complexity -> Energy Score decreases.
- [ ] Task 2: Data Structure
  - [ ] Update `ViabilityResult` type to include `subScores: { finance, energy, meaning }`.
- [ ] Task 3: UI Update
  - [ ] Update Cockpit Gauge to show breakdown (radar chart or 3 bars).
  - [ ] Display explanation text.

## Dev Notes

- **Math**: Don't overcomplicate. Simple multipliers.
- **Legacy**: Must handle cases where Profile is missing (default to Neutral).

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List