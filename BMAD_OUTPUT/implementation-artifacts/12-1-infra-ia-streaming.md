# Story 12.1: Infrastructure IA Streaming (Haute Performance)

Status: done

## Story

As a utilisateur en conversation,
I want recevoir les réponses de l'IA instantanément,
So that le dialogue soit fluide comme une vraie discussion.

## Acceptance Criteria

1. [x] **Given** une requête envoyée au Mentor, **When** le serveur traite la demande, **Then** le premier token s'affiche en moins de 3 secondes (p95 Time-To-First-Token). [Source: epics.md#Story 12.1]
2. [x] **And** la réponse s'affiche progressivement (Streaming token-by-token). [Source: epics.md#Story 12.1]
3. [x] **And** si le provider LLM est indisponible, un message de fallback sobre ("Le Mentor réfléchit, réessayez...") s'affiche sans crasher l'app. [Source: epics.md#Story 12.1]

## Tasks / Subtasks

- [x] Task 1: Performance Verification
  - [x] Verify existing streaming implementation meets p95 < 3s requirement (Measured: ~1.7s).
  - [x] Optimize if necessary (Edge Runtime vs Serverless). (Node.js Serverless sufficient).
- [x] Task 2: Fallback Handling
  - [x] Implement explicit error handling for Vercel AI SDK streams.
  - [x] Show user-friendly toast/message on failure, not just console error.
- [x] Task 3: Load Testing (Optional)
  - [x] Basic load test to confirm stability (`scripts/test-llm-perf.ts`).

## Dev Notes

- **Existing Code**: Check `src/app/api/chat/route.ts` and `useChat` hook. This story might be partially done (ref Story 7.1 V2).
- **Resilience**: The key add-on here is the Robustness (Fallback).

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Completion Notes List
- Verified LLM performance using custom script `scripts/test-llm-perf.ts`. Result: TTFT ~1.7s, Streaming OK.
- Enhanced `ChatInterface` to show a friendly fallback message ("Le Mentor réfléchit...") instead of a raw error.
- Added Toast notification for better error visibility using `useChat`'s `onError` callback.
- Confirmed `src/app/api/chat/route.ts` is correctly set up for streaming (Node.js runtime).

### Code Review Fixes (2026-01-30)
- Improved error message clarity: Changed from "thinking..." to "encountered an obstacle" to avoid misleading users when stream fails.
- Added `role="alert"` to error message for accessibility.
- Removed "ping" animation on error state to visually indicate stopped process.

### File List
- `scripts/test-llm-perf.ts` (New)
- `src/features/ai-coach/components/chat-interface.tsx` (Modified)