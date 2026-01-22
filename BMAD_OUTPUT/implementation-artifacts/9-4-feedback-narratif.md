# Story 9.4: Feedback Narratif (Journal de Bord)

Status: ready-for-dev

## Story

As a student,
I want to share how I felt about completing a task,
So that I can reflect on my learning journey.

## Acceptance Criteria

1. [ ] **Given** a task is closed, **When** the system asks "How did it go?", **Then** ma réponse est stockée dans `userFeedback` et l'Indice de Traction est mis à jour. [Source: epics.md#Story 9.4]

## Tasks / Subtasks

- [x] Task 1: UI Extension
  - [x] Add narrative feedback form to `TaskCard` ("Journal de bord").
- [x] Task 2: Persistence
  - [x] Save `userFeedback` during task completion.

## Dev Notes

### Requirement FR16
- **Value**: This provides qualitative data for the Coach to better understand user struggles.

## Dev Agent Record

### Status
review

### Implementation Notes
- Implemented feedback textarea in `TaskCard`.
- Feedback is persisted via `updateTaskStatus` mutation.

