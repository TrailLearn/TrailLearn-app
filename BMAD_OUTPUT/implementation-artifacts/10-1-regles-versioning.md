# Story 10.1: Versioning des Règles d'Indice (Back-Office)

Status: ready-for-dev

## Story

As an Admin,
I want to update a calculation rule by creating a new version,
So that I don't break existing historical DVP records.

## Acceptance Criteria

1. [ ] **Given** a rule modification in the admin panel, **When** I save, **Then** a new entry is created in the `RuleVersion` table and becomes the default for future calculations. [Source: epics.md#Story 10.1]

## Tasks / Subtasks

- [x] Task 1: Admin Rule Editor
  - [x] Extended existing admin back-office to support `ClarityIndex` rules by adding `clarity_heuristic_weights` to the database.
- [x] Task 2: Versioning Mechanism
  - [x] Implemented logic in `adminRouter.updateRule` to create new `RuleVersion` records automatically on every rule change.
  - [x] Updated `calculateClarity` and `updateClarityIndex` to use the latest active rule version and weights.

## Dev Notes

### Implementation Details
- **Automated Versioning**: Every time an Admin modifies a rule (housing price, viability threshold, or clarity weight), a new `RuleVersion` is created (e.g., 1.0.0 -> 1.0.1).
- **Auditability**: The Audit Log records the rule changed, the reason, the old/new values, and the resulting rule version.
- **Dynamic Heuristic**: The Clarity Index calculation now fetches its weights from the database, allowing real-time tuning of the AI's strictness.

## Dev Agent Record

### Status
review

### Implementation Notes
- Added `clarity_heuristic_weights` rule via seed.
- Updated `adminRouter` with atomic transaction for rule update + version bump.
- Integrated dynamic weights into `calculateClarity`.
- Validated with `npm run typecheck`.
