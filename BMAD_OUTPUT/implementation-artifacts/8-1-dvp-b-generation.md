# Story 8.1: Génération de la Fiche DVP-B & Hypothèses

Status: ready-for-dev

## Story

As a student,
I want my conversation to be synthesized into a structured DVP-B project,
So that I can move from exploration to execution.

## Acceptance Criteria

1. [ ] **Given** a completed conversation session, **When** the user clicks "Finalize", **Then** a DVP-B object is created with all required fields (UserID, Hypotheses[], Final Index) and stored in DB. [Source: epics.md#Story 8.1]
2. [ ] **And** the system supports multiple project hypotheses simultaneously. [Source: prd-v2.md#Functional Requirements]

## Tasks / Subtasks

- [ ] Task 1: DVP-B Logic Implementation
  - [ ] Implement service to extract structured data from chat history using LLM function calling or parsing.
- [ ] Task 2: Multi-Project Support
  - [ ] Update `DvpRecord` handling to allow multiple scenarios/hypotheses.
- [ ] Task 3: Transition UI
  - [ ] Implement the "Exit Session" view with the 3 states (Cristalline, Hypothèse, Exploration).

## Dev Notes

### References
- [PRD v2](BMAD_OUTPUT/planning-artifacts/prd-v2.md)

## Dev Agent Record

### Status
ready-for-dev
