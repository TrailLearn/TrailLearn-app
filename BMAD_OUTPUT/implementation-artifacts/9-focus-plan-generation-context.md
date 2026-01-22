---
id: "9-focus-plan-generation-context"
title: "Enhance Plan Generation with Chat Context"
status: "Completed"
priority: "High"
type: "Enhancement"
---

# User Story
As a user, when I click "Generate Plan" in the Focus Dashboard, I want the generated tasks to be based on my recent conversations with the AI Coach, not just static DVP data, so that the plan reflects my specific discussions and needs.

# Acceptance Criteria
- [x] **Context Retrieval:** The generation logic retrieves recent chat history (e.g., last 10 messages).
- [x] **AI Processing:** An LLM call is used to extract tasks from this chat history + DVP data.
- [x] **Task Creation:** The extracted tasks are saved to the database.
- [x] **Fallback:** If chat history is empty/irrelevant, fallback to DVP-based generation.

# Tasks
- [x] **Backend:** Update `execution.generatePlan` to fetch `ChatMessage` history. <!-- id: 1 -->
- [x] **Backend:** Implement `generatePlanFromContext` function (LLM call) in `ai-service.ts` or similar. <!-- id: 2 -->
- [x] **Backend:** Integrate the LLM call into `execution.generatePlan` procedure. <!-- id: 3 -->

## Dev Agent Record
- [x] Planning: Created story.
- [x] AI Service: Added `generatePlanFromContext` using `generateText` with strict JSON instructions.
- [x] Execution Router: Updated `generatePlan` to fetch chat history and use the new AI service method, falling back to DVP heuristics if needed.