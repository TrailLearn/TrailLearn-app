# Story 5.0: Admin Business Rules Management

Status: done

## Story

As an administrator,
I want to view, edit, and audit business rules (thresholds, costs),
so that the DVP calculations remain accurate and verifiable over time.

## Acceptance Criteria

1.  **Admin Dashboard (Story 5.1)**:
    *   Secure route `/admin` (protected by Role=ADMIN).
    *   List all `BusinessRule` entries grouped by category (Budget, Housing, etc.).
    *   Display Key, Current Value, and Last Updated Date.
2.  **Edit Rules (Story 5.2)**:
    *   Interface to modify the `value` of a rule.
    *   Validation of data types (number, JSON).
    *   Confirmation dialog before saving.
3.  **Audit Trail (Story 5.3)**:
    *   When updating a rule, require a "Justification/Reason" (e.g., "Annual Indexation").
    *   Store the update in a history/audit table or log (implied by `updatedBy` and `version` or separate table).
    *   For V1, updating `updatedBy` and potentially keeping a log in a separate `AuditLog` model or simplified versioning is sufficient. Let's create an `AuditLog` model.

## Tasks / Subtasks

- [x] Database Schema
  - [x] Add `AuditLog` model to `schema.prisma` (id, entityType, entityId, action, diff, userId, createdAt).
  - [x] Run migration.
- [x] Backend API (TRPC)
  - [x] Create `admin` router.
  - [x] `getAllRules`: Fetch all rules.
  - [x] `updateRule`: Update rule value + Create AuditLog entry. Require `reason` input.
- [x] Frontend Admin UI
  - [x] Create `/admin` layout and page.
  - [x] Implement `RulesTable` component.
  - [x] Implement `EditRuleDialog` component with "Reason" field.
  - [x] Connect to TRPC `admin.updateRule`.

## Dev Notes

- **Security**: Ensure `protectedProcedure` checks for `ctx.session.user.role === 'ADMIN'`.
- **UI**: Use `shadcn/ui` Table, Dialog, and Form.

### References

- [Source: Epic 5]

## Dev Agent Record

### Agent Model Used
Amelia (Dev Agent)

### File List
- `prisma/schema.prisma` (Modified: Added AuditLog)
- `src/server/api/routers/admin.ts` (Created)
- `src/server/api/root.ts` (Modified: Added admin router)
- `src/app/admin/layout.tsx` (Created)
- `src/app/admin/page.tsx` (Created)
- `src/features/admin/components/rules-table.tsx` (Created)
- `src/features/admin/components/edit-rule-dialog.tsx` (Created)

### Completion Notes
- Implemented full Admin Dashboard with secure access.
- Audit Log mechanism tracks all changes with justifications.
- UI built with shadcn/ui components.
