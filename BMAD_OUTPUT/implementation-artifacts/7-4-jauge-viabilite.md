# Story 7.4: Jauge de Viabilité & Insight Cards (UI)

Status: ready-for-dev

## Story

As a student,
I want to visualize my clarity index as a gauge with clear explanations,
So that I understand exactly why my project status changed.

## Acceptance Criteria

1. [ ] **Given** an index change, **When** the `ViabilityGauge` component renders, **Then** it displays the correct color code (RED/AMBER/GREEN) and an `InsightCard` provides the deterministic reason for the score. [Source: epics.md#Story 7.4]
2. [ ] **And** the UI supports "Mobile-First" interactions (Safari iOS / Chrome Android). [Source: prd-v2.md#Non-Functional Requirements]
3. [ ] **And** accessibility standards (WCAG 2.1 AA) are respected (ARIA labels for index values). [Source: ux-design-specification.md#Accessibility Strategy]

## Tasks / Subtasks

- [x] Task 1: Implement `ViabilityGauge` Component
  - [x] Create `src/features/ai-coach/components/viability-gauge.tsx` using shadcn/ui Progress.
- [x] Task 2: Implement `InsightCard` Component
  - [x] Create `src/features/ai-coach/components/insight-card.tsx` to display "White Box" explanations.
- [x] Task 3: Real-time UI Update
  - [x] Integrate TanStack Query to update the gauge when the index changes.
- [x] Task 4: Responsiveness & Accessibility
  - [x] Verify mobile layout and add ARIA labels.

## Dev Notes

### Implementation Details
- **Component**: `ViabilityGauge` uses shadcn `Progress` with dynamic color indicator based on thresholds.
- **Component**: `InsightCard` breaks down completion vs coherence and displays status per pillar.
- **Layout**: Sidebar layout on desktop, stacked on mobile.
- **Accessibility**: Added ARIA labels to gauge and progress indicators.

### References
- [UX Design Specification](BMAD_OUTPUT/planning-artifacts/ux-design-specification.md)

## Dev Agent Record

### Status
review

### Review Follow-ups (AI)
- [x] [AI-Review][High] Added unit tests for `ViabilityGauge` (`viability-gauge.test.tsx`).

### Completion Notes
- Installed `Progress` component from shadcn/ui.
- Created `ViabilityGauge` and `InsightCard` features.
- Updated `ChatPage` to display a diagnostic sidebar that refreshes automatically via tRPC invalidation (triggered by chat submission).
- Ensured responsive design (lg:grid-cols-4) and accessibility (aria-labels).
