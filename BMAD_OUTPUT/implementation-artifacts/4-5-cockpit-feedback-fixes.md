# Story 4.5: Cockpit Feedback Fixes (History & Navigation)

Status: review

## Story

As a étudiant,
I want to see my analysis history and navigate consistently within the Cockpit,
so that I can track my progress and easily move between application sections.

## Acceptance Criteria

1.  **Cockpit History Section**:
    *   Display a list of previous DVP analyses (snapshots) on the Cockpit page.
    *   Show date and overall result (score/status) for each snapshot.
    *   Order by date descending.
    *   (V1 Scope: Just the list display is sufficient).
2.  **Consistent Navigation**:
    *   Ensure the global navigation (Dashboard / Mon DVP / Cockpit) is visible and consistent on the Cockpit page.
    *   Fix any layout regression where the sidebar might be replacing the global nav incorrectly or creating an isolated experience.
    *   Align with the main application shell layout.
    *   **Mobile Support**: Ensure navigation is accessible on mobile devices.

## Tasks / Subtasks

- [x] History Component (AC: 1)
  - [x] Create `AnalysisHistoryList` component.
  - [x] Implement TRPC query to fetch past `DvpRecord` snapshots for the current user/project.
  - [x] Integrate `AnalysisHistoryList` into `src/app/dvp/cockpit/page.tsx`.
- [x] Navigation Fix (AC: 2)
  - [x] Review `src/app/dvp/cockpit/layout.tsx` (if exists) or `page.tsx` usage of Layouts.
  - [x] Ensure it uses the standard Dashboard/App Shell layout (`src/app/layout.tsx` or similar shared shell).
  - [x] Verify links to "Dashboard", "Mon DVP", "Cockpit" are present and working.
- [x] Review Follow-ups (AI)
  - [x] [AI-Review][High] Mobile Regression: Add mobile navigation (Sheet) in `src/app/dvp/cockpit/layout.tsx`.
  - [x] [AI-Review][High] Type Safety: Validate `calculationResult` in `AnalysisHistoryList.tsx`.
  - [x] [AI-Review][Medium] Layout Alignment: Align sidebar with AppNavbar container.
  - [x] [AI-Review][Low] Loading State: Use Skeleton for loading history.
  - [x] [AI-Review][Low] Documentation: Update File List with `sprint-status.yaml`.

## Dev Notes

- **Ref Story 3.3**: Use the snapshot data structure established there.
- **Ref Story 4.1**: Modify the existing Cockpit page.
- **UX**: Keep it clean. The history can be a simple card or list below the main gauges.

### References

- [Source: User Feedback Session 2026-01-19]

## Dev Agent Record

### Agent Model Used
Amelia (Dev Agent)

### File List
- `src/server/api/routers/dvp.ts` (Modified: Added `getHistory`)
- `src/features/dvp/components/analysis-history-list.tsx` (Created)
- `src/features/dvp/components/__tests__/analysis-history-list.test.tsx` (Created)
- `src/app/dvp/cockpit/layout.tsx` (Modified: Fixed navigation & mobile support)
- `src/app/dvp/cockpit/page.tsx` (Modified: Added history list)
- `BMAD_OUTPUT/implementation-artifacts/sprint-status.yaml` (Modified: Status update)

### Completion Notes
- Implemented `getHistory` tRPC procedure to fetch user's DVP snapshots.
- Created `AnalysisHistoryList` component with date and status formatting.
- Fixed Cockpit layout by adding `AppNavbar` and adjusting sidebar positioning.
- Added comprehensive unit tests for the history component.
- **Review Fixes**: Added mobile menu (Sheet), fixed layout alignment, improved type safety, and added loading skeletons.
