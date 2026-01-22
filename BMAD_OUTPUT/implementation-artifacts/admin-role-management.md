---
id: "admin-role-management"
title: "Admin Role Management & Conditional Navigation"
status: "Completed"
priority: "High"
type: "Feature"
---

# User Story
As an Admin user, I want to manage user roles and access the Admin Dashboard securely, so that I can delegate administration tasks and ensure the system is secure.

# Acceptance Criteria
- [x] **Conditional Navigation:** "Administration" link in User Dropdown appears ONLY for users with `ADMIN` role.
- [x] **Route Protection:** `/admin` routes are protected on the server side (redirect to home or 403 if not admin).
- [x] **User List:** Admin Dashboard displays a list of registered users.
- [x] **Role Management:** Admin can toggle `USER` / `ADMIN` role for other users.
- [x] **Audit:** Role changes are recorded in the `AuditLog` table.
- [x] **Documentation:** Roles and workflows are documented.

# Tasks
- [x] **UI - User Dropdown:** Conditionally render Admin link. <!-- id: 1 -->
- [x] **Backend - TRPC:** Create `admin` router with `getUsers` and `toggleRole` procedures. <!-- id: 2 -->
- [x] **Backend - Protection:** Verify/Add middleware or server-side checks for `/admin`. <!-- id: 3 -->
- [x] **UI - Admin Page:** Implement User List with Role Toggle. <!-- id: 4 -->
- [x] **Documentation:** Update Admin documentation. <!-- id: 5 -->

## Dev Agent Record
- [x] Planning: Created story.
- [x] Implementation:
    - Updated `UserDropdown` to check `user.role`.
    - Added `getUsers` and `toggleUserRole` to `adminRouter`.
    - Created `UsersTable` component.
    - Updated `AdminPage` to use Tabs.
    - Added tests `admin-role.test.ts`.
    - Documented in `5-4-admin-user-management.md`.