# Story 3.1: Référentiel des Règles en Base de Données

Status: review

## Story

As an administrateur,
I want stocker les seuils et critères métier en base de données,
so that je puisse les mettre à jour sans modifier le code.

## Acceptance Criteria

1. **Modèle Prisma** : Un modèle `BusinessRule` est créé dans `schema.prisma`.
2. **Champs requis** : Le modèle contient `id`, `key` (unique), `value` (JSONB), `category`, `version`, `description`, `updatedAt`, `updatedBy`.
3. **Sécurité** : Les politiques RLS sont définies (Lecture publique ou authentifiée selon besoin, écriture ADMIN uniquement).
4. **Seed** : Un script de seed (ou une migration SQL initiale) peuple la table avec des valeurs par défaut pour Paris, Lyon et les seuils généraux.
5. **Accès** : Une procédure tRPC (protégée par rôle ADMIN pour l'écriture) permet de manipuler ces règles.

## Tasks / Subtasks

- [x] Mise à jour du schéma Prisma (AC: 1, 2)
  - [x] Ajouter `model BusinessRule` à `prisma/schema.prisma`.
  - [x] Exécuter `npx prisma migrate dev` pour créer la table.
- [x] Script de Seeding (AC: 4)
  - [x] Créer/Mettre à jour `prisma/seed.ts` pour inclure les règles par défaut (ex: `housing_min_budget`, `city_cost_index`).
- [x] Sécurité RLS (AC: 3)
  - [x] Ajouter la migration SQL pour activer le RLS sur `BusinessRule`.
  - [x] Définir les politiques : SELECT pour tous les authentifiés (ou public si nécessaire), ALL pour le rôle `service_role` ou `ADMIN`.
- [x] Router Admin (AC: 5)
  - [x] Créer `src/server/api/routers/admin.ts`.
  - [x] Implémenter `getAllRules` et `updateRule`.
  - [x] Ajouter le router au root router dans `src/server/api/root.ts`.

## Dev Notes

- **Architecture Pattern** : Database-Driven rules. Éviter toute constante codée en dur dans le moteur de calcul.
- **Modèle de données** : Utiliser `Json` pour `value` afin de supporter des structures complexes (ex: paliers de loyer).
- **Audit** : `updatedBy` doit pointer vers l'ID de l'admin.

### Project Structure Notes

- Router Admin : `src/server/api/routers/admin.ts`.
- Prisma Schema : `prisma/schema.prisma`.

### References

- [Source: BMAD_OUTPUT/planning-artifacts/architecture.md#Data Architecture]
- [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 3.1]

## Dev Agent Record

### Agent Model Used
BMad PM Agent (John)

### Completion Notes List
- Story context created for 3.1.
- Prisma model and RLS requirements specified.
