---
stepsCompleted: ["step-01-validate-prerequisites", "step-02-design-epics", "step-03-create-stories", "step-04-final-validation"]
status: "complete"
completedAt: "Thursday, January 15, 2026"
inputDocuments:
  - "BMAD_OUTPUT/planning-artifacts/prd.md"
  - "BMAD_OUTPUT/planning-artifacts/prd-validation-report.md"
  - "BMAD_OUTPUT/planning-artifacts/architecture.md"
  - "BMAD_OUTPUT/planning-artifacts/ux-design-specification.md"
---

# TrailLearn - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for TrailLearn, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Page d'accueil pédagogique (Lucidité vs Sélection).
FR2: Consentement éclairé obligatoire avant DVP.
FR3: Gestion de compte et droit à l'oubli (effacement complet).
FR4: Saisie structurée par piliers (Budget, Langue, Logement).
FR5: Calcul du "Reste à Vivre" et détection des fragilités (🔴🟠🟡).
FR6: Gestion de l'état "Incomplet" si données critiques manquantes.
FR7: Simulation "What-If" (recalcul immédiat après changement de variable).
FR8: Dashboard de résultats avec justifications explicites et remédiations.
FR9: Export PDF incluant date et version des règles.
FR10: Back-office Admin de gestion des seuils et référentiels (avec historique d'audit).

### NonFunctional Requirements

NFR1: Indicateur de fraîcheur des données.
NFR2: Versioning des règles métier (liaison immuable DVP/Version).
NFR3: Obsolescence des données > 12 mois.
NFR4: Chargement LCP < 1.5s.
NFR5: Réactivité What-If < 500ms.
NFR6: Clarté cognitive (langage simple).

### Additional Requirements

**Architecture Requirements:**
- Starter Template: T3 Stack (Next.js, tRPC, Prisma, Supabase) via `npm create t3-app@latest`.
- Data Model: Hybrid SQL/JSONB for DVP flexibility.
- Security: RLS (Row Level Security) enabled on all sensitive tables.
- Architecture Pattern: Feature-First organization.
- Rule Engine: Database-driven rules (no hardcoded logic).
- Observability: "White Box" traceability of calculation logic (inputs, rules version, outputs).
- i18n: Foundation for currency/date formatting and multi-language support.

**UX Requirements:**
- UX Pattern: "Focus Tunnel" wizard for data entry.
- UX Pattern: "Cockpit Dashboard" for results and simulation.
- Components: `ViabilityGauge`, `InsightCard`, `WhatIfSlider`.
- Accessibility: WCAG 2.1 AA compliance.

### FR Coverage Map

FR1: Epic 6 - Page d'accueil pédagogique (Lucidité vs Sélection)
FR2: Epic 1 - Consentement éclairé obligatoire
FR3: Epic 1 - Gestion de compte et droit à l'oubli
FR4: Epic 2 - Saisie structurée par piliers (Wizard)
FR5: Epic 3 - Moteur de calcul et détection des fragilités
FR6: Epic 2 - Gestion de l'état "Incomplet"
FR7: Epic 4 - Simulation "What-If" instantanée
FR8: Epic 4 - Dashboard Cockpit de résultats
FR9: Epic 6 - Export PDF certifié
FR10: Epic 5 - Back-office de gestion des référentiels
NFR1: Epic 5 - Fraîcheur des données
NFR2: Epic 3 - Versioning immuable des règles
NFR3: Epic 5 - Gestion de l'obsolescence
NFR5: Epic 4 - Performance du What-If (<500ms)
Arch-1: Epic 1 - Initialisation T3 Stack
Arch-2: Epic 2 - Implémentation modèle JSONB
Arch-3: Epic 3 - Architecture moteur Database-Driven
Arch-4: Epic 1 - Activation RLS (Safe Space)
UX-1: Epic 2 - Pattern Focus Tunnel
UX-2: Epic 4 - Pattern Cockpit Dashboard
UX-3: Epic 4 - Composants métier (Jauge, InsightCards)
Observabilité: Epic 3 - Trace de calcul (Boîte Blanche)
i18n: Epic 1 - Fondation multi-langue et formats

## Epic List

## Epic 1: Foundation & Safe Space

Mettre en place l'environnement sécurisé et les fondations techniques du projet. Permet l'authentification, la protection des données via RLS et pose les bases de l'i18n.

### Story 1.1: Initialisation Projet T3 & Page d'Accueil Vitrine

As a visiteur,
I want accéder à une page d'accueil claire qui explique la promesse de TrailLearn,
So that je comprenne la valeur du produit avant de créer un compte.

**Acceptance Criteria:**

**Given** un environnement de développement vide.
**When** j'exécute la commande d'initialisation T3 spécifiée dans l'architecture.
**Then** le projet est créé avec Next.js, tRPC, Prisma et Tailwind.
**And** shadcn/ui est configuré avec les alias et le thème de base validé.
**And** une landing page publique existe présentant la vision "Lucidité vs Sélection".
**And** un CTA "Commencer / Se connecter" est visible.

### Story 1.2: Authentification Email / Mot de passe

As a utilisateur,
I want créer un compte et me connecter avec mon email et un mot de passe,
So that j'accède de manière sécurisée à mon espace personnel TrailLearn.

**Acceptance Criteria:**

**Given** un utilisateur non authentifié sur la landing page.
**When** je remplis le formulaire d'inscription avec email et mot de passe.
**Then** un nouvel utilisateur est créé en base de données.
**And** une session NextAuth est initialisée.
**And** je suis redirigé vers le dashboard.

### Story 1.3: Activation du Safe Space (RLS Postgres)

As a utilisateur soucieux de ma vie privée,
I want que mes données soient isolées au niveau de la base de données,
So that aucun autre utilisateur ne puisse y accéder par erreur ou malveillance.

**Acceptance Criteria:**

**Given** une base de données PostgreSQL sur Supabase.
**When** j'active les politiques Row Level Security (RLS) sur la table `User`.
**Then** toute requête SQL sans le `user_id` correct dans le contexte est rejetée par la base de données.

## Epic 2: DVP Core Engine & Wizard

Permettre la saisie fluide et structurée du dossier de viabilité via un tunnel "Focus" et le stockage des données dans un modèle flexible JSONB.

### Story 2.1: Modèle de Données DVP (Hybride JSONB)

As a développeur,
I want mettre en place un schéma de base de données flexible pour le DVP,
So that je puisse stocker des données variées sans migrations SQL constantes.

**Acceptance Criteria:**

**Given** le schéma Prisma existant.
**When** j'ajoute le modèle `DvpRecord` avec une colonne `data` de type `Json`.
**Then** je peux sauvegarder un objet JSON complexe (budget, ville, notes) lié à un utilisateur.
**And** la relation User <-> DvpRecord est établie.

### Story 2.2: Tunnel de Saisie - Structure "Focus Tunnel"

As a étudiant,
I want être guidé étape par étape dans la saisie de mon dossier,
So that je ne sois pas submergé par la quantité d'informations demandée.

**Acceptance Criteria:**

**Given** un utilisateur connecté sur le Dashboard.
**When** je clique sur "Démarrer mon DVP".
**Then** j'accède à une interface de type "Wizard" (Focus Tunnel).
**And** je vois une barre de progression claire.
**And** je peux naviguer entre les étapes (Suivant / Précédent).

### Story 2.3: Saisie Pilier 1 - Projet & Ville

As a étudiant,
I want définir mon projet de mobilité (Pays, Ville, Type d'études),
So that j'initialise mon dossier.

**Acceptance Criteria:**

**Given** l'étape 1 du tunnel.
**When** je sélectionne une ville cible (ex: Paris) et un niveau d'études.
**Then** ces informations sont sauvegardées temporairement.
**And** le système propose une estimation par défaut du coût de la vie pour cette ville.

### Story 2.4: Saisie Pilier 2 - Budget & Garants

As a étudiant,
I want saisir mes ressources financières (Épargne, Aides, Garants),
So that le système puisse évaluer ma solvabilité.

**Acceptance Criteria:**

**Given** l'étape 2 du tunnel.
**When** je saisis mon épargne actuelle et le montant mensuel de mes garants.
**Then** je peux voir le total mensuel disponible dans l'interface.

## Epic 3: The Truth Engine

Implémenter le moteur de calcul déterministe et transparent. Transforme les saisies en diagnostics précis avec une traçabilité complète des règles utilisées.

### Story 3.1: Référentiel des Règles en Base de Données

As a développeur,
I want stocker les seuils et critères métier en base de données,
So that je puisse les mettre à jour sans modifier le code.

**Acceptance Criteria:**

**Given** le schéma Prisma.
**When** j'ajoute le modèle `BusinessRule`.
**Then** je peux stocker des clés/valeurs (ex: `paris_min_budget: 800`) liées à une catégorie.
**And** chaque règle possède une version ou une date de validité.

### Story 3.2: Moteur de Calcul (Pure Logic)

As a système,
I want calculer le diagnostic de viabilité (🔴🟠🟢) à partir des saisies et des règles actives,
So that je puisse fournir un résultat objectif et déterministe.

**Acceptance Criteria:**

**Given** une fonction pure `calculateViability(data, rules)`.
**When** je lui fournis un DVP et les règles correspondantes.
**Then** elle retourne un statut (Viable, Fragile, Non Viable) basé sur des seuils mathématiques.
**And** elle calcule le "Reste à Vivre" et les manques financiers éventuels.

### Story 3.3: Versioning et Snapshot (Immuabilité)

As a administrateur,
I want qu'un DVP reste lié à la version des règles utilisée lors de son calcul,
So that la cohérence historique soit garantie même si les prix changent plus tard.

**Acceptance Criteria:**

**Given** un calcul DVP réussi.
**When** le résultat est sauvegardé.
**Then** l'ID de version des règles utilisées est stocké de manière immuable dans le `DvpRecord`.

### Story 3.4: Trace de Calcul (Observabilité Boîte Blanche)

As a développeur,
I want accéder au détail du raisonnement algorithmique pour un calcul donné,
So that je puisse expliquer précisément un résultat et faciliter le support.

**Acceptance Criteria:**

**Given** l'exécution du moteur de calcul.
**When** le diagnostic est généré.
**Then** un objet de log structuré (CalculTrace) est produit, contenant les entrées et les règles appliquées.
**And** cette trace est persistée en base de données liée au DVP.

## Epic 4: Cockpit & Simulation

Délivrer la valeur ajoutée principale : un tableau de bord de pilotage (Cockpit) permettant de visualiser sa situation et de simuler des ajustements (What-If) en temps réel.

### Story 4.1: Dashboard Cockpit - Vue d'ensemble

As a étudiant,
I want visualiser mes piliers DVP sur un tableau de bord centralisé,
So that je puisse voir l'état d'avancement global de mon projet.

**Acceptance Criteria:**

**Given** un utilisateur avec un DVP en cours ou complété.
**When** j'accède au dashboard cockpit.
**Then** je vois une barre latérale avec les 4 piliers et leur état de complétion (%).
**And** la zone centrale affiche les informations structurantes du projet (Ville, Date, Études).

### Story 4.2: Restitution du Diagnostic (ViabilityGauge)

As a étudiant,
I want voir mon statut de viabilité de manière visuelle et immédiate,
So that je puisse ressentir instantanément si mon projet est sur la bonne voie.

**Acceptance Criteria:**

**Given** un diagnostic calculé par le moteur de vérité.
**When** j'ouvre mon Cockpit.
**Then** je vois le composant `ViabilityGauge` affichant la couleur (🔴🟠🟢) et l'étiquette verbale explicite.
**And** un message de synthèse empathique expliquant le résultat est affiché en priorité.

### Story 4.3: Justifications Boîte Blanche (InsightCards)

As a étudiant,
I want comprendre les facteurs précis qui rendent mon dossier fragile,
So that je sache exactement sur quel levier agir.

**Acceptance Criteria:**

**Given** un diagnostic présentant des fragilités (🟠 ou 🔴).
**When** je consulte le Cockpit.
**Then** je vois des `InsightCards` listant les points bloquants ou sensibles.
**And** chaque carte affiche le lien entre la donnée saisie et la règle métier appliquée.

### Story 4.4: Simulateur What-If - Mode Interactif

As a étudiant,
I want tester des scénarios alternatifs sans modifier mon dossier officiel,
So that je puisse explorer librement les solutions pour rendre mon projet viable.

**Acceptance Criteria:**

**Given** le Cockpit ouvert.
**When** j'active le volet "Simulateur What-If".
**Then** je peux ajuster des variables (Ville, Type de logement, Épargne) via des contrôles interactifs.
**And** la `ViabilityGauge` se met à jour immédiatement (<500ms) pour refléter l'impact.

## Epic 5: Standard of Truth Admin

Fournir les outils opérationnels pour maintenir les référentiels métiers (loyers, seuils) à jour, avec un historique d'audit et de versioning.

### Story 5.1: Dashboard Admin - Gestion des Référentiels

As a administrateur,
I want visualiser l'ensemble des référentiels (Villes, Piliers, Seuils),
So that j'aie une vue d'ensemble de la "vérité" du système.

**Acceptance Criteria:**

**Given** un utilisateur authentifié avec le rôle `ADMIN`.
**When** j'accède à l'espace `/admin`.
**Then** je vois une liste catégorisée des règles métier actives.
**And** la date de dernière mise à jour de chaque référentiel est visible.

### Story 5.2: Édition des Règles & Seuils métier

As a administrateur,
I want modifier une valeur métier spécifique (ex: loyer moyen),
So that les futurs diagnostics DVP soient basés sur la réalité actuelle.

**Acceptance Criteria:**

**Given** l'interface d'édition d'une règle.
**When** je modifie une valeur et soumets le formulaire.
**Then** le système pré-enregistre le changement sans écraser la version précédente.
**And** un écran de confirmation affiche le changement d'état.

### Story 5.3: Audit Trail & Justification des changements

As a administrateur,
I want justifier chaque modification de règle (source, motif),
So that je conserve une traçabilité complète pour l'audit et la conformité.

**Acceptance Criteria:**

**Given** une validation de changement de règle.
**When** je valide définitivement la modification.
**Then** le système m'impose de saisir un motif ou une source (ex: "Source INSEE").
**And** l'auteur, le timestamp et le motif sont enregistrés de manière immuable.

## Epic 6: Sharing & Export

Finaliser l'expérience en permettant l'export formel du diagnostic (PDF) et en exposant la vision produit via la landing page pédagogique.

### Story 6.1: Landing Page Pédagogique (La Vision)

As a visiteur,
I want comprendre la différence entre sélection et lucidité,
So that je saisisse la valeur unique du DVP TrailLearn.

**Acceptance Criteria:**

**Given** la landing page publique.
**When** je la consulte.
**Then** elle expose les concepts de "Boîte Blanche" et de "Responsabilité Structurelle".
**And** elle présente le DVP comme l'unité de vérité du projet.

### Story 6.2: Génération Export PDF du DVP

As a étudiant,
I want télécharger un résumé officiel de mon diagnostic,
So that je puisse le partager avec mes parents ou ma banque.

**Acceptance Criteria:**

**Given** un DVP complété dans le Cockpit.
**When** je clique sur "Télécharger mon Dossier PDF".
**Then** un fichier PDF est généré et téléchargé sur mon appareil.
**And** il contient le statut visuel (🔴🟠🟢), le détail des piliers et les recommandations.

### Story 6.3: Preuve de Vérité (Version & Date)

As a tiers de confiance,
I want que chaque PDF exporté affiche la date et la version des règles utilisées,
So that l'intégrité et la fraîcheur du document soient garanties.

**Acceptance Criteria:**

**Given** un export PDF généré par le système.
**When** je consulte le document.
**Then** la date du calcul et l'ID de version des règles (Standard de Vérité) sont affichés.
**And** un identifiant unique de vérification est présent en pied de page.


### Epic 2: DVP Core Engine & Wizard
Permettre la saisie fluide et structurée du dossier de viabilité via un tunnel "Focus" et le stockage des données dans un modèle flexible JSONB.
**FRs covered:** FR4, FR6, UX-1, Arch-2.

### Epic 3: The Truth Engine
Implémenter le moteur de calcul déterministe et transparent. Transforme les saisies en diagnostics précis avec une traçabilité complète des règles utilisées.
**FRs covered:** FR5, NFR2, Arch-3, Observabilité.

### Epic 4: Cockpit & Simulation
Délivrer la valeur ajoutée principale : un tableau de bord de pilotage (Cockpit) permettant de visualiser sa situation et de simuler des ajustements (What-If) en temps réel.
**FRs covered:** FR7, FR8, UX-2, UX-3, NFR5.

### Epic 5: Standard of Truth Admin
Fournir les outils opérationnels pour maintenir les référentiels métiers (loyers, seuils) à jour, avec un historique d'audit et de versioning.
**FRs covered:** FR10, NFR1, NFR3.

### Epic 6: Sharing & Export
Finaliser l'expérience en permettant l'export formel du diagnostic (PDF) et en exposant la vision produit via la landing page pédagogique.
**FRs covered:** FR1, FR9.

