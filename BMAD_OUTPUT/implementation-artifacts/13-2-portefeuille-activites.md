# Story 13.2: Générateur de Portefeuille d'Activités Temporel

Status: ready-for-dev

## Story

As a multipotentiel,
I want que le système me propose des combinaisons d'activités plutôt qu'un métier unique,
So that je puisse sécuriser mes revenus tout en nourrissant mes passions.

## Acceptance Criteria

1. [ ] **Given** un besoin financier non couvert par la passion principale, **When** le moteur génère des solutions, **Then** il propose des scénarios hybrides (ex: "70% Consultant [Sécurité] + 30% Artiste [Sens]"). [Source: epics.md#Story 13.2]
2. [ ] **And** ces portefeuilles sont séquencés dans le temps (ex: "Année 1 : Focus Sécurité -> Année 2 : Transition progressive"). [Source: epics.md#Story 13.2]
3. [ ] **And** l'interface indique clairement que cette stratégie est transitoire pour construire les fondations, pas une identité figée à vie. [Source: epics.md#Story 13.2]

## Tasks / Subtasks

- [ ] Task 1: Strategy Generation Logic
  - [ ] Implement `StrategyGenerator` service.
  - [ ] Input: Budget Gap, User Skills.
  - [ ] Output: List of `Portfolio` (Primary Activity + Side Hustle).
- [ ] Task 2: Temporal Sequencing
  - [ ] Add `timeline` property to Portfolio (Year 1, Year 2).
- [ ] Task 3: UI Presentation
  - [ ] Create `StrategyCard` component showing the split (Pie chart?).
  - [ ] Add "Transient Strategy" badge/tooltip.

## Dev Notes

- **AI**: This might be powered by the LLM (Coach) structured output rather than a deterministic algorithm, given the complexity of "proposing activities". The Engine calculates the math, the AI proposes the "What".

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List