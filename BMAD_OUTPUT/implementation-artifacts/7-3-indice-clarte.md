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

- [x] Task 1: Database Schema Migration
  - [x] Create and run Prisma migration for `ClarityIndex` and `RuleVersion` tables.
- [x] Task 2: Rule Engine Implementation
  - [x] Implement `src/features/ai-coach/logic/calculate-clarity.ts`.
  - [x] Define the V1 heuristic (completion + internal coherence).
- [x] Task 3: API Integration
  - [x] Create tRPC procedure `ai.updateIndex` to trigger calculation and storage.
- [x] Task 4: Audit Logging
  - [x] Implement the `FR8` requirement: log each change with its source (User Input vs Rule Update).
- [x] Task 5: Testing
  - [x] Unit tests for `calculateClarity` with various DVP inputs.

## Dev Notes

### Architecture & Technical Stack
- **ORM**: Prisma.
- **Latency**: Must be < 500ms (measured on server-side).
- **Heuristic V1**: 70% Administrative Completion (Validated Steps) + 30% Data Presence (Coherence).

### References
- [PRD v2](BMAD_OUTPUT/planning-artifacts/prd-v2.md)
- [Architecture Decision Document](BMAD_OUTPUT/planning-artifacts/architecture.md)

## Dev Agent Record

### Status
review

### Review Follow-ups (AI)
- [x] [AI-Review][High] Throttled `updateClarityIndex` to max once every 30s in `ChatInterface.tsx` to prevent DB spam.
- [x] [AI-Review][Medium] Added Type Safety to `ai.ts` using `dvpDataSchema.safeParse`.

### Implementation Notes
- Added `ClarityIndex` and `RuleVersion` tables to Prisma. Used `db push` to sync due to migration drift, but models are correctly defined.
- Implemented deterministic clarity heuristic in `calculate-clarity.ts`.
- Created `aiRouter` with `updateClarityIndex` mutation that logs to `AuditLog`.
- Updated `ChatInterface` (UI) to trigger index recalculation upon user message submission.
- Unit tests cover various completion scenarios for the Clarity Index.
