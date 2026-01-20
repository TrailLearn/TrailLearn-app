# Story 10.1: Versioning des Règles d'Indice (Back-Office)

Status: ready-for-dev

## Story

As an Admin,
I want to update a calculation rule by creating a new version,
So that I don't break existing historical DVP records.

## Acceptance Criteria

1. [ ] **Given** a rule modification in the admin panel, **When** I save, **Then** a new entry is created in the `RuleVersion` table and becomes the default for future calculations. [Source: epics.md#Story 10.1]

## Tasks / Subtasks

- [ ] Task 1: Admin Rule Editor
  - [ ] Extend existing admin back-office to support `ClarityIndex` rules.
- [ ] Task 2: Versioning Mechanism
  - [ ] Implement the logic to create new `RuleVersion` records instead of overwriting.

## Dev Notes

## Dev Agent Record

### Status
ready-for-dev
