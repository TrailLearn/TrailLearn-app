# Story 4.6: Cockpit Refinement (White-box, History, Auth)

Status: done

## Story

As a user,
I want a transparent explanation of my DVP score, a clickable history, and a seamless login experience,
so that I can fully understand my risks and navigate the application efficiently.

## Acceptance Criteria

1.  **White-box Explanation (Story 3.4)**:
    *   Add a dedicated "Factors & Risks" (White-box) section in the Cockpit.
    *   Display the specific rules triggered (e.g., "Rent too high > 40% budget").
    *   Do NOT rely solely on the Budget Card. The explanation must be explicit text/list.
2.  **History Interactivity**:
    *   Make history items clickable.
    *   On click, open a detailed view (Sheet or Modal) showing the snapshot's score, status, and *findings* (the white-box explanation for that past date).
3.  **DVP vs. What-If Consistency**:
    *   If all pillars are complete but status is DRAFT, show a "Validate my DVP" CTA instead of "In progress" warning.
    *   Clearly label the main Cockpit view as "Official Data".
    *   Ensure What-If simulator is visually distinct (already done via Tabs, but verify labeling).
4.  **Auth Redirection**:
    *   After successful login, automatically redirect to `/dashboard`.

## Tasks / Subtasks

- [x] Auth Redirection (AC: 4)
  - [x] Update `src/features/auth/components/sign-in-form.tsx` to use `/dashboard` as default callback.
- [x] White-box UI (AC: 1)
  - [x] Create `FindingsList` component to list all triggers clearly.
  - [x] Integrate `FindingsList` into `CockpitPage` below the gauge.
- [x] History Details (AC: 2)
  - [x] Create `HistoryDetailsSheet` component.
  - [x] Update `AnalysisHistoryList` to trigger this sheet on row click.
- [x] DVP Status Logic (AC: 3)
  - [x] In `CockpitPage`, detect complete DRAFT and show "Valider mon Dossier" CTA.
  - [x] Explicitly label the Cockpit as "Données Officielles".

## Dev Notes

- **Findings**: The `viabilityResult.findings` array contains the white-box data.
- **UI**: Using `Sheet` for history details provides a consistent side-panel experience.

### References

- [Source: User Feedback 2026-01-19]

## Dev Agent Record

### Agent Model Used
Amelia (Dev Agent)

### File List
- `src/features/auth/components/sign-in-form.tsx` (Modified)
- `src/features/dvp/components/findings-list.tsx` (Created)
- `src/features/dvp/components/history-details-sheet.tsx` (Created)
- `src/features/dvp/components/analysis-history-list.tsx` (Modified)
- `src/app/dvp/cockpit/page.tsx` (Modified)
- `src/features/dvp/components/__tests__/analysis-history-list.test.tsx` (Modified)

### Completion Notes
- **White-box**: Implemented `FindingsList` to provide clear, categorized justifications for the DVP score.
- **Interactivity**: History items are now clickable buttons that open a `HistoryDetailsSheet` with full snapshot details.
- **Consistency**: The Cockpit now clearly distinguishes "Données Officielles" and provides a "Valider" CTA when the dossier is ready.
- **Auth**: Redirection after login is now consistently targeting `/dashboard`.
- **Quality**: Type-checking and unit tests pass.