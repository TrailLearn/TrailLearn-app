# Story 8.2: Persistance des Fragments & Reprise de Session

Status: ready-for-dev

## Story

As a student,
I want to leave my session without losing progress,
So that I can resume my thinking later when I have more time.

## Acceptance Criteria

1. [ ] **Given** an interrupted session, **When** the user returns to the chat, **Then** the AI Coach offers to resume from the last saved preference fragments.
2. [ ] **Given** a new message, **When** processed, **Then** key preference fragments (budget, location, field) are extracted and updated in a lightweight `UserPreference` table or JSON field.
3. [ ] **Given** a resumption, **When** the chat initializes, **Then** the system prompt is injected with the latest known fragments.

## Tasks / Subtasks



- [x] Task 1: Database Schema Migration

  - [x] Add `preferences` JSONB field to `User`.

- [x] Task 2: Fragment Extraction Logic

  - [x] Implement background extraction in `src/features/ai-coach/logic/synthesis/extract-preferences.ts`.

  - [x] Integrate extraction into `AiCoachService.onFinish` callback.

- [x] Task 3: Context Injection

  - [x] Update `getMaieuticSystemPrompt` to include `preferences`.

  - [x] Update `route.ts` to fetch user preferences and pass them to the service.

- [x] Task 4: Resume UI

  - [x] Display "Mémoire Active" badge when returning users are detected (based on Clarity Index presence).



## Dev Notes



### Architecture

- **Async Extraction**: Preferences are extracted *after* the response is streamed, using `onFinish`. This ensures zero latency impact on the user.

- **Privacy**: Only project-related fragments (City, Budget, etc.) are extracted via Zod schema.



## Dev Agent Record



### Status

review



### Implementation Notes

- Schema updated with `preferences` Json field.

- Implemented `extractPreferences` using Vercel AI SDK `generateObject`.

- Updated `AiCoachService` to handle background extraction and DB update.

- Updated `ChatPage` to show a "Mémoire Active" indicator.
