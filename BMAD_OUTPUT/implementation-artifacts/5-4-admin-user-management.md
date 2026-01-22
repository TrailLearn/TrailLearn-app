# Story 5.4: Admin User & Role Management

Status: Done

## Context
Administration needs to be self-sufficient. Admins must be able to promote other users to Admin status without database access.

## Features Implemented

1.  **Role Definition**:
    - `USER`: Standard access (DVP, Chat, Dashboard).
    - `ADMIN`: Full access + Admin Dashboard (`/admin`).

2.  **Navigation Visibility**:
    - The "Administration" link in the User Profile dropdown is **hidden** for non-admins.
    - Logic: `user.role === 'ADMIN'`.
    - Implementation: `src/features/auth/components/user-dropdown.tsx`.

3.  **Route Protection**:
    - Backend: TRPC procedures (`getUsers`, `toggleUserRole`) strictly enforce `ctx.session.user.role === 'ADMIN'`.
    - Frontend: `/admin` layout redirects non-admins to `/`.

4.  **User Management UI**:
    - Located in Admin Dashboard > Tab "Utilisateurs & Rôles".
    - Lists all users with Email, Role, and Last Activity.
    - Action "Promouvoir Admin" / "Rétrograder" available (except for self).

5.  **Audit**:
    - Every role change is logged in `AuditLog` (Action: `UPDATE_ROLE`).

## Workflows

### Promoting a User
1.  Admin logs in.
2.  Goes to `Profil > Administration`.
3.  Selects "Utilisateurs & Rôles" tab.
4.  Finds the user (e.g., via email).
5.  Clicks "Promouvoir Admin".
6.  System updates role and logs action.
7.  Target user must re-login or refresh session to see changes (NextAuth session strategy).

## Admin Account (Dev/Seed)

The default admin account is created via `prisma/seed.ts`.
- **Email**: `admin@traillearn.com`
- **Password**: `admin123` (Min 6 chars)

### Password Policy
- **Minimum Length**: 6 characters.
- **Enforcement**: Frontend (Zod schema in `sign-in-form.tsx`) and Backend (`auth/config.ts`).

## Dev Agent Record
- Implemented `getUsers` and `toggleUserRole` in `admin` router.
- Created `UsersTable` component.
- Updated `AdminPage` with Tabs.
- Verified security with unit tests (`admin-role.test.ts`).
- **Hotfix:** Updated seed password to `admin123` to comply with validation rules.