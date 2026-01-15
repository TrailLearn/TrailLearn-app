---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: 'Thursday, January 15, 2026'
project_name: 'TrailLearn'
user_name: 'aubinaso'
date: 'Thursday, January 15, 2026'
---

# Architecture Decision Document

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
Le cœur du système est le **Moteur DVP (Dossier de Viabilité du Parcours)**. Il exige une logique métier complexe capable de croiser des données utilisateur (budget, notes) avec des référentiels externes (coût de la vie, règles académiques). Le système doit supporter un mode "Simulation" (What-If) instantané et un mode "Admin" pour la maintenance des règles sans redéploiement.

**Non-Functional Requirements:**
*   **Sécurité ("Safe Space")** : Isolation stricte des données (RLS), chiffrement au repos.
*   **Performance (UX Cockpit)** : Feedback < 200ms pour les simulations What-If.
*   **Auditabilité** : Traçabilité complète des changements de règles (qui a changé le prix du loyer à Paris et quand ?).
*   **Transparence** : L'algorithme ne peut pas être une boîte noire ; il doit être explicable.

**Scale & Complexity:**
Le projet démarre comme une Web App V1 mais avec une complexité métier élevée dès le début.

- **Primary domain:** Full-stack Web App (Next.js).
- **Complexity level:** Moyen/Haut (Logique métier dense, exigences de sécurité).
- **Estimated architectural components:** 5+ (Frontend Cockpit, Backend API, Moteur de Règles, Base de Données RLS, Storage PDF).

### Technical Constraints & Dependencies
*   **Offline Partiel** : Le PDF exporté est le seul artefact offline requis.
*   **Browser Support** : Web App moderne, pas de contraintes legacy lourdes (IE11 non supporté).
*   **Stack** : Préférence pour Next.js (SSR/Client-side hybride) et une DB Postgres (pour le RLS).

## Starter Template Evaluation

### Primary Technology Domain
**Full-Stack Web Application (TypeScript)**
Le projet nécessite une intégration étroite entre un frontend réactif (Cockpit) et un backend sécurisé (Moteur DVP). Le langage TypeScript est choisi pour garantir la cohérence et la sécurité des données de bout en bout.

### Starter Options Considered
1.  **T3 Stack** : La référence pour la sécurité de type (Type-Safety) avec Next.js, tRPC et Prisma.
2.  **Taxonomy** : Une base de code exemplaire pour l'UI moderne (shadcn/ui), mais moins maintenue en tant que starter pur.
3.  **Kirimase** : Un générateur flexible, mais potentiellement moins opinarié sur les bonnes pratiques de sécurité par défaut.

### Selected Starter: T3 Stack (Customized)

**Rationale for Selection:**
Nous choisissons **T3 Stack** comme fondation pour sa robustesse architecturale.
*   **Sécurité (Safe Space)** : tRPC garantit que les types définis dans le moteur DVP sont respectés à la lettre dans l'interface, réduisant les risques d'erreurs sur les données financières.
*   **Modularité** : Permet d'intégrer **shadcn/ui** proprement sans dette technique initiale.
*   **Inspiration** : Nous utiliserons le repo **Taxonomy** comme "Blueprint UI" pour accélérer le design du Cockpit, sans le cloner directement.

**Initialization Command:**

```bash
npm create t3-app@latest
# Options:
# - TypeScript: Yes
# - Tailwind CSS: Yes
# - tRPC: Yes
# - Authentication: NextAuth.js
# - ORM: Prisma
# - Database: PostgreSQL (via Supabase ou autre)
# - App Router: Yes
```

## Core Architectural Decisions

### Decision Priority Analysis
**Critical Decisions (Block Implementation):**
*   Modèle de données DVP (Hybride JSONB)
*   Architecture du Moteur de Règles (Database-Driven)
*   Stratégie d'hébergement (Vercel + Supabase)

### Data Architecture
**Decision:** Modèle Hybride SQL / JSONB (PostgreSQL via Supabase).
**Rationale:**
*   **Structure Fixe (SQL)** : Utilisateurs, Authentification, Logs d'Audit, Relations DVP <-> User.
*   **Structure Flexible (JSONB)** : Le contenu du DVP (`data` column) et les configurations de règles. Cela permet d'itérer sur la structure du dossier (ajout de champs spécifiques par pays) sans migrations de schéma SQL lourdes à chaque sprint.
*   **Sécurité** : Le RLS (Row Level Security) de Postgres s'applique au niveau de la ligne, protégeant efficacement le blob JSONB.

