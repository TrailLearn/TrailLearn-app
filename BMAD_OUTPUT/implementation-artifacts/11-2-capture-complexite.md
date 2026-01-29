# Story 11.2: Capture de la Complexité Cognitive

Status: ready-for-dev

## Story

As a utilisateur,
I want indiquer mon besoin de structure versus mon besoin de chaos créatif,
So that les recommandations ne me piègent pas dans un cadre trop rigide ou trop flou.

## Acceptance Criteria

1. [ ] **Given** le formulaire de profil Être, **When** je positionne le curseur "Complexité Cognitive", **Then** la préférence est enregistrée. [Source: epics.md#Story 11.2]
2. [ ] **And** le système fournit un feedback immédiat sur l'environnement type correspondant (ex: "Vous aimez les règles claires" vs "Vous avez besoin d'improvisation"). [Source: epics.md#Story 11.2]
3. [ ] **And** cette métrique est injectée dans le contexte runtime du Mentor pour adapter son style de suggestion (Structuré vs Exploratoire). [Source: epics.md#Story 11.2]

## Tasks / Subtasks

- [ ] Task 1: Data Model Update
  - [ ] Update `UserProfile` schema to include `cognitiveComplexity` (Scale 1-10 or Enum).
  - [ ] Migration.
- [ ] Task 2: UI Implementation
  - [ ] Create `ComplexitySlider` component in `src/features/identity`.
  - [ ] Implement dynamic feedback text based on slider value.
- [ ] Task 3: Mentor Context Integration
  - [ ] Update `AiCoachService` system prompt builder to include complexity preference description.
  - [ ] Verify prompt generation with unit test.

## Dev Notes

- **UX**: The slider should be intuitive. Left = Order/Structure, Right = Chaos/Freedom.
- **Ai Integration**: This directly affects the `system` message sent to the LLM. "User prefers structured answers" vs "User prefers open-ended exploration".

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List