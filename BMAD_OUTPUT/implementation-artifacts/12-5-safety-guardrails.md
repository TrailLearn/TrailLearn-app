# Story 12.5: Garde-fous et Safety Logs

Status: ready-for-dev

## Story

As a administrateur éthique,
I want tracer les dérapages potentiels ou les demandes hors-scope,
So that je puisse ajuster la sécurité du modèle.

## Acceptance Criteria

1. [ ] **Given** une tentative de l'utilisateur de détourner l'usage (Jailbreak) ou une demande dangereuse (Médical/Suicide), **When** le système détecte le risque, **Then** l'IA refuse de répondre (Refusal response). [Source: epics.md#Story 12.5]
2. [ ] **And** l'événement est loggué dans un journal "Safety" distinct avec la catégorie du risque (sans les données PII sensibles). [Source: epics.md#Story 12.5]

## Tasks / Subtasks

- [ ] Task 1: Prompt Injection Defense
  - [ ] Add instructions in System Prompt to refuse specific out-of-scope topics (Medical, Legal, Violence).
- [ ] Task 2: Safety Logger
  - [ ] Implement `SafetyLog` service/table.
  - [ ] Log "REFUSAL" events.
- [ ] Task 3: Detection Logic
  - [ ] Either use LLM to classify input as "UNSAFE" (Guardrail call) before main call, or parse refusal in output.
  - [ ] For MVP: Parse output. If AI says "I cannot answer", log it.

## Dev Notes

- **Architecture**: A separate "Guardrail" LLM call is safer but slower. For V1, System Prompt instructions + Output scanning is acceptable.

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List