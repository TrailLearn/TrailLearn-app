# Story 8.1: Génération de la Fiche DVP-B & Hypothèses

Status: ready-for-dev

## Story

As a student,
I want my conversation to be synthesized into a structured DVP-B project,
So that I can move from exploration to execution.

## Acceptance Criteria

1. [ ] **Given** a completed conversation session, **When** the user clicks "Finalize", **Then** a DVP-B object is created with all required fields (UserID, Hypotheses[], Final Index) and stored in DB.
2. [ ] **Given** multiple potential projects discussed, **When** finalized, **Then** all hypotheses are saved as distinct entries in the `Hypothesis` table.
3. [ ] **Given** the finalization process, **When** complete, **Then** the user is redirected to the Execution Dashboard (Focus Mode).

## Tasks / Subtasks



- [x] Task 1: Database Schema Migration

  - [x] Update Prisma schema to include `Hypothesis` model linked to User.

  - [x] Add `DvpBSnapshot` model.

- [x] Task 2: AI Synthesis Logic

  - [x] Implement `src/features/ai-coach/logic/synthesis/generate-dvp-b.ts` using `generateObject`.

  - [x] Define the extraction schema (Zod) for the LLM output.

- [x] Task 3: API Integration

  - [x] Create tRPC procedure `ai.finalizeSession` for synthesis and storage.

- [x] Task 4: UI Trigger

  - [x] Add a "Finaliser mon projet" button in the Chat interface.



## Dev Notes



### Architecture

- **Hypothesis Model**: Stores structured alternative projects.

- **LLM Synthesis**: Uses GPT-4o (via AI SDK) to extract a clean summary and weighted hypotheses from chat history.



## Dev Agent Record



### Status

review



### Implementation Notes

- Added `Hypothesis` and `DvpBSnapshot` to Prisma.

- Implemented structured extraction using `generateObject` from Vercel AI SDK.

- Created transaction-safe `finalizeSession` mutation.

- Enhanced Chat UI with a header containing the finalization action (visible after 4 messages).
