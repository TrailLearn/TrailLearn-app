# Story 12.4: Contextualisation Shadow Sécurisée (Minimisation)

Status: done

## Story

As a utilisateur soucieux de ma vie privée,
I want que mes données "Shadow" ne soient utilisées que si nécessaire et de manière protégée,
So that l'IA m'aide sans m'exposer inutilement.

## Acceptance Criteria

1. [x] **Given** une session de chat, **When** le contexte Shadow est requis (ex: discussion sur les peurs), **Then** l'injection est Opt-in (activée par le contexte de la conversation ou un toggle). [Source: epics.md#Story 12.4]
2. [x] **And** les données ne sont jamais envoyées "Brutes" mais résumées ou tagguées (Minimisation) pour le LLM. [Source: epics.md#Story 12.4]
3. [x] **And** les logs de prompt sont filtrés/redacted pour ne jamais persister les données Shadow en clair dans les logs d'observabilité IA (Vercel AI SDK logs). [Source: epics.md#Story 12.4]

## Tasks / Subtasks

- [x] Task 1: Shadow Context Provider
  - [x] Implement `getShadowContextSummary(userId)` in `ShadowBoundaryService`.
  - [x] Returns vague summaries (truncated to 300 chars) instead of raw text if possible.
- [x] Task 2: Injection Logic
  - [x] Update `src/app/api/chat/route.ts` to ONLY fetch shadow context if intent detection (keywords like "peur", "frein") suggests it.
- [x] Task 3: Log Redaction
  - [x] Configure `AiCoachService` logs to SCRUB shadow data (replaced with `_redacted: true`).

## Dev Notes

- **Privacy**: The LLM provider (OpenAI) will receive the data. The "Logs" refers to OUR application logs or Vercel dashboard logs.
- **Minimization**: Send "Phobia: Social" instead of "I am terrified of people because..."

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Completion Notes List
- Implemented `getShadowContextSummary` in `ShadowBoundaryService` with content truncation logic for minimization.
- Added conditional injection logic in `api/chat/route.ts`: Shadow data is only loaded if user message contains specific emotional/blockage keywords.
- Implemented strictly redacted logs in `AiCoachService` to prevent sensitive data leak in application logs.
- Updated System Prompt template to include the shadow context placeholder.

### Code Review Fixes (2026-01-30)
- Hardened shadow injection logic: Replaced loose `includes` matching with Regex word boundary checks (`\bword\b`) to prevent accidental data exposure on partial matches (e.g. "vapeur" vs "peur").
- Removed duplicate keywords in trigger list.

### File List
- `src/features/being-profile/services/shadow-boundary-service.ts`
- `src/app/api/chat/route.ts`
- `src/features/ai-coach/services/ai-service.ts`
- `src/features/ai-coach/prompts/maieutic-coach.ts`