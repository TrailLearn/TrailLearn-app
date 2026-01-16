# Story 1.2: Authentification Email / Mot de passe

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a utilisateur,
I want créer un compte et me connecter avec mon email et un mot de passe,
So that j'accède de manière sécurisée à mon espace personnel TrailLearn et que mes données soient protégées.

## Acceptance Criteria

1. **Given** un utilisateur non authentifié sur la landing page. **When** je remplis le formulaire d'inscription avec email et mot de passe valide. **Then** un nouvel utilisateur est créé en base de données. [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 1.2]
2. **And** une session NextAuth est initialisée. [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 1.2]
3. **And** je suis redirigé vers le dashboard (`/dashboard`). [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 1.2]
4. **Given** un utilisateur non authentifié essayant d'accéder à `/dashboard`. **When** je navigue vers l'URL. **Then** je suis redirigé automatiquement vers la page de connexion. [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 1.2 & User Tests Request]
5. **Given** un utilisateur authentifié. **When** je clique sur "Déconnexion". **Then** ma session est détruite et je suis redirigé vers l'accueil ou la page de connexion.
6. **And** les tests de sécurité existants `tests/e2e/security.spec.ts` passent tous au vert. [Source: User Request]

## Tasks / Subtasks

- [ ] Task 1: Configurer NextAuth.js avec Email/Password Provider (AC: 1, 2)
  - [ ] Configurer `src/server/auth.ts` (ou équivalent) pour utiliser le Credentials Provider.
  - [ ] Définir la stratégie de session (JWT).
  - [ ] Configurer les pages personnalisées (`/auth/signin`) si nécessaire ou utiliser celles par défaut pour le MVP.
  - [ ] Mettre à jour `src/env.js` pour valider `AUTH_SECRET` et les variables nécessaires.
- [ ] Task 2: Implémenter le Middleware de Protection des Routes (AC: 4, 6)
  - [ ] Créer ou configurer `src/middleware.ts` pour intercepter les accès à `/dashboard/*`.
  - [ ] Rediriger les utilisateurs non authentifiés vers `/api/auth/signin`.
  - [ ] Vérifier que cela résout les tests de sécurité défaillants.
- [ ] Task 3: Créer l'UI de Connexion/Inscription (AC: 1, 3, 5)
  - [ ] S'assurer que le formulaire de connexion fonctionne avec le backend NextAuth.
  - [ ] Vérifier la redirection après succès vers `/dashboard`.
  - [ ] Vérifier le bouton de déconnexion dans le layout du dashboard.
- [ ] Task 4: Validation de la Sécurité (AC: 6)
  - [ ] Exécuter `npm run test:e2e`.
  - [ ] Confirmer que l'accès `/dashboard` est bloqué pour les anonymes.

## Dev Notes

### Architecture & Technical Stack
- **Library**: NextAuth.js (v5 beta ou v4 selon T3 stack).
- **Database**: Prisma Adapter déjà présent dans `package.json`, s'assurer que le schéma `User` / `Account` / `Session` est correct dans `prisma/schema.prisma`.
- **Security**: Le Middleware Next.js est la méthode recommandée pour protéger les routes App Router.

### Implementation Details
- **Priorité Sécurité**: Ne pas faire de compromis sur le middleware. C'est le point critique pour verdir les tests.
- **Scope**: Email/Password uniquement. Pas de Google/Discord pour l'instant (nettoyer si le boilerplate T3 en a ajouté).
- **Tests**: Utiliser `tests/e2e/security.spec.ts` comme boucle de feedback immédiate.

### References
- [Epic Breakdown](BMAD_OUTPUT/planning-artifacts/epics.md)
- [Architecture Document](BMAD_OUTPUT/planning-artifacts/architecture.md)

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

### Change Log

### Status
