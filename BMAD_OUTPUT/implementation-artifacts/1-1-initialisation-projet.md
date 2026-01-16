# Story 1.1: Initialisation Projet T3 & Page d'accueil Vitrine

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visiteur,
I want accéder à une page d'accueil claire qui explique la promesse de TrailLearn,
So that je comprenne la valeur du produit avant de créer un compte.

## Acceptance Criteria

1. [x] **Given** un environnement de développement vide. **When** j'exécute la commande d'initialisation T3 spécifiée dans l'architecture. **Then** le projet est créé avec Next.js, tRPC, Prisma et Tailwind. [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 1.1]
2. [x] **And** shadcn/ui est configuré avec les alias et le thème de base validé (Blue-600, Emerald-500, Amber-500, Inter, JetBrains Mono). [Source: BMAD_OUTPUT/planning-artifacts/ux-design-specification.md#Visual Design Foundation]
3. [x] **And** une landing page publique existe présentant la vision "Lucidité vs Sélection". [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 1.1]
4. [x] **And** un CTA "Commencer / Se connecter" est visible. [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 1.1]
5. [x] **And** la landing page expose les concepts de "Boîte Blanche" et de "Responsabilité Structurelle". [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 6.1 (Covered partly here for landing page foundation)]
6. [x] **And** le projet respecte l'arborescence définie dans l'architecture (`src/features`, `src/app/(dashboard)`, etc.). [Source: BMAD_OUTPUT/planning-artifacts/architecture.md#Complete Project Directory Structure]

## Tasks / Subtasks

- [x] Task 1: Initialiser le projet T3 Stack (AC: 1, 6)
  - [x] Exécuter `npm create t3-app@latest` avec les flags: TypeScript, Tailwind, tRPC, NextAuth, Prisma, App Router.
  - [x] Nettoyer le boilerplate par défaut (page.tsx, exemples tRPC).
  - [x] Restructurer les dossiers selon l'architecture (`src/features`, `src/app/(auth)`, `src/app/(dashboard)`).
- [x] Task 2: Configurer shadcn/ui et le Design System (AC: 2)
  - [x] Initialiser shadcn/ui (`npx shadcn@latest init`).
  - [x] Configurer les polices (Inter pour le corps, JetBrains Mono pour les données).
  - [x] Configurer les couleurs du thème dans `tailwind.config.ts` et `globals.css` (Blue-600, Emerald-500, Amber-500).
  - [x] Installer les composants de base nécessaires pour la Landing Page (Button, Card...).
- [x] Task 3: Implémenter la Landing Page (AC: 3, 5)
  - [x] Créer la page publique `src/app/page.tsx`.
  - [x] Intégrer la section Héro avec la vision "Lucidité vs Sélection".
  - [x] Intégrer une section explicative "Boîte Blanche" et "Responsabilité Structurelle".
- [x] Task 4: Implémenter le CTA (AC: 4)
  - [x] Ajouter le bouton "Commencer" redirigeant vers l'inscription/connexion.

## Review Follow-ups (AI)
- [x] [AI-Review][High] Landing Page refactor: Moved hero and vision components to `src/features/landing/components/` to respect Feature-First architecture.
- [x] [AI-Review][Medium] i18n Config: Added `i18n` configuration to `next.config.js` with 'fr' locale.
- [x] [AI-Review][Medium] Git Tracking: All new files staged and tracked.

## Dev Notes

### Architecture & Technical Stack
- **Stack**: Next.js, tRPC, Prisma, Tailwind CSS, NextAuth.js.
- **Initialization**: `npm create t3-app@latest` is mandatory.
- **Structure**: Feature-First (`src/features/`).
- **Design System**: shadcn/ui.
- **Fonts**: Inter (Body), JetBrains Mono (Data).
- **Colors**: Primary (Blue-600), Secondary/Success (Emerald-500), Warning (Amber-500).

### Implementation Details
- **Clean Architecture**: Respect `src/features` pattern immediately.
- **Content**: Updated `src/app/page.tsx` with vision "Lucidité vs Sélection".
- **Dashboard Placeholder**: Created `src/app/(dashboard)/layout.tsx` and `page.tsx`.

### References
- [Architecture Decision Document](BMAD_OUTPUT/planning-artifacts/architecture.md)
- [UX Design Specification](BMAD_OUTPUT/planning-artifacts/ux-design-specification.md)
- [Epic Breakdown](BMAD_OUTPUT/planning-artifacts/epics.md)

## Dev Agent Record

### Agent Model Used

Amelia (Senior Software Engineer)

### Debug Log References

### Completion Notes List
- Initialisation technique validée (T3 Stack pré-existante et nettoyée).
- Structure de dossiers `src/features`, `src/app/(auth)`, `src/app/(dashboard)` créée.
- Design System configuré (Fonts Inter/Mono, Couleurs TrailLearn).
- Landing Page implémentée avec CTA et concepts clés.
- Typecheck TypeScript OK.
- Revue de code effectuée et corrections appliquées (Refactor Landing, i18n, Git).

### File List
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/(dashboard)/layout.tsx`
- `src/app/(dashboard)/page.tsx`
- `src/styles/globals.css`
- `tailwind.config.ts`
- `src/lib/utils.ts`
- `src/server/api/root.ts`
- `src/server/api/routers/post.ts` (DELETED)
- `src/app/_components/post.tsx` (DELETED)
- `src/components/ui/card.tsx`
- `src/components/ui/badge.tsx`
- `src/features/landing/components/hero-section.tsx` (NEW)
- `src/features/landing/components/vision-section.tsx` (NEW)
- `next.config.js` (MODIFIED)

### Change Log
- 2026-01-16: Initialisation du projet et mise en place du Design System et de la Landing Page.
- 2026-01-16: Code Review fixes applied (Refactor Landing feature, i18n config, Git tracking).

### Status
done