### Authentication & Security
**Decision:** NextAuth.js + Supabase Auth (RLS).
**Rationale:**
*   **NextAuth** : Gère la session côté Next.js (sécurisé, http-only cookies).
*   **Supabase RLS** : La sécurité est portée par la donnée elle-même. Même si l'API est compromise, la base refuse de servir une ligne qui n'appartient pas à l'utilisateur (via son `user_id` injecté dans le contexte). C'est le niveau maximal de "Safe Space".

### API & Communication Patterns
**Decision:** tRPC (Full Type-Safety) pour l'App, REST pour les Webhooks.
**Rationale:**
*   **tRPC** : Garantit que le Frontend (Cockpit) et le Backend parlent exactement le même langage. Si on change le modèle du DVP côté serveur, le client refuse de compiler tant qu'il n'est pas mis à jour. Zéro erreur de runtime "undefined is not a function".
*   **Server Actions** : Utilisation possible pour les mutations simples (formulaires), en complément de tRPC.

### Infrastructure & Deployment
**Decision:** Vercel (Front/API) + Supabase (Data).
**Rationale:**
*   **Vercel** : Déploiement git-push, Edge Functions pour la rapidité mondiale, Preview Deployments pour la validation.
*   **Supabase** : PostgreSQL managé, Auth, Storage, Realtime. Offre une DX (Developer Experience) supérieure pour une équipe agile.

## Project Structure & Boundaries

### Complete Project Directory Structure

```
traillearn/
├── prisma/
│   ├── schema.prisma          # Source de vérité du schéma de données
│   └── migrations/            # Historique des modifications SQL
├── src/
│   ├── app/                   # App Router (Routing & Layouts uniquement)
│   │   ├── (auth)/            # Routes d'authentification publiques
│   │   └── (dashboard)/       # Espace Cockpit protégé
│   │       ├── _components/   # Composants de layout spécifiques au cockpit
│   │       ├── layout.tsx     # Shell du Cockpit (Header/Sidebar)
│   │       └── page.tsx       # Dashboard principal
│   ├── components/            # UI Partagée (Design System atomique)
│   │   ├── ui/                # Composants shadcn (button.tsx, card.tsx)
│   │   └── shared/            # Composants transverses (Logo, Icons)
│   ├── features/              # Logique Métier par domaine (Le cœur)
│   │   ├── dvp/               # Feature DVP : Moteur & Simulation
│   │   │   ├── components/    # ViabilityGauge, WhatIfSlider
│   │   │   ├── engine/        # Logique de calcul pure (calculate-viability.ts)
│   │   │   └── types.ts       # Schémas Zod et types métier
│   │   ├── admin/             # Feature Admin : Gestion des règles
│   │   └── user/              # Feature User : Profil & Préférences
│   ├── server/                # Backend (tRPC & Database)
│   │   ├── api/
│   │   │   ├── routers/       # Endpoints tRPC (dvp.ts, admin.ts)
│   │   │   └── trpc.ts        # Middleware, Contexte & Procédures protégées
│   │   └── db.ts              # Singleton Client Prisma
│   ├── lib/                   # Configurations & Utilitaires globaux
│   │   ├── config.ts          # Feature flags & Constantes
│   │   └── utils.ts           # Helpers (cn, formatting)
│   └── styles/
│       └── globals.css        # Directives Tailwind CSS
├── public/                    # Assets statiques (images, fonts)
├── .env                       # Variables d'environnement (Secrets)
├── next.config.mjs
├── package.json
└── tsconfig.json
```

### Architectural Boundaries

**API Boundaries:**
`src/server/api/routers/` constitue l'unique interface de communication entre le client et le serveur pour la logique métier. Toutes les mutations DVP passent par `dvp.ts` avec vérification systématique de session et de droits (Middleware tRPC).

**Component Boundaries:**
*   **Composants UI (`src/components/ui`)** : "Stupides" et purement visuels. Ils ne connaissent ni la DB ni tRPC.
*   **Composants Feature (`src/features/**/components`)** : "Intelligents". Ils sont connectés aux données tRPC et portent la logique d'interaction complexe.

**Moteur de Calcul (Isolation) :**
La logique de calcul de viabilité est isolée dans `src/features/dvp/engine`. Elle doit rester une fonction pure (sans effets de bord DB/API) pour être testable unitairement et réutilisable tant côté serveur (sauvegarde) que côté client (simulation What-If).

