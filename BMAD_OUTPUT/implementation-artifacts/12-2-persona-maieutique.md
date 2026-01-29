# Story 12.2: Persona Maïeutique (System Prompt)

Status: ready-for-dev

## Story

As a utilisateur cherchant du sens,
I want que l'IA me pose des questions plutôt que de me donner des ordres,
So that je construise ma propre solution.

## Acceptance Criteria

1. [ ] **Given** le prompt système du Mentor, **When** l'IA génère une réponse, **Then** elle n'utilise jamais d'impératifs prescriptifs ("Tu dois", "Il faut"). [Source: epics.md#Story 12.2]
2. [ ] **And** elle privilégie les questions ouvertes ("Qu'est-ce qui te fait dire ça ?"). [Source: epics.md#Story 12.2]
3. [ ] **And** des tests automatisés (Eval) vérifient le respect du ton bienveillant/interrogatif sur un jeu de scénarios types. [Source: epics.md#Story 12.2]

## Tasks / Subtasks

- [ ] Task 1: System Prompt Engineering
  - [ ] Refine `src/features/ai-coach/prompts/system-prompt.ts`.
  - [ ] Implement the "Maieutic" rules (No advice, only questions).
- [ ] Task 2: Automated Evaluation (Eval)
  - [ ] Create a script `scripts/eval-persona.ts` using a cheap LLM to grade responses.
  - [ ] Define test cases (e.g., "I want to quit my job").
  - [ ] Assert that response does NOT contain "You should" or "Il faut".

## Dev Notes

- **Prompting**: This is pure prompt engineering.
- **Eval**: Essential for maintaining quality over time.

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List