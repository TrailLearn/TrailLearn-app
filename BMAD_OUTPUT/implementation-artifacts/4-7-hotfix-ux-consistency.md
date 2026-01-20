# Story 4.7: Hotfix UX & Data Consistency

Status: done

## Story

As a user,
I want a reliable and bug-free experience from login to analysis history,
so that I can trust the application's calculations and navigation.

## Acceptance Criteria

1.  **Auth Redirection Fix**:
    *   Ensure login redirects to `/dashboard`.
2.  **Wizard Stability**:
    *   **Budget Form**: Fixed interactive issues on first load.
    *   **"Next" Button**: Fixed double-click requirement. Added loading state.
3.  **Completeness Logic Fix**:
    *   **Language/Housing**: Refactored logic to be more robust (safe access, proper null/empty checks).
    *   **Synthesis**: Real-time DVP JSON state is now correctly reflected.
4.  **History Noise Reduction**:
    *   **Snapshot Logic**: `getHistory` now strictly returns COMPLETED records.
    *   `getLatest` prioritized DRAFT records to ensure single copy editing.
5.  **History Details Consistency**:
    *   Snapshots now correctly link to their results.

## Tasks / Subtasks

- [x] Auth Redirection (AC: 1)
  - [x] Verified `sign-in-form.tsx` uses `/dashboard`.
- [x] Wizard Form Fixes (AC: 2, 3)
  - [x] **Budget**: Removed blocking disabled state, ensured reset from DB data.
  - [x] **Navigation**: Added `isSubmitting` to buttons in Project and Budget forms.
  - [x] **Completeness**: Updated `getDvpCompleteness.ts` with safer checks.
- [x] History Logic Refactor (AC: 4, 5)
  - [x] **Backend**: Updated `dvpRouter.getLatest` and `dvpRouter.getHistory`.

## Dev Notes

- **Data Sync**: The logic now ensures a single DRAFT is maintained during the wizard. Multiple "Brouillon" entries in history are hidden by the `COMPLETED` filter in `getHistory`.
- **Navigation**: Use of `formState.isSubmitting` prevents double-click race conditions.

### References

- [Source: User Feedback Hotfix Session 2026-01-19]

## Dev Agent Record

### Agent Model Used
Amelia (Dev Agent)

### File List
- `src/features/dvp/components/forms/budget-step-form.tsx` (Modified)
- `src/features/dvp/components/forms/project-step-form.tsx` (Modified)
- `src/features/dvp/utils/dvp-completeness.ts` (Modified)
- `src/server/api/routers/dvp.ts` (Modified)
- `BMAD_OUTPUT/implementation-artifacts/sprint-status.yaml` (Modified)

### Completion Notes
- All reported UI/UX blockers have been addressed.
- Persistence logic refined to avoid history pollution.
- Type-checking and unit tests pass 100%.