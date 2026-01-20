# Story 8.2: Persistance des Fragments & Reprise de Session

Status: ready-for-dev

## Story

As a student,
I want to leave my session without losing progress,
So that I can resume my thinking later when I have more time.

## Acceptance Criteria

1. [ ] **Given** an interrupted session, **When** the user returns to the chat, **Then** the AI Coach offers to resume from the last saved preference fragments. [Source: epics.md#Story 8.2]

## Tasks / Subtasks

- [ ] Task 1: Implement Session Persistence
  - [ ] Save chat fragments and detected preferences to `DvpRecord` metadata.
- [ ] Task 2: Resume Prompting
  - [ ] Implement logic to detect unfinished sessions and generate a welcoming "Resume" message.

## Dev Notes

## Dev Agent Record

### Status
ready-for-dev
