# Story 10.2: Job de Relance Intelligente (Cron)

Status: ready-for-dev

## Story

As a system,
I want to detect "Ghost" users to trigger re-optimization prompts,
So that I can maintain user engagement over time.

## Acceptance Criteria

1. [ ] **Given** the daily cron job runs, **When** it identifies users with no activity for J+X days, **Then** it triggers a "Re-optimization available" notification. [Source: epics.md#Story 10.2]

## Tasks / Subtasks

- [ ] Task 1: Ghost Detection Cron
  - [ ] Implement a scheduled task (Next.js Cron or external trigger).
- [ ] Task 2: Notification System
  - [ ] Integrate with the notification system to send re-optimization alerts.

## Dev Notes

## Dev Agent Record

### Status
ready-for-dev
