# Story 11.1: Configuration du Taux de Renouvellement Vital (TRV)

Status: done

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
  - [x] Create `TrvSelector` component in `src/features/identity/components`.
  - [x] Implement TRV options (e.g., 6 months, 1 year, 3 years, 5 years, Stability).
  - [x] Connect to `updateProfile` TRPC procedure.
- [x] Task 3: Context Service Exposure
  - [x] Ensure `ContextService.getUserContext` includes TRV data.
  - [x] Add unit test to verify TRV retrieval.

## Senior Developer Review (AI)
- **Review Outcome**: Approved (after fixes)
- **Review Date**: 2026-01-29
- **Feedback**:
    - **TRV UX**: Manque de feedback explicite sur la sauvegarde (Auto-save invisible). -> FIXED (Added Saving indicator).
    - **Onboarding**: Absence de flux d'onboarding obligatoire pour garantir que le profil est rempli. -> FIXED (Infrastructure + Page + Middleware).
    - **Code Quality**: Middleware security gaps and error handling. -> FIXED.

## Tasks / Subtasks → Review Follow-ups (AI)

- [x] [AI-Review][High] **TRV Auto-save Feedback**:
    - [x] Ajouter un indicateur visuel (Saving... / Saved) ou un Toast lors de la sélection.
    - [x] Gérer l'état d'erreur visuellement.
- [x] [AI-Review][High] **Onboarding Infrastructure**:
    - [x] **Schema**: Ajouter `onboardingStatus` (enum: PENDING, COMPLETED) et `onboardingVersion` (int) au modèle `User` (ou `BeingProfile`).
    - [x] **Page**: Créer la page `src/app/onboarding/page.tsx`.
    - [x] **Redirection**: Implémenter un Guard (Middleware ou Layout) qui redirige vers `/onboarding` si `onboardingStatus !== COMPLETED`.
    - [x] **Integration**: Intégrer le `TrvSelector` (et autres futurs composants) dans ce flux d'onboarding.
- [x] [AI-Review][High] **Code Review Fixes**:
    - [x] **Middleware**: Added `/onboarding` protection.
    - [x] **Error Handling**: Added toast on save error.
    - [x] **Security**: Expanded middleware matcher to `/admin`.

## Dev Notes

- **Architecture**: Part of Epic 11 "Identity & Deep Profile". TRV is a core "Being" metric.
- **Data**: TRV should be an Enum or a structured object to allow calculation logic later (e.g., duration in months).
- **UX**: Use a slider or card selection, not a dry dropdown. Explain what TRV means to the user ("Votre rythme naturel").
- **Onboarding Strategy**:
    - Versioning is smart: allows us to force users back to onboarding if we add critical fields later (e.g. bump version from 1 to 2 -> guard checks if user.version < 2 -> redirect).
    - For MVP, just redirect if `!onboardingCompleted`.

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Debug Log References

### Completion Notes List
- Updated Prisma schema with `trvFrequency`, `trvLabel`, `onboardingStatus`, and `onboardingVersion`.
- Created `TrvSelector` with explicit auto-save feedback (`isSaving` prop).
- Implemented `/onboarding` page with multi-step support.
- Updated `middleware.ts` with a global guard for dashboard routes.
- Updated NextAuth session to include onboarding metadata for real-time guarding.
- Integrated `ContextService` to unify profile data access.
- All tests passing (74 tests).

### File List
- `prisma/schema.prisma`
- `prisma/migrations/*`
- `src/features/being-profile/types.ts`
- `src/features/being-profile/components/trv-selector.tsx`
- `src/features/being-profile/components/being-profile-section.tsx`
- `src/features/being-profile/services/context-service.ts`
- `src/server/api/routers/being-profile.ts`
- `src/server/api/routers/user.ts`
- `src/server/api/root.ts`
- `src/server/auth/config.ts`
- `src/middleware.ts`
- `src/app/onboarding/page.tsx`
- `src/app/dashboard/profile/page.tsx`
- `src/app/api/chat/route.ts`
- `src/features/ai-coach/services/ai-service.ts`
- `tests/unit/features/being-profile/TrvSelector.test.tsx`
- `tests/unit/features/being-profile/context-service.test.ts`
- `src/app/api/chat/route.test.ts`
- `src/server/api/routers/__tests__/admin-role.test.ts`