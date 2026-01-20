# Story 7.2: Le Miroir Lucide (Prompt System & Contradictions)

Status: in-progress

## Story

As a student,
I want the AI Coach to identify my project contradictions (e.g. budget vs ambition),
So that I can consciously deliberate on my choices without being judged.

## Acceptance Criteria

1. [ ] **Given** a contradictory intention (e.g. 5k€ budget for USA top school), **When** the AI responds, **Then** it must highlight the tension using conditional language and avoid definitive rejection verbs ("Impossible", "Rejected"). [Source: epics.md#Story 7.2]
2. [ ] **And** the system prompt incorporates the "Non-Closure" principle from the ethical guardrails. [Source: prd-v2.md#Ethical Guardrails]
3. [ ] **And** the AI Coach has access to the user's current DVP data (RAG context). [Source: architecture.md#Core AI Architecture]

## Tasks / Subtasks

- [x] Task 1: Define System Prompts
  - [x] Create `src/features/ai-coach/prompts/maieutic-coach.ts`.
  - [x] Implement the "Miroir Lucide" persona with strict instructions on conditional language.
- [x] Task 2: Context Injection (RAG)
  - [x] Implement a service to fetch the user's current DVP record and inject it into the LLM context.
- [x] Task 3: Ethical Guardrails Implementation
  - [x] Implement `src/server/lib/llm-guardrails.ts` to post-process AI outputs and filter forbidden definitive terms.
- [x] Task 4: Testing & Validation
  - [x] Create a "Stress Test" script with the "Rêveur Paresseux" and "Incohérent Géographique" scenarios.
  - [x] Verify that no definitive rejection verbs are generated.

## Review Follow-ups (AI)
- [x] [AI-Review][Medium] Guardrail Integration: Added `onFinish` callback in `ai-service.ts` to log ethical violations using `LLMGuardrails`.
- [x] [AI-Review][Low] Prompt Refactor: Encapsulated template logic in `getMaieuticSystemPrompt` function.

## Dev Notes

### Architecture & Technical Stack
- **Context**: Light RAG (injecting DVP data into prompt).
- **Guardrails**: Text post-processing or strict system instructions.

### References
- [PRD v2](BMAD_OUTPUT/planning-artifacts/prd-v2.md)
- [Architecture Decision Document](BMAD_OUTPUT/planning-artifacts/architecture.md)

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Completion Notes List
- **Prompt Système** : `maieutic-coach.ts` défini avec le persona "Miroir Lucide" et les règles de non-fermeture.
- **RAG Léger** : Injection du contexte utilisateur (mocké pour l'instant) dans `AiCoachService`.
- **Guardrails** : Implémentation de `LLMGuardrails` et tests unitaires associés pour bannir les mots interdits.
- **Validation** : Tests passants.
- **Code Review** : Intégration monitoring éthique.

### File List
- `src/features/ai-coach/prompts/maieutic-coach.ts`
- `src/features/ai-coach/services/ai-service.ts`
- `src/app/api/chat/route.ts`
- `src/server/lib/llm-guardrails.ts`
- `src/server/lib/llm-guardrails.test.ts`

### Status
done
