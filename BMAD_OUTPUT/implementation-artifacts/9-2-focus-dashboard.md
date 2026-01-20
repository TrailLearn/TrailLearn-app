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

- [ ] Task 1: Create `FocusDashboard` Component
  - [ ] Implement `src/features/execution/components/focus-dashboard.tsx`.
- [ ] Task 2: Implement `TaskCard` Component
  - [ ] Display task title, status, and optional evidence indicator.
- [ ] Task 3: "View Full Plan" Toggle
  - [ ] Implement the collapsible backlog view.

## Dev Notes

## Dev Agent Record

### Status
ready-for-dev
