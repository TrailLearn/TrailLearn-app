# Story 9.5: Secrétaire Logistique (Prompt Réoptimisation)

Status: ready-for-dev

## Story

As an inactive student,
I want the Coach to suggest re-organizing my plan without judging my delay,
So that I can restart my momentum easily.

## Acceptance Criteria

1. [ ] **Given** inactivity > 7 days, **When** the user returns, **Then** the AI Coach uses a logistic/neutral tone to propose moving past deadlines to new optimal dates. [Source: epics.md#Story 9.5]

## Tasks / Subtasks

- [x] Task 1: Re-optimization Prompt
  - [x] Define the "Secrétaire Logistique" system prompt in `src/features/ai-coach/prompts/maieutic-coach.ts`.
- [x] Task 2: Detection Logic
  - [x] Implement check for last interaction date and overdue tasks in `src/app/api/chat/route.ts`.
  - [x] Track `lastActiveAt` in User model.

## Dev Notes

### Implementation Details
- **Trigger**: Inactivity > 7 days or any overdue task (`dueDate < now`).
- **Persona**: The AI becomes a neutral logistic secretary when the trigger is met, proposing plan re-optimization.

## Dev Agent Record

### Status
review

### Implementation Notes
- Added `lastActiveAt` to Prisma.
- Logic in `route.ts` detects returning users and overdue counts.
- Persona instructions added to system prompt.
