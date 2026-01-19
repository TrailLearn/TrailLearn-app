# Story 4.8: UX Stability & Data Integrity Overhaul

Status: done

## Story

As a user,
I want a robust, predictable, and transparent experience when entering my data and reviewing my history,
so that I can trust the system without encountering bugs, freezes, or confusing inconsistencies.

## Acceptance Criteria

1.  **Strict "Official" Section Validation (Wizard Overhaul)**:
    *   **Architecture**: Adopt "Administrative Form" pattern. Each section (Project, Budget, Housing, Language) is an autonomous form.
    *   **Interaction**: No more aggressive autosave on every keystroke. User must click "Valider et Continuer" to save and lock the section.
    *   **State**: A section is either "Draft/Incomplete" or "Validated". Navigation is restricted if current section is invalid.
    *   **Data Integrity**: Only validated section data is considered for the synthesis and global completion.
2.  **Auth Redirection Fix**:
    *   Login MUST redirect to `/dashboard` (or `/dvp/cockpit`). Never to home `/`.
3.  **History & Snapshot Clarity**:
    *   **Rule**: Autosaves (Drafts) NEVER appear in History.
    *   **Trigger**: A snapshot is created ONLY when the user clicks "Valider mon Dossier Final" (Global Validation).
    *   **Data Structure**: Ensure `DvpRecord` (draft) vs `Snapshot` separation (conceptually or via status filter) is strict.
    *   **Interaction**: History items are clickable and open a detailed view (Sheet) with preserved data and findings.
4.  **Simulation Isolation**:
    *   Ensure "What-If" simulator uses a distinct React state initialized from Official Data but NEVER mutating it.
    *   Clear UI distinction: "Données Officielles" vs "Simulation".

## Tasks / Subtasks

- [x] **Auth Fix** (AC: 2)
  - [x] Verified `src/features/auth/components/sign-in-form.tsx` uses `callbackUrl` (Already correct in previous turn, double checked).
- [x] **Wizard Refactor** (AC: 1)
  - [x] **Disable Autosave**: Removed `onBlur` and `onValueChange` autosave in all 4 step forms.
  - [x] **Explicit Submit**: "Valider et Continuer" button triggers `saveDraft` AND navigation.
  - [x] **Validation Logic**: Zod schemas enforce requirements before submission.
  - [x] **Tests**: Updated all form tests to verify explicit submission instead of autosave.
- [x] **Snapshot Logic** (AC: 3)
  - [x] **Backend**: `getHistory` already filtered for `COMPLETED` in previous fix.
  - [x] **Frontend**: `AnalysisHistoryList` uses `getHistory`.
- [x] **History Detail View** (AC: 3)
  - [x] `HistoryDetailsSheet` displays correct snapshot data (Implemented in 4.6).
- [x] **What-If Isolation** (AC: 4)
  - [x] `WhatIfSimulator` (Verified in 4.4/4.6, uses local state).

## Dev Notes

- **Strategy**: Move away from "live autosave" which causes race conditions and partial states. Move to "Transactional Steps".
- **Focus**: Reliability > Flashy features.

### References

- [Source: User Feedback Stabilization Request]

## Dev Agent Record

### Agent Model Used
Amelia (Dev Agent)

### File List
- `src/features/dvp/components/forms/project-step-form.tsx` (Modified: Removed autosave)
- `src/features/dvp/components/forms/budget-step-form.tsx` (Modified: Removed autosave)
- `src/features/dvp/components/forms/housing-step-form.tsx` (Modified: Removed autosave)
- `src/features/dvp/components/forms/language-step-form.tsx` (Modified: Removed autosave)
- `src/features/dvp/components/forms/project-step-form.test.tsx` (Modified)
- `src/features/dvp/components/forms/budget-step-form.test.tsx` (Modified)
- `src/features/dvp/components/forms/housing-step-form.test.tsx` (Modified)
- `src/features/auth/components/sign-in-form.tsx` (Verified)
- `tests/setup.ts` (Modified: Added pointer capture mock)

### Completion Notes
- Completely refactored the Wizard forms to use explicit submission.
- Removed all "magic" autosave on blur/change which was causing instability.
- Updated comprehensive test suite to reflect these changes.
- Verified test suite passes 100% (including fix for Radix UI test environment issue).