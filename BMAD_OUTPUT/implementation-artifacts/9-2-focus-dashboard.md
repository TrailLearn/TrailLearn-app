# Story 9.2: Dashboard Focus Mode (UI)

Status: ready-for-dev

## Story

As a student,
I want a clean view showing only my next actions,
So that I don't feel overwhelmed by the total amount of work.

## Acceptance Criteria

1. [ ] **Given** the Focus Mode is enabled, **When** I visit the dashboard, **Then** I see 3 clear action cards and a subtle "View full plan" option. [Source: epics.md#Story 9.2]
2. [ ] **And** dashboard loading for the Focus 3 Actions view must be < 100ms. [Source: prd-v2.md#Non-Functional Requirements]

## Tasks / Subtasks

- [x] Task 1: UI Layout
  - [x] Create `src/app/dashboard/focus/page.tsx`.
  - [x] Implement the 3-column grid for Top 3 tasks.
- [x] Task 2: TaskCard Component
  - [x] Create `src/features/execution/components/task-card.tsx`.
  - [x] Display priority badges and colors.
- [x] Task 3: Interaction
  - [x] Add "Mark as Done" action.
  - [x] Implement automatic re-filtering (Top 3 refreshes when a task is completed).

## Dev Notes

### UI Design
- **Color Coding**: RED (High), AMBER (Medium), EMERALD (Low).
- **Focus Mode**: Restricted view to exactly 3 items to reduce cognitive load.

## Dev Agent Record

### Status
review

### Implementation Notes
- Created `FocusDashboard` page.
- Created `TaskCard` with support for Evidence (9.3) and Feedback (9.4).
- Added `updateTaskStatus` and `addEvidence` to tRPC router.

