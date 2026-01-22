---
id: "9-2-focus-dashboard-backlog"
title: "Implement Full Backlog & Plan View"
status: "Completed"
priority: "High"
type: "Feature"
---

# User Story
As a user, I want to view my full Action Plan (Backlog), so that I can see all upcoming tasks, not just the top 3 priorities.

# Acceptance Criteria
- [x] **Backlog Page:** A dedicated page `/dashboard/plan` exists.
- [x] **Task List:** Displays all tasks sorted by creation date or priority.
- [x] **Navigation:** "Voir tout le backlog" link in Focus Mode works.
- [x] **Navbar:** "Plan" link added to main navigation.
- [x] **Task Management:** User can add new tasks manually in the backlog view.

# Tasks
- [x] **UI - Plan Page:** Create `src/app/dashboard/plan/page.tsx` using `api.execution.getBacklog`. <!-- id: 1 -->
- [x] **UI - Task Creation:** Add a simple form/dialog to add tasks in Plan view. <!-- id: 2 -->
- [x] **UI - Focus Integration:** Update link in `focus/page.tsx`. <!-- id: 3 -->
- [x] **Navigation:** Update `app-navbar.tsx`. <!-- id: 4 -->

## Dev Agent Record
- [x] Planning: Created story.
- [x] Implementation:
    - Created `/dashboard/plan` with a full tasks table.
    - Added "Create Task" feature (Dialog + Mutation).
    - Fixed the dead link in `/dashboard/focus`.
    - Added "Plan" item in the global Navbar.