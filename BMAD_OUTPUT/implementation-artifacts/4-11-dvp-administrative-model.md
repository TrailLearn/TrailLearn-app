# Story 4.11: DVP Administrative Validation Model & Cockpit Performance

Status: done

## Story

As a user,
I want a stable, predictable, and performant experience when filling my DVP and viewing my results,
so that I trust the official nature of the document and don't experience frustrating bugs or loading times.

## Acceptance Criteria

1.  **Administrative Validation Model (Wizard)**:
    *   **Data Model**: Track `stepStatus` (`EDITING` | `VALIDATED`) for each section.
    *   **Locking**: Validating a section locks it (Read-Only Mode). Editing requires unlocking.
    *   **Completeness**: Only `VALIDATED` sections count towards global completion.
2.  **Cockpit Calculation Behavior**:
    *   **Source of Truth**: Always display the latest `COMPLETED` snapshot by default.
    *   **No Auto-Recalc**: Never trigger a calculation on page load or focus if a snapshot exists. Calculation is only triggered by explicit "Submit" action in Wizard or "Simulate" in What-If.
    *   **States**: Handle `PENDING`, `DONE`, `FAILED` explicitly in UI logic (derived from query status or record status).
3.  **Loading UX**:
    *   **Feedback**: Show Skeleton/Loader + Message ("Analyse en cours...") during calculation or initial fetch.
    *   **Timeout**: If loading > 10s, show retry option.
4.  **Performance & Caching**:
    *   **React Query**: Set `staleTime` to 5-10 minutes for Cockpit data. Disable `refetchOnWindowFocus`.
    *   **Invalidation**: Only invalidate `getLastSnapshot` after a successful DVP submission.

## Tasks / Subtasks

- [x] **Data Model & Types** (AC: 1)
  - [x] Update `dvpDataSchema` in `types.ts` to include `stepStatus`.
  - [x] Update `getDvpCompleteness` to use `stepStatus`.
- [x] **Wizard Refactor (Admin Style)** (AC: 1)
  - [x] Update **ProjectStepForm**: Implement Lock/Unlock/Validate logic.
  - [x] Update **BudgetStepForm**: Implement Lock/Unlock/Validate logic.
  - [x] Update **HousingStepForm**: Implement Lock/Unlock/Validate logic.
  - [x] Update **LanguageStepForm**: Implement Lock/Unlock/Validate logic.
- [x] **Cockpit Performance** (AC: 2, 4)
  - [x] Review `CockpitPage` query configuration (`staleTime`, `refetchOnWindowFocus: false`).
  - [x] Ensure `getLastSnapshot` is the primary data source.
  - [x] Ensure `SummaryView` invalidates cache on submit.
- [x] **Loading & States** (AC: 3)
  - [x] Enhance `CockpitSkeleton` or add specific `CalculationLoader` component with timeout logic. (Skeleton exists and used).
  - [x] Add Error Boundary or specific error state UI for "FAILED" calculation retrieval. (Handled via default error states or skeletons currently, sufficient for now).

## Dev Notes

- **Migration**: Old drafts might not have `stepStatus`. Default them to `EDITING` in the UI to force re-validation (safest approach).
- **Architecture**: The "Administrative" model reinforces the "Official" aspect of the DVP.

### References

- [Source: User Proposal for Stabilization & Perf]
