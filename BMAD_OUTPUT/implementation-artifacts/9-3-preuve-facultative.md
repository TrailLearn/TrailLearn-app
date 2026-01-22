# Story 9.3: Preuve Facultative (Upload)

Status: ready-for-dev

## Story

As a student,
I want to add proof to my completed tasks,
So that I can increase the Coach's confidence in my progress.

## Acceptance Criteria

1. [ ] **Given** a completed task card, **When** I click "Add Proof", **Then** I can upload a file or link that is associated with the `Task` object via `evidenceUrl`. [Source: epics.md#Story 9.3]

## Tasks / Subtasks

- [x] Task 1: UI Extension
  - [x] Add Link Input to `TaskCard`.
  - [x] Display "Evidence" link if present.
- [x] Task 2: API Support
  - [x] Implement `addEvidence` in `executionRouter`.

## Dev Notes

### Requirement FR15
- **Implementation**: Currently uses a string URL input for simplicity (Proof of Concept). Real file upload would require S3/Uploadthing.

## Dev Agent Record

### Status
review

### Implementation Notes
- Added URL input for evidence in `TaskCard`.
- Created `addEvidence` procedure in tRPC.
