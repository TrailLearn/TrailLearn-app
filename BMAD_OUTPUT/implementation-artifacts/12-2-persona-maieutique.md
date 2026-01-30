# Story 12.2: Persona Maïeutique (System Prompt)

Status: done

## Story

As a utilisateur cherchant du sens,
I want que l'IA me pose des questions plutôt que de me donner des ordres,
So that je construise ma propre solution.

## Acceptance Criteria

1. [x] **Given** le prompt système du Mentor, **When** l'IA génère une réponse, **Then** elle n'utilise jamais d'impératifs prescriptifs ("Tu dois", "Il faut"). [Source: epics.md#Story 12.2]
2. [x] **And** elle privilégie les questions ouvertes ("Qu'est-ce qui te fait dire ça ?"). [Source: epics.md#Story 12.2]
3. [x] **And** des tests automatisés (Eval) vérifient le respect du ton bienveillant/interrogatif sur un jeu de scénarios types. [Source: epics.md#Story 12.2]

## Tasks / Subtasks

- [x] Task 1: System Prompt Engineering
  - [x] Refine `src/features/ai-coach/prompts/maieutic-coach.ts` (Added strict negative constraints).
  - [x] Implement the "Maieutic" rules (No advice, only questions).
- [x] Task 2: Automated Evaluation (Eval)
  - [x] Create a script `scripts/eval-persona.ts` using a cheap LLM to grade responses.
  - [x] Define test cases (Rupture, Indécision, Directive).
  - [x] Assert that response does NOT contain "You should" or "Il faut".

## Dev Notes

- **Prompting**: This is pure prompt engineering.
- **Eval**: Essential for maintaining quality over time.

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Completion Notes List
- Refined `maieutic-coach.ts` system prompt with explicit "NEGATIVE CONSTRAINTS" section to forbid imperatives.
- Created `scripts/eval-persona.ts` to automatically test the persona against 3 key scenarios.
- Verified 100% pass rate on evaluation script: no imperatives found, questions always present.

### File List
- `src/features/ai-coach/prompts/maieutic-coach.ts`
- `scripts/eval-persona.ts`