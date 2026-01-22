---
id: "9-focus-refinement"
title: "Refine Focus Engine & Dashboard (Validation & Delete)"
status: "Completed"
priority: "High"
type: "Refactor"
---

# User Story
As a user, I want to review, edit (delete), and explicitly validate the Action Plan proposed by the Coach before committing to it, and I need a full view of my backlog.

# Acceptance Criteria
- [x] **Delete Task:** User can delete tasks from Focus View and Backlog View.
- [x] **Plan Validation:**
    - Generated plan starts in `DRAFT` state.
    - User must click "Validate" to activate Focus Mode.
    - "Plan Validé" badge only appears for `ACTIVE` plans.
- [x] **Coach Generation:** The generation action is framed as the Coach proposing a plan based on DVP.
- [x] **Backlog/Plan Page:** Verify `src/app/dashboard/plan/page.tsx` exists and has Delete functionality.

# Tasks
- [x] **Schema:** Add `status` (DRAFT/ACTIVE) to `ActionPlan`. <!-- id: 1 -->
- [x] **Backend:** Add `deleteTask` and `validatePlan` to `executionRouter`. <!-- id: 2 -->
- [x] **UI - TaskCard:** Add Delete button. <!-- id: 3 -->
- [x] **UI - Plan Page:** Add Delete button to table. <!-- id: 4 -->
- [x] **UI - Focus Page:** Implement "Draft vs Active" state with Validation button. <!-- id: 5 -->

## Dev Agent Record
- [x] Planning: Created story.
- [x] Schema: Added `PlanStatus` enum and field. Migrated DB.
- [x] Backend: Implemented logic for delete and validation.
- [x] UI:
    - Updated `TaskCard` with trash icon (confirm dialog).
    - Updated `PlanPage` with delete action.
    - Updated `FocusDashboard` to handle `DRAFT` state with a specific banner "Proposition de Plan d'Action" and "Valider" button.