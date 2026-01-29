# Story 12.1: Infrastructure IA Streaming (Haute Performance)

Status: ready-for-dev

## Story

As a utilisateur en conversation,
I want recevoir les réponses de l'IA instantanément,
So that le dialogue soit fluide comme une vraie discussion.

## Acceptance Criteria

1. [ ] **Given** une requête envoyée au Mentor, **When** le serveur traite la demande, **Then** le premier token s'affiche en moins de 3 secondes (p95 Time-To-First-Token). [Source: epics.md#Story 12.1]
2. [ ] **And** la réponse s'affiche progressivement (Streaming token-by-token). [Source: epics.md#Story 12.1]
3. [ ] **And** si le provider LLM est indisponible, un message de fallback sobre ("Le Mentor réfléchit, réessayez...") s'affiche sans crasher l'app. [Source: epics.md#Story 12.1]

## Tasks / Subtasks

- [ ] Task 1: Performance Verification
  - [ ] Verify existing streaming implementation meets p95 < 3s requirement.
  - [ ] Optimize if necessary (Edge Runtime vs Serverless).
- [ ] Task 2: Fallback Handling
  - [ ] Implement explicit error handling for Vercel AI SDK streams.
  - [ ] Show user-friendly toast/message on failure, not just console error.
- [ ] Task 3: Load Testing (Optional)
  - [ ] Basic load test to confirm stability.

## Dev Notes

- **Existing Code**: Check `src/app/api/chat/route.ts` and `useChat` hook. This story might be partially done (ref Story 7.1 V2).
- **Resilience**: The key add-on here is the Robustness (Fallback).

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List