# Story 11.3a: Modèle et Frontière d'Accès Shadow Zone

Status: ready-for-dev

## Story

As a architecte système,
I want isoler structurellement les données sensibles,
So that aucune fuite accidentelle ne soit possible via les accès standards.

## Acceptance Criteria

1. [ ] **Given** le schéma de base de données, **When** je crée la table dédiée `ShadowProfile`, **Then** aucune relation directe (FK) n'est exposée aux requêtes publiques (API standard). [Source: epics.md#Story 11.3a]
2. [ ] **And** l'accès est interdit à tout service autre que le `ShadowBoundaryService` (Design Pattern). [Source: epics.md#Story 11.3a]
3. [ ] **And** une politique RLS stricte empêche tout SELECT sans l'ID utilisateur explicite dans la session. [Source: epics.md#Story 11.3a]

## Tasks / Subtasks

- [ ] Task 1: Database Schema
  - [ ] Create `ShadowProfile` model in Prisma.
  - [ ] Ensure NO direct relation is added to `User` in the public schema if possible, or mark strictly.
  - [ ] Enable RLS policy in PostgreSQL (via migration SQL).
- [ ] Task 2: Boundary Service
  - [ ] Create `src/features/identity/services/shadow-boundary-service.ts`.
  - [ ] Implement strict access methods.
  - [ ] Add architecture test (or linter rule) to prevent import of `ShadowProfile` elsewhere.

## Dev Notes

- **Security**: This is the "Vault". Even if the app is hacked, this table should be hard to dump.
- **RLS**: Validate RLS policy with a test user trying to access another user's shadow data.

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List