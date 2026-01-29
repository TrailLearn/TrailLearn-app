# Story 14.1: Moteur d'Hypothèses de Voyage

Status: ready-for-dev

## Story

As a explorateur de moi-même,
I want que le système me suggère des voyages basés sur mes besoins intérieurs, pas sur le tourisme,
So that le dépaysement serve mon évolution.

## Acceptance Criteria

1. [ ] **Given** une tension identitaire détectée (ex: "Besoin d'anonymat pour oser créer"), **When** je consulte le module Voyage, **Then** le système suggère un type d'environnement (ex: "Grande métropole anonyme") plutôt qu'une ville spécifique. [Source: epics.md#Story 14.1]
2. [ ] **And** chaque suggestion est formulée comme une hypothèse conditionnelle ("Si tu évolues dans un environnement X, alors Y pourrait se débloquer"). [Source: epics.md#Story 14.1]
3. [ ] **And** aucune recommandation n'est présentée comme une injonction touristique absolue. [Source: epics.md#Story 14.1]

## Tasks / Subtasks

- [ ] Task 1: Travel Hypothesis Engine
  - [ ] Implement `TravelAdvisorService`.
  - [ ] Input: User Profile (Constraints, Desires, Shadow).
  - [ ] Logic: Map "Inner Need" -> "Environment Type" (e.g., Chaos -> Asian Megacity, Silence -> Nordic Remote).
- [ ] Task 2: UI Implementation
  - [ ] Create `TravelHypothesisCard`.
  - [ ] Display "Why this environment?" reasoning.

## Dev Notes

- **Concept**: "Travel as Therapy/Test". Not Expedia.

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List