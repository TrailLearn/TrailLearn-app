---
id: "9-1-focus-engine-fix"
title: "Fix Focus Engine & Action Plan Generation"
status: "Completed"
priority: "High"
type: "Bugfix"
---

# User Story
As a user, I want my Focus Dashboard to be populated with relevant tasks derived from my DVP-B, so that I know exactly what to do next.

# Acceptance Criteria
- [x] **Plan Generation:** A mechanism exists to generate the Action Plan from DVP-B (via Coach or explicit button).
- [x] **Task Population:** The Focus View displays generated tasks, respecting the "Focus Mode" limit (e.g., top 3).
- [x] **Empty State:** If no tasks exist, a clear Call-to-Action guides the user to the Coach or Plan Generation.
- [x] **Badge Logic:** "Plan Validé" badge is hidden if no plan exists.

# Tasks
- [x] **Backend - Action Plan Logic:** Implement `generateActionPlan` logic in `execution.ts` or `ai.ts` using DVP-B data. <!-- id: 1 -->
- [x] **Backend - TRPC:** Expose `generatePlan` procedure. <!-- id: 2 -->
- [x] **UI - Focus Page:**
    - [x] Add "Generate Plan" button in empty state.
    - [x] Fix badge visibility logic.
    - [x] Ensure tasks are fetched and displayed correctly. <!-- id: 3 -->
- [x] **Coach Integration:** (Optional/Bonus) Allow Coach to trigger generation. <!-- id: 4 -->

## Dev Agent Record
- [x] Planning: Created fix story.
- [x] Backend: Implemented `generatePlan` in `execution.ts`. It fetches the latest DVP and creates 3 smart tasks based on City, Budget, and Study Field.
- [x] UI: Updated `FocusDashboard` (`page.tsx`) to show "Générer mon Plan d'Action" button when empty, and hide the badge. Added direct link to Coach.