# Story 9.1: Moteur de Focus (Filtrage Top 3)

Status: ready-for-dev

## Story

As a system,
I want to filter the action backlog to show only the 3 most critical tasks,
So that I can reduce the user's cognitive load and prevent paralysis.

## Acceptance Criteria

1. [ ] **Given** a backlog of multiple tasks, **When** the focus engine runs, **Then** it returns only the top 3 tasks based on dynamic priority and hides the rest. [Source: epics.md#Story 9.1]
2. [ ] **And** the logic is implemented server-side to ensure deterministic behavior. [Source: architecture.md#Data-Driven Execution]

## Tasks / Subtasks

- [x] Task 1: Focus Logic Implementation
  - [x] Implement `src/features/execution/logic/get-focus-tasks.ts`.
  - [x] Define priority algorithm (Deadline proximity + Criticality).
- [x] Task 2: API Endpoint
  - [x] Create tRPC procedure `execution.getFocusTasks`.

## Dev Notes

### Architecture
- **Separation of Concerns**: Logic is isolated in `logic/focus-engine.ts`, tested independently of the database.
- **Priority Handling**: Custom sorting logic handles the enum-like priorities correctly.

## Dev Agent Record

### Status
review

### Implementation Notes
- Added `ActionPlan` and `Task` schema.
- Implemented core focus logic with unit tests.
- Created `executionRouter` and registered it.
