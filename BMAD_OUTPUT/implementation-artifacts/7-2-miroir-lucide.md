# Story 7.2: Le Miroir Lucide (Prompt System & Contradictions)

Status: ready-for-dev

## Story

As a student,
I want the AI Coach to identify my project contradictions (e.g. budget vs ambition),
So that I can consciously deliberate on my choices without being judged.

## Acceptance Criteria

1. [ ] **Given** a contradictory intention (e.g. 5k€ budget for USA top school), **When** the AI responds, **Then** it must highlight the tension using conditional language and avoid definitive rejection verbs ("Impossible", "Rejected"). [Source: epics.md#Story 7.2]
2. [ ] **And** the system prompt incorporates the "Non-Closure" principle from the ethical guardrails. [Source: prd-v2.md#Ethical Guardrails]
3. [ ] **And** the AI Coach has access to the user's current DVP data (RAG context). [Source: architecture.md#Core AI Architecture]

## Tasks / Subtasks

- [ ] Task 1: Define System Prompts
  - [ ] Create `src/features/ai-coach/prompts/maieutic-coach.ts`.
  - [ ] Implement the "Miroir Lucide" persona with strict instructions on conditional language.
- [ ] Task 2: Context Injection (RAG)
  - [ ] Implement a service to fetch the user's current DVP record and inject it into the LLM context.
- [ ] Task 3: Ethical Guardrails Implementation
  - [ ] Implement `src/server/lib/llm-guardrails.ts` to post-process AI outputs and filter forbidden definitive terms.
- [ ] Task 4: Testing & Validation
  - [ ] Create a "Stress Test" script with the "Rêveur Paresseux" and "Incohérent Géographique" scenarios.
  - [ ] Verify that no definitive rejection verbs are generated.

## Dev Notes

### Architecture & Technical Stack
- **Context**: Light RAG (injecting DVP data into prompt).
- **Guardrails**: Text post-processing or strict system instructions.

### References
- [PRD v2](BMAD_OUTPUT/planning-artifacts/prd-v2.md)
- [Architecture Decision Document](BMAD_OUTPUT/planning-artifacts/architecture.md)

## Dev Agent Record

### Agent Model Used

### Status
ready-for-dev
