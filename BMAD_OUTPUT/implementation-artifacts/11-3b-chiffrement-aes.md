# Story 11.3b: Chiffrement Applicatif (AES-256-GCM)

Status: ready-for-dev

## Story

As a responsable sécurité,
I want que les données soient chiffrées avant même d'atteindre la base de données,
So that un accès physique à la DB ne révèle rien (Protection "At Rest").

## Acceptance Criteria

1. [ ] **Given** une donnée sensible (ex: texte d'une peur), **When** elle est transmise au backend, **Then** elle est chiffrée en AES-256-GCM avec une clé rotative gérée côté serveur. [Source: epics.md#Story 11.3b]
2. [ ] **And** des tests unitaires valident le cycle Encrypt -> Decrypt avec intégrité parfaite. [Source: epics.md#Story 11.3b]
3. [ ] **And** toute tentative de lecture sans clé valide lève une exception de sécurité auditée. [Source: epics.md#Story 11.3b]

## Tasks / Subtasks

- [ ] Task 1: Encryption Utility
  - [ ] Implement `EncryptionService` using Node.js `crypto` module (AES-256-GCM).
  - [ ] Manage encryption key (ENV variable for MVP, Key Management Service for Prod).
- [ ] Task 2: Integration with Shadow Service
  - [ ] Update `ShadowBoundaryService` to encrypt on Write and decrypt on Read.
- [ ] Task 3: Unit Testing
  - [ ] Verify `encrypt(text) != text`.
  - [ ] Verify `decrypt(encrypt(text)) == text`.
  - [ ] Verify error handling for invalid keys/auth tags.

## Dev Notes

- **Key Management**: For now, use `SHADOW_KEY` in `.env`. Ensure it is NOT committed.
- **Algorithm**: AES-256-GCM provides confidentiality AND integrity (auth tag).

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List