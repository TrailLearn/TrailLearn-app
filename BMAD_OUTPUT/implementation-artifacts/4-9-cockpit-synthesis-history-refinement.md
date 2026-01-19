# Story 4.9: Cockpit & History Stabilization (UX/Perf/Data)

Status: done

## Story

As a user,
I want a fast, clear, and consistent experience in the Cockpit and History,
so that I can easily verify my data, understand my official results, and access past analyses without confusion.

## Acceptance Criteria

1.  **Cockpit Performance (UX)**:
    *   **Caching**: Configured `staleTime: 5mins` for DVP queries to prevent refetching on focus.
    *   **Loading**: Implemented `CockpitSkeleton` for a polished loading experience.
2.  **Synthesis Navigation (UX)**:
    *   **Clickable Cards**: `PillarStatusCard` now supports links. Clicking redirects to the correct Wizard step.
3.  **Completeness Logic (Bug)**:
    *   Verified `getDvpCompleteness`. Corrected display logic in Cockpit to show progress accurately.
4.  **History Consistency & Detail (Data)**:
    *   **Source**: History now strictly filters for `COMPLETED` snapshots.
    *   **Content**: Each item displays Destination, Study Type, and Budget.
5.  **Diagnostic Display (Logic)**:
    *   **Official Data**: The main Gauge now strictly uses the `getLastSnapshot` (Certified data).
    *   **Draft Tracking**: If a newer Draft exists, a "Update Analysis" CTA is shown to the user.

## Tasks / Subtasks

- [x] **Backend Refactoring**
  - [x] Added `getLastSnapshot` to `dvpRouter`.
  - [x] Updated `getHistory` to return `data` field.
- [x] **Cockpit Page Overhaul**
  - [x] Implemented dual-fetching (Snapshot + Draft).
  - [x] Added `staleTime` caching.
  - [x] Integrated `CockpitSkeleton`.
- [x] **Synthesis / Status Cards**
  - [x] Updated `PillarStatusCard` with `href` and hover effects.
- [x] **History List Improvement**
  - [x] Enhanced `AnalysisHistoryList` with rich metadata (City, School, Budget).

## Dev Notes

- **UX Improvement**: The separation of "Certified Analysis" vs "Current Draft" removes all ambiguity about which data is being displayed in the gauge.
- **Perf**: Skeletons and caching significantly improve perceived speed.

### References

- [Source: User Feedback Stabilization #2]

## Dev Agent Record

### Agent Model Used
Amelia (Dev Agent)

### File List
- `src/server/api/routers/dvp.ts` (Modified: Added `getLastSnapshot`)
- `src/features/dvp/components/cockpit-skeleton.tsx` (Created)
- `src/features/dvp/components/pillar-status-card.tsx` (Modified: Added link support)
- `src/features/dvp/components/analysis-history-list.tsx` (Modified: Metadata display)
- `src/app/dvp/cockpit/page.tsx` (Modified: Overhauled logic and UI)

### Completion Notes
- The Cockpit is now a robust "Command Center" that distinguishes between official certified results and the ongoing draft.
- Navigation is seamless with clickable summary cards.
- Performance issues (loading flicker) resolved via caching and skeletons.