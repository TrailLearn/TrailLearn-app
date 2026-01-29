# Story 11.2: Capture de la Complexité Cognitive

Status: done

## Story

As a utilisateur,
I want indiquer mon besoin de structure versus mon besoin de chaos créatif,
So that les recommandations ne me piègent pas dans un cadre trop rigide ou trop flou.

## Acceptance Criteria

1. [ ] **Given** le formulaire de profil Être, **When** je positionne le curseur "Complexité Cognitive", **Then** la préférence est enregistrée. [Source: epics.md#Story 11.2]
2. [ ] **And** le système fournit un feedback immédiat sur l'environnement type correspondant (ex: "Vous aimez les règles claires" vs "Vous avez besoin d'improvisation"). [Source: epics.md#Story 11.2]
3. [ ] **And** cette métrique est injectée dans le contexte runtime du Mentor pour adapter son style de suggestion (Structuré vs Exploratoire). [Source: epics.md#Story 11.2]

## Tasks / Subtasks

- [x] Task 1: Data Model Update
  - [x] Update `UserProfile` schema to include `cognitiveComplexity` (Mapped to `complexityLevel` in existing `BeingProfile` model).
  - [x] Migration (Already exists).
- [x] Task 2: UI Implementation
  - [x] Create `ComplexitySlider` component in `src/features/identity` (actually in `src/features/being-profile/components`).
  - [x] Implement dynamic feedback text based on slider value.
- [x] Task 3: Mentor Context Integration
  - [x] Update `AiCoachService` system prompt builder to include complexity preference description. (Handled via generic profile context injection in Story 11.1).
  - [x] Verify prompt generation with unit test. (Already covered by ContextService and existing tests).

## Dev Notes

- **UX**: The slider should be intuitive. Left = Order/Structure, Right = Chaos/Freedom.
- **Ai Integration**: This directly affects the `system` message sent to the LLM. "User prefers structured answers" vs "User prefers open-ended exploration".

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Completion Notes List
- Verified `complexityLevel` field exists in schema.
- Created `ComplexitySlider` component with dynamic feedback.
- Integrated `ComplexitySlider` into `BeingProfileSection`.
- Updated `beingProfileRouter` to support complexity updates via `updateProfile`.
- Verified context service exposes complexity data.
- Fixed TypeScript errors.
- **Code Review**: Extracted magic numbers in `ComplexitySlider` and added integration test for `BeingProfileSection`.

### File List
- `src/features/being-profile/components/complexity-slider.tsx`
- `src/features/being-profile/components/being-profile-section.tsx`
- `src/server/api/routers/being-profile.ts`
- `tests/unit/features/being-profile/ComplexitySlider.test.tsx`
- `tests/unit/features/being-profile/BeingProfileSection.test.tsx`
- `tests/unit/features/being-profile/schema.test.ts`