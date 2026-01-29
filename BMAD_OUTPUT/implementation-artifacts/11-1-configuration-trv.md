# Story 11.1: Configuration du Taux de Renouvellement Vital (TRV)

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a utilisateur introspectif,
I want définir mon besoin naturel de changement (TRV),
So that le système puisse évaluer si un projet à long terme est compatible avec mon énergie.

## Acceptance Criteria

1. [x] **Given** un utilisateur authentifié sur la page de profil étendu, **When** je sélectionne une fréquence de TRV (ex: "J'ai besoin de changer tous les 6 mois"), **Then** cette valeur est stockée dans `UserProfile`. [Source: epics.md#Story 11.1]
2. [x] **And** la donnée TRV est exposée via l'API interne (`ContextService`) pour être consommée par le moteur IKIGAI et le Mentor IA (pas de silo). [Source: epics.md#Story 11.1]

## Tasks / Subtasks

- [x] Task 1: Data Model Update
  - [x] Update `UserProfile` schema to include `trvFrequency` and `trvLabel`.
  - [x] Create migration and update Prisma client.
- [x] Task 2: TRV Selection UI
  - [x] Create `TrvSelector` component in `src/features/being-profile/components`.
  - [x] Implement TRV options (e.g., 6 months, 1 year, 3 years, 5 years, Stability).
  - [x] Connect to `updateProfile` TRPC procedure.
- [x] Task 3: Context Service Exposure
  - [x] Ensure `ContextService.getUserContext` includes TRV data.
  - [x] Add unit test to verify TRV retrieval.

## Dev Notes

- **Architecture**: Part of Epic 11 "Identity & Deep Profile". TRV is a core "Being" metric.
- **Data**: TRV should be an Enum or a structured object to allow calculation logic later (e.g., duration in months).
- **UX**: Use a slider or card selection, not a dry dropdown. Explain what TRV means to the user ("Votre rythme naturel").

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Debug Log References

### Completion Notes List
- Updated Prisma schema with `trvFrequency` and `trvLabel` in `BeingProfile`.
- Created `TrvSelector` and `BeingProfileSection` client components.
- Integrated `BeingProfileSection` into `/dashboard/profile` page.
- Implemented `ContextService` to unify profile data access.
- Updated AI Coach API route to inject `BeingProfile` context into LLM prompts.
- Fixed TypeScript `verbatimModuleSyntax` errors in existing files.
- All tests passing (73 tests).

### File List
- `prisma/schema.prisma`
- `src/features/being-profile/types.ts`
- `src/features/being-profile/components/trv-selector.tsx`
- `src/features/being-profile/components/being-profile-section.tsx`
- `src/features/being-profile/services/context-service.ts`
- `src/server/api/routers/being-profile.ts`
- `src/server/api/root.ts`
- `src/app/dashboard/profile/page.tsx`
- `src/app/api/chat/route.ts`
- `src/features/ai-coach/services/ai-service.ts`
- `tests/unit/features/being-profile/schema.test.ts`
- `tests/unit/features/being-profile/TrvSelector.test.tsx`
- `tests/unit/features/being-profile/context-service.test.ts`
- `src/app/api/chat/route.test.ts`
- `src/features/being-profile/engine/ikigai-engine.ts`
- `src/features/being-profile/engine/types.ts`
- `src/features/being-profile/engine/ikigai-engine.test.ts`