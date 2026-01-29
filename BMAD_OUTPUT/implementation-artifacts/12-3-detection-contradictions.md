# Story 12.3: Détection de Contradictions (Triangulation)

Status: ready-for-dev

## Story

As a utilisateur confus,
I want que l'IA m'aide à voir mes incohérences,
So that je puisse aligner mes actes sur mes valeurs.

## Acceptance Criteria

1. [ ] **Given** une incohérence détectée entre le Profil (TRV/Complexité), l'Historique et le Message actuel, **When** l'IA intervient, **Then** elle formule explicitement la tension ("Je remarque que tu cherches X alors que ton profil indique Y"). [Source: epics.md#Story 12.3]
2. [ ] **And** elle demande systématiquement confirmation ("Est-ce que je me trompe ?") avant d'approfondir. [Source: epics.md#Story 12.3]

## Tasks / Subtasks

- [ ] Task 1: Context Injection
  - [ ] Ensure `AiCoachService` injects user Profile Data (TRV, Complexity) into the context.
- [ ] Task 2: Prompt Logic
  - [ ] Update System Prompt to instruct the AI to look for contradictions between User Profile and User Input.
  - [ ] Provide examples in few-shot prompting of how to gently point out contradictions.
- [ ] Task 3: Verification
  - [ ] Manual test case: User with "High Structure need" asks for "Chaos". AI should flag it.

## Dev Notes

- **Logic**: Rely on the LLM's reasoning capabilities, but provide the DATA (Profile) clearly in the system message.

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List