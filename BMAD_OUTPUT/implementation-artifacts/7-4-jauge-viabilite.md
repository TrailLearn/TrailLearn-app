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

- [ ] Task 1: Implement `ViabilityGauge` Component
  - [ ] Create `src/features/ai-coach/components/viability-gauge.tsx` using shadcn/ui Progress or a custom SVG arc.
- [ ] Task 2: Implement `InsightCard` Component
  - [ ] Create `src/features/ai-coach/components/insight-card.tsx` to display "White Box" explanations.
- [ ] Task 3: Real-time UI Update
  - [ ] Integrate TanStack Query (SWR) or SSE to update the gauge when the index changes.
- [ ] Task 4: Responsiveness & Accessibility
  - [ ] Verify mobile layout and add ARIA labels.

## Dev Notes

### References
- [UX Design Specification](BMAD_OUTPUT/planning-artifacts/ux-design-specification.md)

## Dev Agent Record

### Status
ready-for-dev