### Requirements to Structure Mapping

**Dossier de Viabilité (DVP) :**
*   Modèle de données : `prisma/schema.prisma`
*   Logique de calcul : `src/features/dvp/engine/`
*   Points d'entrée API : `src/server/api/routers/dvp.ts`
*   Interface Cockpit : `src/app/(dashboard)/`

**Standard de Vérité (Admin) :**
*   Gestion des règles : `src/features/admin/`
*   API Admin : `src/server/api/routers/admin.ts`
*   Audit Trail : Table dédiée dans `schema.prisma` et logs côté serveur.

## Architecture Validation Results

### Coherence Validation ✅
**Decision Compatibility:**
L'utilisation de la **T3 Stack** (Next.js, tRPC, Prisma) avec **Supabase (RLS)** et un modèle **JSONB hybride** forme un ensemble technique homogène. La sécurité est portée par la donnée (RLS), la communication est sécurisée par le type (tRPC) et la flexibilité est assurée par le JSONB.

**Pattern Consistency:**
Les patterns d'implémentation (Feature-First, Backend as Truth) supportent directement les objectifs de sécurité et de performance. Le nommage `kebab-case` et l'usage de `src/features/` assurent une navigation fluide pour les agents IA.

### Requirements Coverage Validation ✅
**Epic/Feature Coverage:**
*   **Dossier de Viabilité (DVP)** : Supporté par le moteur de règles database-driven et le stockage JSONB.
*   **Cockpit / What-If** : Supporté par la réactivité de tRPC et la logique de simulation côté client.
*   **Standard de Vérité (Admin)** : Supporté par la feature admin dédiée et l'audit trail en DB.

**Non-Functional Requirements Coverage:**
*   **Sécurité** : Couverte par RLS + NextAuth.
*   **Transparence** : Couverte par le pattern "Boîte Blanche" et les `InsightCards`.

### Implementation Readiness Validation ✅
L'architecture est jugée **complète et actionnable**. Les frontières entre composants sont nettes, les conventions de nommage sont strictes, et la structure de fichiers est prête à accueillir les premiers sprints de développement.

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** HIGH

**Key Strengths:**
*   **End-to-End Type Safety** : Réduction drastique des bugs sur les données sensibles.
*   **Database-Driven Logic** : Agilité maximale pour Thomas (Admin) sans redéploiement.
*   **Safe Space Architecture** : Sécurité structurelle via RLS Postgres.

### Implementation Handoff

**AI Agent Guidelines:**
*   Initialiser le projet via le starter T3 spécifié.
*   Respecter strictement la structure `src/features/` pour toute logique métier.
*   Interdire toute règle métier financière hardcodée dans le frontend.

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** Thursday, January 15, 2026
**Document Location:** BMAD_OUTPUT/planning-artifacts/architecture.md

### Final Architecture Deliverables

**📋 Document d'Architecture Complet**
*   Toutes les décisions technologiques documentées avec versions.
*   Patterns d'implémentation garantissant la cohérence des agents IA.
*   Structure de projet complète avec arborescence détaillée.
*   Mapping des besoins PRD vers l'architecture.
*   Validation confirmant la robustesse et la sécurité.

**🏗️ Fondation Prête pour l'Action**
*   Stack : Next.js + tRPC + Prisma + Supabase.
*   Sécurité : RLS (Row Level Security) structurel.
*   Agilité : Modèle hybride JSONB pour le DVP.

### Implementation Handoff

**Pour les Agents IA :**
Ce document est votre guide suprême pour implémenter **TrailLearn**. Respectez scrupuleusement les décisions, les patterns de nommage (`kebab-case`), et l'isolation des features.

**Priorité n°1 :**
```bash
npm create t3-app@latest
```
Suivre les options : TypeScript, Tailwind, tRPC, NextAuth, Prisma, App Router.

### Quality Assurance Checklist

**✅ Cohérence Architecturale**
- [x] Toutes les décisions fonctionnent ensemble sans conflit.
- [x] La stack technologique est compatible et moderne.
- [x] Les patterns supportent les objectifs de sécurité.

**✅ Couverture des Besoins**
- [x] Le DVP, le What-If et l'Admin sont supportés.
- [x] Les exigences de transparence ("Boîte Blanche") sont adressées.
- [x] Le "Safe Space" est garanti techniquement.

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

---

