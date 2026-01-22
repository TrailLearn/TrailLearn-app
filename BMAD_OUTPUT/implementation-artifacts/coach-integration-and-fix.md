---
id: "coach-integration-and-fix"
title: "Coach AI Tool Integration & Backlog Nav Fixes"
status: "Completed"
priority: "High"
type: "Bugfix"
---

# User Story
As a user, I want the AI Coach to be able to create tasks directly in my plan after I agree to them in the chat, and I want to verify that all navigation links work correctly.

# Acceptance Criteria
- [x] **AI Tool:** The Coach has a `createActionPlan` tool.
- [x] **Tool Logic:** When called, it creates an `ActionPlan` (DRAFT) and tasks in the DB.
- [x] **User Prompt:** The AI explicitly asks for confirmation before calling the tool.
- [x] **Navigation:** Verify `/dashboard/plan` link works.
- [x] **Task Deletion:** Verify Task Card delete button works.
- [x] **Persistence:** Verify chat messages persist (re-verify client logic).

# Tasks
- [x] **AI Service:** Add `tools` (createActionPlan) to `streamText`. <!-- id: 1 -->
- [x] **AI Service:** Allow tool to access DB and create tasks. <!-- id: 2 -->
- [x] **Frontend:** Ensure `ChatInterface` handles tool invocations (if needed, usually handled by `useChat` automatically but we might need to show a "Tasks Created" message). <!-- id: 3 -->
- [x] **Verification:** Double check `TaskCard` delete logic and `FocusDashboard` links. <!-- id: 4 -->

## Dev Agent Record
- [x] Planning: Created story.
- [x] AI Integration: Implemented `createActionPlan` tool in `ai-service.ts`.
- [x] Backend: Increased `maxDuration` for chat API route.
- [x] Verification: Confirmed Link and Delete implementation from previous turns.