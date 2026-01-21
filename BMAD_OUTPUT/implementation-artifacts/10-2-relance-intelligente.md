# Story 10.2: Job de Relance Intelligente (Cron)

Status: ready-for-dev

## Story

As a system,
I want to detect "Ghost" users to trigger re-optimization prompts,
So that I can maintain user engagement over time.

## Acceptance Criteria

1. [ ] **Given** the daily cron job runs, **When** it identifies users with no activity for J+X days, **Then** it triggers a "Re-optimization available" notification. [Source: epics.md#Story 10.2]

## Tasks / Subtasks

- [x] Task 1: Ghost Detection Cron
  - [x] Implemented a GET API route at `/api/cron/re-optimize` to identify users inactive for > 7 days.
  - [x] Added `CRON_SECRET` protection for the endpoint.
- [x] Task 2: Notification System
  - [x] Created a `Notification` model in Prisma.
  - [x] Integrated the cron job to create `RE_OPTIMIZE` notifications for "Ghost" users.

## Dev Notes

### Implementation Details
- **Logic**: Filters users with `lastActiveAt < 7 days` who also have at least one `PENDING` task in their `ActionPlan`.
- **Deduplication**: The job checks if a similar notification was sent in the last 7 days before creating a new one.
- **Trigger**: Can be triggered by Vercel Cron, GitHub Actions, or any scheduled HTTP requester.

## Dev Agent Record

### Status
review

### Implementation Notes
- Added `Notification` table to Prisma.
- Created `/api/cron/re-optimize/route.ts`.
- Secure trigger via bearer token.
- Verified with typecheck.
