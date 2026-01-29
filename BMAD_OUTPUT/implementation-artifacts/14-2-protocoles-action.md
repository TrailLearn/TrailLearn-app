# Story 14.2: Génération de Protocoles d'Action (Quest Cards)

Status: ready-for-dev

## Story

As a voyageur actif,
I want une mission concrète à réaliser sur place,
So that je ne sois pas passif face à mon expérience.

## Acceptance Criteria

1. [ ] **Given** une destination validée, **When** je génère mon plan de voyage, **Then** une "Quest Card" est créée (ex: "Lancer un projet sous pseudonyme"). [Source: epics.md#Story 14.2]
2. [ ] **And** la mission est bornée dans le temps (ex: "Test sur 2 semaines") et explicitement réversible. [Source: epics.md#Story 14.2]
3. [ ] **And** une option "Abandonner la quête" est disponible à tout moment sans pénalité pour éviter la culpabilité. [Source: epics.md#Story 14.2]
4. [ ] **And** une question de clôture ("Qu'as-tu observé sur toi ?") est prévue pour la fin de la mission. [Source: epics.md#Story 14.2]

## Tasks / Subtasks

- [ ] Task 1: Quest Generation
  - [ ] Use LLM to generate specific quests based on the Hypothesis (Story 14.1).
  - [ ] Format: Objective, Duration, Exit Condition.
- [ ] Task 2: Data Model
  - [ ] Create `Quest` model (linked to `ActionPlan`?).
- [ ] Task 3: UI Implementation
  - [ ] Create `QuestCard` with "Abort" and "Complete" actions.
  - [ ] Implement "Reflection Modal" on completion.

## Dev Notes

- **Gamification**: It's a game with oneself. "Quest" terminology is intentional.

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List