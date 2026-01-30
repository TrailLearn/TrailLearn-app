# Story 12.5: Garde-fous et Safety Logs

Status: done

## Story

As a administrateur éthique,
I want tracer les dérapages potentiels ou les demandes hors-scope,
So that je puisse ajuster la sécurité du modèle.

## Acceptance Criteria

1. [x] **Given** une tentative de l'utilisateur de détourner l'usage (Jailbreak) ou une demande dangereuse (Médical/Suicide), **When** le système détecte le risque, **Then** l'IA refuse de répondre (Refusal response). [Source: epics.md#Story 12.5]
2. [x] **And** l'événement est loggué dans un journal "Safety" distinct avec la catégorie du risque (sans les données PII sensibles). [Source: epics.md#Story 12.5]

## Tasks / Subtasks

- [x] Task 1: Prompt Injection Defense
  - [x] Add instructions in System Prompt (`maieutic-coach.ts`) to refuse specific out-of-scope topics (Medical, Legal, Violence).
- [x] Task 2: Safety Logger
  - [x] Implement `SafetyLog` model in Prisma.
  - [x] Log "REFUSAL" events in `AiCoachService`.
- [x] Task 3: Detection Logic
  - [x] Output scanning using Regex to detect refusal patterns defined in System Prompt.
  - [x] Verified with `scripts/test-safety.ts`.

## Dev Notes

- **Architecture**: A separate "Guardrail" LLM call is safer but slower. For V1, System Prompt instructions + Output scanning is acceptable.

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Completion Notes List
- Defined `SafetyLog` model in Prisma to track risk events.
- Updated System Prompt (`maieutic-coach.ts`) with a strict "REFUSAL PROTOCOL" forcing a specific sentence structure when blocking unsafe topics.
- Implemented Regex-based output scanning in `AiCoachService` to detect this refusal sentence and log the event asynchronously.
- Created `scripts/test-safety.ts` to verify that medical advice requests are correctly blocked and tagged.

### Code Review Fixes (2026-01-30)
- Improved Regex robustness for Safety Logging: Now matches any variation of "Je ne peux pas répondre... Sujet: ..." instead of requiring the exact strict sentence, reducing the risk of missed logs due to LLM non-determinism.

### File List
- `prisma/schema.prisma`
- `src/features/ai-coach/prompts/maieutic-coach.ts`
- `src/features/ai-coach/services/ai-service.ts`
- `scripts/test-safety.ts`