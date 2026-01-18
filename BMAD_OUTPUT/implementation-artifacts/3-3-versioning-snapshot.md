# Story 3.3: Versioning et Snapshot (Immuabilité)

Status: review

## Story

As an administrateur,
I want qu'un DVP reste lié à la version des règles utilisée lors de son calcul,
so that la cohérence historique soit garantie même si les prix changent plus tard.

## Acceptance Criteria

1. **Snapshot de calcul** : Lors de la validation d'un DVP, le résultat du diagnostic ET la version des règles sont stockés dans `DvpRecord`.
2. **Immuabilité** : Une fois le statut passé à `COMPLETED`, les données de diagnostic ne sont plus recalculées automatiquement si les règles globales changent.
3. **Schéma Prisma** : Ajout de `rulesVersionId` et potentiellement `calculationResult` (JSONB) dans `DvpRecord`.

## Tasks / Subtasks

- [x] Migration Prisma (AC: 3)
  - [x] Ajouter `rulesVersion` ou un champ pour stocker les règles utilisées dans `DvpRecord`.
  - [x] Ajouter un champ `result` (JSONB) pour stocker le diagnostic final.
- [x] Logique de validation (AC: 1, 2)
  - [x] Dans `src/server/api/routers/dvp.ts`, mettre à jour la procédure de validation (`validate` ou `submit`).
  - [x] Récupérer les règles actives, lancer le moteur de calcul (Story 3.2), et stocker le snapshot.
- [x] Test d'immuabilité (AC: 2)
  - [x] Vérifier qu'un changement de règle admin n'affecte pas un DVP déjà "COMPLETED".

## Dev Notes

- **Snapshot** : On peut stocker soit l'ID de la version des règles, soit un snapshot complet du référentiel utilisé pour ce DVP précis (plus robuste pour l'audit).
- **Architecture** : "Versioning des règles métier (liaison immuable DVP/Version)".

### References

- [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 3.3]
- [Source: BMAD_OUTPUT/planning-artifacts/prd.md#NFR2]

## Dev Agent Record

### Agent Model Used
BMad PM Agent (John)
