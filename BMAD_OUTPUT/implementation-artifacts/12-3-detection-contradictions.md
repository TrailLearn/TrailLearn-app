# Story 12.3: Détection de Contradictions (Triangulation)

Status: done

## Story

As a utilisateur confus,
I want que l'IA m'aide à voir mes incohérences,
So that je puisse aligner mes actes sur mes valeurs.

## Acceptance Criteria

1. [x] **Given** une incohérence détectée entre le Profil (TRV/Complexité), l'Historique et le Message actuel, **When** l'IA intervient, **Then** elle formule explicitement la tension ("Je remarque que tu cherches X alors que ton profil indique Y"). [Source: epics.md#Story 12.3]
2. [x] **And** elle demande systématiquement confirmation ("Est-ce que je me trompe ?") avant d'approfondir. [Source: epics.md#Story 12.3]

## Tasks / Subtasks

- [x] Task 1: Context Injection
  - [x] Ensure `AiCoachService` injects user Profile Data. (Verified in `src/app/api/chat/route.ts` and `ContextService`).
- [x] Task 2: Prompt Logic
  - [x] Update System Prompt to instruct the AI to look for contradictions between User Profile and User Input.
  - [x] Provide examples in few-shot prompting of how to gently point out contradictions.
  - [x] Add mandatory validation question rule ("Est-ce que je me trompe ?").
- [x] Task 3: Verification
  - [x] Manual test case: User with "High Structure need" asks for "Chaos". AI should flag it. (Validated via `scripts/eval-contradiction.ts`).

## Dev Notes

- **Logic**: Rely on the LLM's reasoning capabilities, but provide the DATA (Profile) clearly in the system message.

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Completion Notes List
- Updated `maieutic-coach.ts` to include the "Miroir de Contradiction (TRIANGULATION)" tool with strict instructions to cross-reference Profile Data vs User Input.
- Added explicit rule to always ask for validation ("Est-ce que je me trompe ?") when pointing out a tension.
- Verified context injection mechanism works correctly.
- Validated logic with `scripts/eval-contradiction.ts` which successfully simulated a Profile/Input mismatch.

### Code Review Fixes (2026-01-30)
- Added "Let Go" (Lâcher prise) rule to System Prompt to prevent AI from arguing if user rejects the contradiction.
- Ensured humble stance is maintained even after contradiction detection.

### File List
- `src/features/ai-coach/prompts/maieutic-coach.ts`
- `scripts/eval-contradiction.ts`