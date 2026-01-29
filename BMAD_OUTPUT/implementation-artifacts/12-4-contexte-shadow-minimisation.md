# Story 12.4: Contextualisation Shadow Sécurisée (Minimisation)

Status: ready-for-dev

## Story

As a utilisateur soucieux de ma vie privée,
I want que mes données "Shadow" ne soient utilisées que si nécessaire et de manière protégée,
So that l'IA m'aide sans m'exposer inutilement.

## Acceptance Criteria

1. [ ] **Given** une session de chat, **When** le contexte Shadow est requis (ex: discussion sur les peurs), **Then** l'injection est Opt-in (activée par le contexte de la conversation ou un toggle). [Source: epics.md#Story 12.4]
2. [ ] **And** les données ne sont jamais envoyées "Brutes" mais résumées ou tagguées (Minimisation) pour le LLM. [Source: epics.md#Story 12.4]
3. [ ] **And** les logs de prompt sont filtrés/redacted pour ne jamais persister les données Shadow en clair dans les logs d'observabilité IA (Vercel AI SDK logs). [Source: epics.md#Story 12.4]

## Tasks / Subtasks

- [ ] Task 1: Shadow Context Provider
  - [ ] Implement `getShadowContextSummary(userId)` in `ShadowBoundaryService`.
  - [ ] Returns vague summaries (e.g., "User has fear of failure") instead of raw text if possible, or strictly limited.
- [ ] Task 2: Injection Logic
  - [ ] Update `AiCoachService` to ONLY fetch shadow context if intent detection suggests it (or always if architecturally simpler but minimized).
- [ ] Task 3: Log Redaction
  - [ ] Configure Vercel AI SDK `onFinish` or callbacks to SCRUB shadow data from logs.

## Dev Notes

- **Privacy**: The LLM provider (OpenAI) will receive the data. The "Logs" refers to OUR application logs or Vercel dashboard logs.
- **Minimization**: Send "Phobia: Social" instead of "I am terrified of people because..."

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List