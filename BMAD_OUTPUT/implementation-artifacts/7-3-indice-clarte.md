# Story 7.3: Calcul de l'Indice de Clarté V1 (Real-time)

Status: ready-for-dev

## Story

As a student,
I want to see my Clarity Index evolve during the conversation,
So that I can measure the maturity of my project project in real-time.

## Acceptance Criteria

1. [ ] **Given** a validated user input during chat, **When** the rule engine executes, **Then** the index is updated in < 500ms and saved in the `ClarityIndex` table. [Source: epics.md#Story 7.3]
2. [ ] **And** the calculation is deterministic and based on rule versioning. [Source: architecture.md#Data Model Updates]
3. [ ] **And** every change is recorded in the Audit Log. [Source: prd-v2.md#Data Privacy & Compliance]

## Tasks / Subtasks

- [ ] Task 1: Database Schema Migration
  - [ ] Create and run Prisma migration for `ClarityIndex` and `RuleVersion` tables.
- [ ] Task 2: Rule Engine Implementation
  - [ ] Implement `src/features/ai-coach/logic/calculate-clarity.ts`.
  - [ ] Define the V1 heuristic (completion + internal coherence).
- [ ] Task 3: API Integration
  - [ ] Create tRPC procedure `ai.updateIndex` to trigger calculation and storage.
- [ ] Task 4: Audit Logging
  - [ ] Implement the `FR8` requirement: log each change with its source (User Input vs Rule Update).
- [ ] Task 5: Testing
  - [ ] Unit tests for `calculateClarity` with various DVP inputs.

## Dev Notes

### Architecture & Technical Stack
- **ORM**: Prisma.
- **Latency**: Must be < 500ms (measured on server-side).

### References
- [PRD v2](BMAD_OUTPUT/planning-artifacts/prd-v2.md)
- [Architecture Decision Document](BMAD_OUTPUT/planning-artifacts/architecture.md)

## Dev Agent Record

### Status
ready-for-dev
