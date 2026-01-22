# Story 7.1: Initialisation de l'API Chat & Streaming SSE

Status: in-progress

## Story

As a system,
I want to initialize the streaming infrastructure with Vercel AI SDK,
So that I can provide real-time word-by-word responses from the AI Coach.

## Acceptance Criteria

1. [ ] **Given** a user message, **When** the server calls the LLM, **Then** tokens are streamed back to the client in real-time (SSE) with a TTFT < 1s. [Source: epics.md#Story 7.1]
2. [ ] **And** the integration uses Vercel AI SDK for standardisation and provider agnostic configuration. [Source: architecture.md#LLM Integration Strategy]
3. [ ] **And** the implementation respects the Feature-First architecture, living in `src/features/ai-coach/`. [Source: architecture.md#Directory Structure Additions]

## Tasks / Subtasks

- [x] Task 1: Setup Vercel AI SDK and API Route
  - [x] Install `ai` and `@ai-sdk/openai` (or preferred provider) packages.
  - [x] Create the API route `src/app/api/chat/route.ts` using the App Router.
  - [x] Implement the POST handler to receive messages and return a `StreamingTextResponse`.
- [x] Task 2: Implement AI Coach Feature Structure
  - [x] Create directory `src/features/ai-coach/services/`.
  - [x] Create `ai-service.ts` to encapsulate LLM interaction logic.
- [x] Task 3: Client-side Chat Hook
  - [x] Implement `useChat` hook integration in a test component to verify streaming.
- [x] Task 4: Testing & Validation
  - [x] Create unit test for the chat API route.
  - [x] Verify TTFT < 1s in local development environment.

## Review Follow-ups (AI)
- [x] [AI-Review][Medium] Refactor API Route: Moved LLM logic from `route.ts` to `AiCoachService` (DRY).
- [x] [AI-Review][Low] Hardcoded Model: Introduced `src/lib/llm-config.ts` to manage LLM tiers (PREMIUM/FREE).
- [x] [AI-Review][Medium] Test Quality: Updated `route.test.ts` to mock `AiCoachService` and verify delegation.

## Dev Notes

### Architecture & Technical Stack
- **Stack**: Next.js App Router, Vercel AI SDK.
- **SSE**: Server-Sent Events for real-time streaming.
- **Structure**: `src/features/ai-coach/`.
- **Config**: `src/lib/llm-config.ts` for model governance.

### References
- [Architecture Decision Document](BMAD_OUTPUT/planning-artifacts/architecture.md)
- [Epic Breakdown](BMAD_OUTPUT/planning-artifacts/epics.md)

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Debug Log References

### Completion Notes List
- Vercel AI SDK et @ai-sdk/openai installés.
- Route API `src/app/api/chat/route.ts` implémentée avec support streaming.
- Service `AiCoachService` créé pour encapsuler la logique LLM.
- Composant `ChatInterface` créé pour tester le hook `useChat`.
- Tests unitaires Vitest ajoutés et passants.
- **Refactoring Code Review**: Centralisation de la logique LLM et amélioration des tests.

### File List
- `src/app/api/chat/route.ts`
- `src/app/api/chat/route.test.ts`
- `src/features/ai-coach/services/ai-service.ts`
- `src/features/ai-coach/components/chat-interface.tsx`
- `src/lib/llm-config.ts`
- `package.json`

### Change Log
- 2026-01-20: Initialisation de l'infrastructure de chat et du streaming SSE.
- 2026-01-20: Code Review fixes (Service Refactor, LLM Config, Test Mocking).

### Status
done
