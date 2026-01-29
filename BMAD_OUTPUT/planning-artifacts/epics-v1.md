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

FR1: Page d'accueil pÃ©dagogique (LuciditÃ© vs SÃ©lection).
FR2: Consentement Ã©clairÃ© obligatoire avant DVP.
FR3: Gestion de compte et droit Ã  l'oubli (effacement complet).
FR4: Saisie structurÃ©e par piliers (Budget, Langue, Logement).
FR5: Calcul du "Reste Ã  Vivre" et dÃ©tection des fragilitÃ©s (ðŸ”´ðŸŸ ðŸŸ¡).
FR6: Gestion de l'Ã©tat "Incomplet" si donnÃ©es critiques manquantes.
FR7: Simulation "What-If" (recalcul immÃ©diat aprÃ¨s changement de variable).
FR8: Dashboard de rÃ©sultats avec justifications explicites et remÃ©diations.
FR9: Export PDF incluant date et version des rÃ¨gles.
FR10: Back-office Admin de gestion des seuils et rÃ©fÃ©rentiels (avec historique d'audit).

### NonFunctional Requirements

NFR1: Indicateur de fraÃ®cheur des donnÃ©es.
NFR2: Versioning des rÃ¨gles mÃ©tier (liaison immuable DVP/Version).
NFR3: Obsolescence des donnÃ©es > 12 mois.
NFR4: Chargement LCP < 1.5s.
NFR5: RÃ©activitÃ© What-If < 500ms.
NFR6: ClartÃ© cognitive (langage simple).

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

FR1: Epic 6 - Page d'accueil pÃ©dagogique (LuciditÃ© vs SÃ©lection)
FR2: Epic 1 - Consentement Ã©clairÃ© obligatoire
FR3: Epic 1 - Gestion de compte et droit Ã  l'oubli
FR4: Epic 2 - Saisie structurÃ©e par piliers (Wizard)
FR5: Epic 3 - Moteur de calcul et dÃ©tection des fragilitÃ©s
FR6: Epic 2 - Gestion de l'Ã©tat "Incomplet"
FR7: Epic 4 - Simulation "What-If" instantanÃ©e
FR8: Epic 4 - Dashboard Cockpit de rÃ©sultats
FR9: Epic 6 - Export PDF certifiÃ©
FR10: Epic 5 - Back-office de gestion des rÃ©fÃ©rentiels
NFR1: Epic 5 - FraÃ®cheur des donnÃ©es
NFR2: Epic 3 - Versioning immuable des rÃ¨gles
NFR3: Epic 5 - Gestion de l'obsolescence
NFR5: Epic 4 - Performance du What-If (<500ms)
Arch-1: Epic 1 - Initialisation T3 Stack
Arch-2: Epic 2 - ImplÃ©mentation modÃ¨le JSONB
Arch-3: Epic 3 - Architecture moteur Database-Driven
Arch-4: Epic 1 - Activation RLS (Safe Space)
UX-1: Epic 2 - Pattern Focus Tunnel
UX-2: Epic 4 - Pattern Cockpit Dashboard
UX-3: Epic 4 - Composants mÃ©tier (Jauge, InsightCards)
ObservabilitÃ©: Epic 3 - Trace de calcul (BoÃ®te Blanche)
i18n: Epic 1 - Fondation multi-langue et formats

## Epic List

## Epic 1: Foundation & Safe Space

Mettre en place l'environnement sÃ©curisÃ© et les fondations techniques du projet. Permet l'authentification, la protection des donnÃ©es via RLS et pose les bases de l'i18n.

### Story 1.1: Initialisation Projet T3 & Page d'Accueil Vitrine

As a visiteur,
I want accÃ©der Ã  une page d'accueil claire qui explique la promesse de TrailLearn,
So that je comprenne la valeur du produit avant de crÃ©er un compte.

**Acceptance Criteria:**

**Given** un environnement de dÃ©veloppement vide.
**When** j'exÃ©cute la commande d'initialisation T3 spÃ©cifiÃ©e dans l'architecture.
**Then** le projet est crÃ©Ã© avec Next.js, tRPC, Prisma et Tailwind.
**And** shadcn/ui est configurÃ© avec les alias et le thÃ¨me de base validÃ©.
**And** une landing page publique existe prÃ©sentant la vision "LuciditÃ© vs SÃ©lection".
**And** un CTA "Commencer / Se connecter" est visible.

### Story 1.2: Authentification Email / Mot de passe

As a utilisateur,
I want crÃ©er un compte et me connecter avec mon email et un mot de passe,
So that j'accÃ¨de de maniÃ¨re sÃ©curisÃ©e Ã  mon espace personnel TrailLearn.

**Acceptance Criteria:**

**Given** un utilisateur non authentifiÃ© sur la landing page.
**When** je remplis le formulaire d'inscription avec email et mot de passe.
**Then** un nouvel utilisateur est crÃ©Ã© en base de donnÃ©es.
**And** une session NextAuth est initialisÃ©e.
**And** je suis redirigÃ© vers le dashboard.

### Story 1.3: Activation du Safe Space (RLS Postgres)

As a utilisateur soucieux de ma vie privÃ©e,
I want que mes donnÃ©es soient isolÃ©es au niveau de la base de donnÃ©es,
So that aucun autre utilisateur ne puisse y accÃ©der par erreur ou malveillance.

**Acceptance Criteria:**

**Given** une base de donnÃ©es PostgreSQL sur Supabase.
**When** j'active les politiques Row Level Security (RLS) sur la table `User`.
**Then** toute requÃªte SQL sans le `user_id` correct dans le contexte est rejetÃ©e par la base de donnÃ©es.

## Epic 2: DVP Core Engine & Wizard

Permettre la saisie fluide et structurÃ©e du dossier de viabilitÃ© via un tunnel "Focus" et le stockage des donnÃ©es dans un modÃ¨le flexible JSONB.

### Story 2.1: ModÃ¨le de DonnÃ©es DVP (Hybride JSONB)

As a dÃ©veloppeur,
I want mettre en place un schÃ©ma de base de donnÃ©es flexible pour le DVP,
So that je puisse stocker des donnÃ©es variÃ©es sans migrations SQL constantes.

**Acceptance Criteria:**

**Given** le schÃ©ma Prisma existant.
**When** j'ajoute le modÃ¨le `DvpRecord` avec une colonne `data` de type `Json`.
**Then** je peux sauvegarder un objet JSON complexe (budget, ville, notes) liÃ© Ã  un utilisateur.
**And** la relation User <-> DvpRecord est Ã©tablie.

### Story 2.2: Tunnel de Saisie - Structure "Focus Tunnel"

As a Ã©tudiant,
I want Ãªtre guidÃ© Ã©tape par Ã©tape dans la saisie de mon dossier,
So that je ne sois pas submergÃ© par la quantitÃ© d'informations demandÃ©e.

**Acceptance Criteria:**

**Given** un utilisateur connectÃ© sur le Dashboard.
**When** je clique sur "DÃ©marrer mon DVP".
**Then** j'accÃ¨de Ã  une interface de type "Wizard" (Focus Tunnel).
**And** je vois une barre de progression claire.
**And** je peux naviguer entre les Ã©tapes (Suivant / PrÃ©cÃ©dent).

### Story 2.3: Saisie Pilier 1 - Projet & Ville

As a Ã©tudiant,
I want dÃ©finir mon projet de mobilitÃ© (Pays, Ville, Type d'Ã©tudes),
So that j'initialise mon dossier.

**Acceptance Criteria:**

**Given** l'Ã©tape 1 du tunnel.
**When** je sÃ©lectionne une ville cible (ex: Paris) et un niveau d'Ã©tudes.
**Then** ces informations sont sauvegardÃ©es temporairement.
**And** le systÃ¨me propose une estimation par dÃ©faut du coÃ»t de la vie pour cette ville.

### Story 2.4: Saisie Pilier 2 - Budget & Garants

As a Ã©tudiant,
I want saisir mes ressources financiÃ¨res (Ã‰pargne, Aides, Garants),
So that le systÃ¨me puisse Ã©valuer ma solvabilitÃ©.

**Acceptance Criteria:**

**Given** l'Ã©tape 2 du tunnel.
**When** je saisis mon Ã©pargne actuelle et le montant mensuel de mes garants.
**Then** je peux voir le total mensuel disponible dans l'interface.

### Story 2.5: Saisie Pilier 3 - Logement

As a Ã©tudiant,
I want dÃ©finir mon mode de logement envisagÃ© (RÃ©sidence, Coloc, Seul) et son coÃ»t,
So that mon budget puisse Ãªtre confrontÃ© Ã  la rÃ©alitÃ© du marchÃ©.

**Acceptance Criteria:**

**Given** l'Ã©tape 3 du tunnel.
**When** je choisis un type de logement.
**Then** le systÃ¨me me demande un coÃ»t estimÃ© (Loyer).
**And** le systÃ¨me affiche une fourchette de prix indicative pour la ville choisie (MockÃ©e pour l'instant).
**And** la saisie est sauvegardÃ©e dans le DVP.
**Note:** Aucun calcul de viabilitÃ© ici, juste la collecte.

### Story 2.6: Saisie Pilier 4 - Langue

As a Ã©tudiant,
I want dÃ©clarer mon niveau de langue pour le pays cible,
So that je puisse vÃ©rifier si je rÃ©ponds aux exigences acadÃ©miques.

**Acceptance Criteria:**

**Given** l'Ã©tape 4 du tunnel.
**When** je sÃ©lectionne mon niveau CECRL (A1-C2) ou un score de test (TOEFL/IELTS).
**Then** l'information est stockÃ©e.
**And** si le niveau est infÃ©rieur au minimum requis (mockÃ©), une alerte visuelle simple apparaÃ®t (Feedback immÃ©diat, pas de blocage).

### Story 2.7: SynthÃ¨se & Validation DVP

As a Ã©tudiant,
I want relire l'ensemble de mes donnÃ©es saisies,
So that je puisse les valider avant de lancer l'analyse complÃ¨te.

**Acceptance Criteria:**

**Given** la fin du tunnel de saisie.
**When** j'arrive sur la synthÃ¨se.
**Then** je vois un rÃ©capitulatif en lecture seule de tous les piliers.
**And** un indicateur de complÃ©tude (FR6) me signale si des champs obligatoires sont vides.
**And** un bouton "Valider mon dossier" permet de passer au Cockpit (Epic 4).
**Note:** Cette page ne contient PAS le diagnostic (ðŸ”´ðŸŸ ðŸŸ¢). Elle sert de point de bascule vers le moteur.

## Epic 3: The Truth Engine

ImplÃ©menter le moteur de calcul dÃ©terministe et transparent. Transforme les saisies en diagnostics prÃ©cis avec une traÃ§abilitÃ© complÃ¨te des rÃ¨gles utilisÃ©es.

### Story 3.1: RÃ©fÃ©rentiel des RÃ¨gles en Base de DonnÃ©es

As a dÃ©veloppeur,
I want stocker les seuils et critÃ¨res mÃ©tier en base de donnÃ©es,
So that je puisse les mettre Ã  jour sans modifier le code.

**Acceptance Criteria:**

**Given** le schÃ©ma Prisma.
**When** j'ajoute le modÃ¨le `BusinessRule`.
**Then** je peux stocker des clÃ©s/valeurs (ex: `paris_min_budget: 800`) liÃ©es Ã  une catÃ©gorie.
**And** chaque rÃ¨gle possÃ¨de une version ou une date de validitÃ©.

### Story 3.2: Moteur de Calcul (Pure Logic)

As a systÃ¨me,
I want calculer le diagnostic de viabilitÃ© (ðŸ”´ðŸŸ ðŸŸ¢) Ã  partir des saisies et des rÃ¨gles actives,
So that je puisse fournir un rÃ©sultat objectif et dÃ©terministe.

**Acceptance Criteria:**

**Given** une fonction pure `calculateViability(data, rules)`.
**When** je lui fournis un DVP et les rÃ¨gles correspondantes.
**Then** elle retourne un statut (Viable, Fragile, Non Viable) basÃ© sur des seuils mathÃ©matiques.
**And** elle calcule le "Reste Ã  Vivre" et les manques financiers Ã©ventuels.

### Story 3.3: Versioning et Snapshot (ImmuabilitÃ©)

As a administrateur,
I want qu'un DVP reste liÃ© Ã  la version des rÃ¨gles utilisÃ©e lors de son calcul,
So that la cohÃ©rence historique soit garantie mÃªme si les prix changent plus tard.

**Acceptance Criteria:**

**Given** un calcul DVP rÃ©ussi.
**When** le rÃ©sultat est sauvegardÃ©.
**Then** l'ID de version des rÃ¨gles utilisÃ©es est stockÃ© de maniÃ¨re immuable dans le `DvpRecord`.

### Story 3.4: Trace de Calcul (ObservabilitÃ© BoÃ®te Blanche)

As a dÃ©veloppeur,
I want accÃ©der au dÃ©tail du raisonnement algorithmique pour un calcul donnÃ©,
So that je puisse expliquer prÃ©cisÃ©ment un rÃ©sultat et faciliter le support.

**Acceptance Criteria:**

**Given** l'exÃ©cution du moteur de calcul.
**When** le diagnostic est gÃ©nÃ©rÃ©.
**Then** un objet de log structurÃ© (CalculTrace) est produit, contenant les entrÃ©es et les rÃ¨gles appliquÃ©es.
**And** cette trace est persistÃ©e en base de donnÃ©es liÃ©e au DVP.

## Epic 4: Cockpit & Simulation

DÃ©livrer la valeur ajoutÃ©e principale : un tableau de bord de pilotage (Cockpit) permettant de visualiser sa situation et de simuler des ajustements (What-If) en temps rÃ©el.

### Story 4.1: Dashboard Cockpit - Vue d'ensemble

As a Ã©tudiant,
I want visualiser mes piliers DVP sur un tableau de bord centralisÃ©,
So that je puisse voir l'Ã©tat d'avancement global de mon projet.

**Acceptance Criteria:**

**Given** un utilisateur avec un DVP en cours ou complÃ©tÃ©.
**When** j'accÃ¨de au dashboard cockpit.
**Then** je vois une barre latÃ©rale avec les 4 piliers et leur Ã©tat de complÃ©tion (%).
**And** la zone centrale affiche les informations structurantes du projet (Ville, Date, Ã‰tudes).

### Story 4.2: Restitution du Diagnostic (ViabilityGauge)

As a Ã©tudiant,
I want voir mon statut de viabilitÃ© de maniÃ¨re visuelle et immÃ©diate,
So that je puisse ressentir instantanÃ©ment si mon projet est sur la bonne voie.

**Acceptance Criteria:**

**Given** un diagnostic calculÃ© par le moteur de vÃ©ritÃ©.
**When** j'ouvre mon Cockpit.
**Then** je vois le composant `ViabilityGauge` affichant la couleur (ðŸ”´ðŸŸ ðŸŸ¢) et l'Ã©tiquette verbale explicite.
**And** un message de synthÃ¨se empathique expliquant le rÃ©sultat est affichÃ© en prioritÃ©.

### Story 4.3: Justifications BoÃ®te Blanche (InsightCards)

As a Ã©tudiant,
I want comprendre les facteurs prÃ©cis qui rendent mon dossier fragile,
So that je sache exactement sur quel levier agir.

**Acceptance Criteria:**

**Given** un diagnostic prÃ©sentant des fragilitÃ©s (ðŸŸ  ou ðŸ”´).
**When** je consulte le Cockpit.
**Then** je vois des `InsightCards` listant les points bloquants ou sensibles.
**And** chaque carte affiche le lien entre la donnÃ©e saisie et la rÃ¨gle mÃ©tier appliquÃ©e.

### Story 4.4: Simulateur What-If - Mode Interactif

As a Ã©tudiant,
I want tester des scÃ©narios alternatifs sans modifier mon dossier officiel,
So that je puisse explorer librement les solutions pour rendre mon projet viable.

**Acceptance Criteria:**

**Given** le Cockpit ouvert.
**When** j'active le volet "Simulateur What-If".
**Then** je peux ajuster des variables (Ville, Type de logement, Ã‰pargne) via des contrÃ´les interactifs.
**And** la `ViabilityGauge` se met Ã  jour immÃ©diatement (<500ms) pour reflÃ©ter l'impact.

## Epic 5: Standard of Truth Admin

Fournir les outils opÃ©rationnels pour maintenir les rÃ©fÃ©rentiels mÃ©tiers (loyers, seuils) Ã  jour, avec un historique d'audit et de versioning.

### Story 5.1: Dashboard Admin - Gestion des RÃ©fÃ©rentiels

As a administrateur,
I want visualiser l'ensemble des rÃ©fÃ©rentiels (Villes, Piliers, Seuils),
So that j'aie une vue d'ensemble de la "vÃ©ritÃ©" du systÃ¨me.

**Acceptance Criteria:**

**Given** un utilisateur authentifiÃ© avec le rÃ´le `ADMIN`.
**When** j'accÃ¨de Ã  l'espace `/admin`.
**Then** je vois une liste catÃ©gorisÃ©e des rÃ¨gles mÃ©tier actives.
**And** la date de derniÃ¨re mise Ã  jour de chaque rÃ©fÃ©rentiel est visible.

### Story 5.2: Ã‰dition des RÃ¨gles & Seuils mÃ©tier

As a administrateur,
I want modifier une valeur mÃ©tier spÃ©cifique (ex: loyer moyen),
So that les futurs diagnostics DVP soient basÃ©s sur la rÃ©alitÃ© actuelle.

**Acceptance Criteria:**

**Given** l'interface d'Ã©dition d'une rÃ¨gle.
**When** je modifie une valeur et soumets le formulaire.
**Then** le systÃ¨me prÃ©-enregistre le changement sans Ã©craser la version prÃ©cÃ©dente.
**And** un Ã©cran de confirmation affiche le changement d'Ã©tat.

### Story 5.3: Audit Trail & Justification des changements

As a administrateur,
I want justifier chaque modification de rÃ¨gle (source, motif),
So that je conserve une traÃ§abilitÃ© complÃ¨te pour l'audit et la conformitÃ©.

**Acceptance Criteria:**

**Given** une validation de changement de rÃ¨gle.
**When** je valide dÃ©finitivement la modification.
**Then** le systÃ¨me m'impose de saisir un motif ou une source (ex: "Source INSEE").
**And** l'auteur, le timestamp et le motif sont enregistrÃ©s de maniÃ¨re immuable.

## Epic 6: Sharing & Export

Finaliser l'expÃ©rience en permettant l'export formel du diagnostic (PDF) et en exposant la vision produit via la landing page pÃ©dagogique.

### Story 6.1: Landing Page PÃ©dagogique (La Vision)

As a visiteur,
I want comprendre la diffÃ©rence entre sÃ©lection et luciditÃ©,
So that je saisisse la valeur unique du DVP TrailLearn.

**Acceptance Criteria:**

**Given** la landing page publique.
**When** je la consulte.
**Then** elle expose les concepts de "BoÃ®te Blanche" et de "ResponsabilitÃ© Structurelle".
**And** elle prÃ©sente le DVP comme l'unitÃ© de vÃ©ritÃ© du projet.

### Story 6.2: GÃ©nÃ©ration Export PDF du DVP

As a Ã©tudiant,
I want tÃ©lÃ©charger un rÃ©sumÃ© officiel de mon diagnostic,
So that je puisse le partager avec mes parents ou ma banque.

**Acceptance Criteria:**

**Given** un DVP complÃ©tÃ© dans le Cockpit.
**When** je clique sur "TÃ©lÃ©charger mon Dossier PDF".
**Then** un fichier PDF est gÃ©nÃ©rÃ© et tÃ©lÃ©chargÃ© sur mon appareil.
**And** il contient le statut visuel (ðŸ”´ðŸŸ ðŸŸ¢), le dÃ©tail des piliers et les recommandations.

### Story 6.3: Preuve de VÃ©ritÃ© (Version & Date)

As a tiers de confiance,
I want que chaque PDF exportÃ© affiche la date et la version des rÃ¨gles utilisÃ©es,
So that l'intÃ©gritÃ© et la fraÃ®cheur du document soient garanties.

**Acceptance Criteria:**

**Given** un export PDF gÃ©nÃ©rÃ© par le systÃ¨me.
**When** je consulte le document.
**Then** la date du calcul et l'ID de version des rÃ¨gles (Standard de VÃ©ritÃ©) sont affichÃ©s.
**And** un identifiant unique de vÃ©rification est prÃ©sent en pied de page.


### Epic 2: DVP Core Engine & Wizard
Permettre la saisie fluide et structurÃ©e du dossier de viabilitÃ© via un tunnel "Focus" et le stockage des donnÃ©es dans un modÃ¨le flexible JSONB.
**FRs covered:** FR4, FR6, UX-1, Arch-2.

### Epic 3: The Truth Engine
ImplÃ©menter le moteur de calcul dÃ©terministe et transparent. Transforme les saisies en diagnostics prÃ©cis avec une traÃ§abilitÃ© complÃ¨te des rÃ¨gles utilisÃ©es.
**FRs covered:** FR5, NFR2, Arch-3, ObservabilitÃ©.

### Epic 4: Cockpit & Simulation
DÃ©livrer la valeur ajoutÃ©e principale : un tableau de bord de pilotage (Cockpit) permettant de visualiser sa situation et de simuler des ajustements (What-If) en temps rÃ©el.
**FRs covered:** FR7, FR8, UX-2, UX-3, NFR5.

### Epic 5: Standard of Truth Admin
Fournir les outils opÃ©rationnels pour maintenir les rÃ©fÃ©rentiels mÃ©tiers (loyers, seuils) Ã  jour, avec un historique d'audit et de versioning.
**FRs covered:** FR10, NFR1, NFR3.

### Epic 6: Sharing & Export
Finaliser l'expÃ©rience en permettant l'export formel du diagnostic (PDF) et en exposant la vision produit via la landing page pÃ©dagogique.
**FRs covered:** FR1, FR9.
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

FR1: Page d'accueil pÃ©dagogique (LuciditÃ© vs SÃ©lection).
FR2: Consentement Ã©clairÃ© obligatoire avant DVP.
FR3: Gestion de compte et droit Ã  l'oubli (effacement complet).
FR4: Saisie structurÃ©e par piliers (Budget, Langue, Logement).
FR5: Calcul du "Reste Ã  Vivre" et dÃ©tection des fragilitÃ©s (ðŸ”´ðŸŸ ðŸŸ¡).
FR6: Gestion de l'Ã©tat "Incomplet" si donnÃ©es critiques manquantes.
FR7: Simulation "What-If" (recalcul immÃ©diat aprÃ¨s changement de variable).
FR8: Dashboard de rÃ©sultats avec justifications explicites et remÃ©diations.
FR9: Export PDF incluant date et version des rÃ¨gles.
FR10: Back-office Admin de gestion des seuils et rÃ©fÃ©rentiels (avec historique d'audit).

### NonFunctional Requirements

NFR1: Indicateur de fraÃ®cheur des donnÃ©es.
NFR2: Versioning des rÃ¨gles mÃ©tier (liaison immuable DVP/Version).
NFR3: Obsolescence des donnÃ©es > 12 mois.
NFR4: Chargement LCP < 1.5s.
NFR5: RÃ©activitÃ© What-If < 500ms.
NFR6: ClartÃ© cognitive (langage simple).

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

FR1: Epic 6 - Page d'accueil pÃ©dagogique (LuciditÃ© vs SÃ©lection)
FR2: Epic 1 - Consentement Ã©clairÃ© obligatoire
FR3: Epic 1 - Gestion de compte et droit Ã  l'oubli
FR4: Epic 2 - Saisie structurÃ©e par piliers (Wizard)
FR5: Epic 3 - Moteur de calcul et dÃ©tection des fragilitÃ©s
FR6: Epic 2 - Gestion de l'Ã©tat "Incomplet"
FR7: Epic 4 - Simulation "What-If" instantanÃ©e
FR8: Epic 4 - Dashboard Cockpit de rÃ©sultats
FR9: Epic 6 - Export PDF certifiÃ©
FR10: Epic 5 - Back-office de gestion des rÃ©fÃ©rentiels
NFR1: Epic 5 - FraÃ®cheur des donnÃ©es
NFR2: Epic 3 - Versioning immuable des rÃ¨gles
NFR3: Epic 5 - Gestion de l'obsolescence
NFR5: Epic 4 - Performance du What-If (<500ms)
Arch-1: Epic 1 - Initialisation T3 Stack
Arch-2: Epic 2 - ImplÃ©mentation modÃ¨le JSONB
Arch-3: Epic 3 - Architecture moteur Database-Driven
Arch-4: Epic 1 - Activation RLS (Safe Space)
UX-1: Epic 2 - Pattern Focus Tunnel
UX-2: Epic 4 - Pattern Cockpit Dashboard
UX-3: Epic 4 - Composants mÃ©tier (Jauge, InsightCards)
ObservabilitÃ©: Epic 3 - Trace de calcul (BoÃ®te Blanche)
i18n: Epic 1 - Fondation multi-langue et formats

## Epic List

## Epic 1: Foundation & Safe Space

Mettre en place l'environnement sÃ©curisÃ© et les fondations techniques du projet. Permet l'authentification, la protection des donnÃ©es via RLS et pose les bases de l'i18n.

### Story 1.1: Initialisation Projet T3 & Page d'Accueil Vitrine

As a visiteur,
I want accÃ©der Ã  une page d'accueil claire qui explique la promesse de TrailLearn,
So that je comprenne la valeur du produit avant de crÃ©er un compte.

**Acceptance Criteria:**

**Given** un environnement de dÃ©veloppement vide.
**When** j'exÃ©cute la commande d'initialisation T3 spÃ©cifiÃ©e dans l'architecture.
**Then** le projet est crÃ©Ã© avec Next.js, tRPC, Prisma et Tailwind.
**And** shadcn/ui est configurÃ© avec les alias et le thÃ¨me de base validÃ©.
**And** une landing page publique existe prÃ©sentant la vision "LuciditÃ© vs SÃ©lection".
**And** un CTA "Commencer / Se connecter" est visible.

### Story 1.2: Authentification Email / Mot de passe

As a utilisateur,
I want crÃ©er un compte et me connecter avec mon email et un mot de passe,
So that j'accÃ¨de de maniÃ¨re sÃ©curisÃ©e Ã  mon espace personnel TrailLearn.

**Acceptance Criteria:**

**Given** un utilisateur non authentifiÃ© sur la landing page.
**When** je remplis le formulaire d'inscription avec email et mot de passe.
**Then** un nouvel utilisateur est crÃ©Ã© en base de donnÃ©es.
**And** une session NextAuth est initialisÃ©e.
**And** je suis redirigÃ© vers le dashboard.

### Story 1.3: Activation du Safe Space (RLS Postgres)

As a utilisateur soucieux de ma vie privÃ©e,
I want que mes donnÃ©es soient isolÃ©es au niveau de la base de donnÃ©es,
So that aucun autre utilisateur ne puisse y accÃ©der par erreur ou malveillance.

**Acceptance Criteria:**

**Given** une base de donnÃ©es PostgreSQL sur Supabase.
**When** j'active les politiques Row Level Security (RLS) sur la table `User`.
**Then** toute requÃªte SQL sans le `user_id` correct dans le contexte est rejetÃ©e par la base de donnÃ©es.

## Epic 2: DVP Core Engine & Wizard

Permettre la saisie fluide et structurÃ©e du dossier de viabilitÃ© via un tunnel "Focus" et le stockage des donnÃ©es dans un modÃ¨le flexible JSONB.

### Story 2.1: ModÃ¨le de DonnÃ©es DVP (Hybride JSONB)

As a dÃ©veloppeur,
I want mettre en place un schÃ©ma de base de donnÃ©es flexible pour le DVP,
So that je puisse stocker des donnÃ©es variÃ©es sans migrations SQL constantes.

**Acceptance Criteria:**

**Given** le schÃ©ma Prisma existant.
**When** j'ajoute le modÃ¨le `DvpRecord` avec une colonne `data` de type `Json`.
**Then** je peux sauvegarder un objet JSON complexe (budget, ville, notes) liÃ© Ã  un utilisateur.
**And** la relation User <-> DvpRecord est Ã©tablie.

### Story 2.2: Tunnel de Saisie - Structure "Focus Tunnel"

As a Ã©tudiant,
I want Ãªtre guidÃ© Ã©tape par Ã©tape dans la saisie de mon dossier,
So that je ne sois pas submergÃ© par la quantitÃ© d'informations demandÃ©e.

**Acceptance Criteria:**

**Given** un utilisateur connectÃ© sur le Dashboard.
**When** je clique sur "DÃ©marrer mon DVP".
**Then** j'accÃ¨de Ã  une interface de type "Wizard" (Focus Tunnel).
**And** je vois une barre de progression claire.
**And** je peux naviguer entre les Ã©tapes (Suivant / PrÃ©cÃ©dent).

### Story 2.3: Saisie Pilier 1 - Projet & Ville

As a Ã©tudiant,
I want dÃ©finir mon projet de mobilitÃ© (Pays, Ville, Type d'Ã©tudes),
So that j'initialise mon dossier.

**Acceptance Criteria:**

**Given** l'Ã©tape 1 du tunnel.
**When** je sÃ©lectionne une ville cible (ex: Paris) et un niveau d'Ã©tudes.
**Then** ces informations sont sauvegardÃ©es temporairement.
**And** le systÃ¨me propose une estimation par dÃ©faut du coÃ»t de la vie pour cette ville.

### Story 2.4: Saisie Pilier 2 - Budget & Garants

As a Ã©tudiant,
I want saisir mes ressources financiÃ¨res (Ã‰pargne, Aides, Garants),
So that le systÃ¨me puisse Ã©valuer ma solvabilitÃ©.

**Acceptance Criteria:**

**Given** l'Ã©tape 2 du tunnel.
**When** je saisis mon Ã©pargne actuelle et le montant mensuel de mes garants.
**Then** je peux voir le total mensuel disponible dans l'interface.

### Story 2.5: Saisie Pilier 3 - Logement

As a Ã©tudiant,
I want dÃ©finir mon mode de logement envisagÃ© (RÃ©sidence, Coloc, Seul) et son coÃ»t,
So that mon budget puisse Ãªtre confrontÃ© Ã  la rÃ©alitÃ© du marchÃ©.

**Acceptance Criteria:**

**Given** l'Ã©tape 3 du tunnel.
**When** je choisis un type de logement.
**Then** le systÃ¨me me demande un coÃ»t estimÃ© (Loyer).
**And** le systÃ¨me affiche une fourchette de prix indicative pour la ville choisie (MockÃ©e pour l'instant).
**And** la saisie est sauvegardÃ©e dans le DVP.
**Note:** Aucun calcul de viabilitÃ© ici, juste la collecte.

### Story 2.6: Saisie Pilier 4 - Langue

As a Ã©tudiant,
I want dÃ©clarer mon niveau de langue pour le pays cible,
So that je puisse vÃ©rifier si je rÃ©ponds aux exigences acadÃ©miques.

**Acceptance Criteria:**

**Given** l'Ã©tape 4 du tunnel.
**When** je sÃ©lectionne mon niveau CECRL (A1-C2) ou un score de test (TOEFL/IELTS).
**Then** l'information est stockÃ©e.
**And** si le niveau est infÃ©rieur au minimum requis (mockÃ©), une alerte visuelle simple apparaÃ®t (Feedback immÃ©diat, pas de blocage).

### Story 2.7: SynthÃ¨se & Validation DVP

As a Ã©tudiant,
I want relire l'ensemble de mes donnÃ©es saisies,
So that je puisse les valider avant de lancer l'analyse complÃ¨te.

**Acceptance Criteria:**

**Given** la fin du tunnel de saisie.
**When** j'arrive sur la synthÃ¨se.
**Then** je vois un rÃ©capitulatif en lecture seule de tous les piliers.
**And** un indicateur de complÃ©tude (FR6) me signale si des champs obligatoires sont vides.
**And** un bouton "Valider mon dossier" permet de passer au Cockpit (Epic 4).
**Note:** Cette page ne contient PAS le diagnostic (ðŸ”´ðŸŸ ðŸŸ¢). Elle sert de point de bascule vers le moteur.

## Epic 3: The Truth Engine

ImplÃ©menter le moteur de calcul dÃ©terministe et transparent. Transforme les saisies en diagnostics prÃ©cis avec une traÃ§abilitÃ© complÃ¨te des rÃ¨gles utilisÃ©es.

### Story 3.1: RÃ©fÃ©rentiel des RÃ¨gles en Base de DonnÃ©es

As a dÃ©veloppeur,
I want stocker les seuils et critÃ¨res mÃ©tier en base de donnÃ©es,
So that je puisse les mettre Ã  jour sans modifier le code.

**Acceptance Criteria:**

**Given** le schÃ©ma Prisma.
**When** j'ajoute le modÃ¨le `BusinessRule`.
**Then** je peux stocker des clÃ©s/valeurs (ex: `paris_min_budget: 800`) liÃ©es Ã  une catÃ©gorie.
**And** chaque rÃ¨gle possÃ¨de une version ou une date de validitÃ©.

### Story 3.2: Moteur de Calcul (Pure Logic)

As a systÃ¨me,
I want calculer le diagnostic de viabilitÃ© (ðŸ”´ðŸŸ ðŸŸ¢) Ã  partir des saisies et des rÃ¨gles actives,
So that je puisse fournir un rÃ©sultat objectif et dÃ©terministe.

**Acceptance Criteria:**

**Given** une fonction pure `calculateViability(data, rules)`.
**When** je lui fournis un DVP et les rÃ¨gles correspondantes.
**Then** elle retourne un statut (Viable, Fragile, Non Viable) basÃ© sur des seuils mathÃ©matiques.
**And** elle calcule le "Reste Ã  Vivre" et les manques financiers Ã©ventuels.

### Story 3.3: Versioning et Snapshot (ImmuabilitÃ©)

As a administrateur,
I want qu'un DVP reste liÃ© Ã  la version des rÃ¨gles utilisÃ©e lors de son calcul,
So that la cohÃ©rence historique soit garantie mÃªme si les prix changent plus tard.

**Acceptance Criteria:**

**Given** un calcul DVP rÃ©ussi.
**When** le rÃ©sultat est sauvegardÃ©.
**Then** l'ID de version des rÃ¨gles utilisÃ©es est stockÃ© de maniÃ¨re immuable dans le `DvpRecord`.

### Story 3.4: Trace de Calcul (ObservabilitÃ© BoÃ®te Blanche)

As a dÃ©veloppeur,
I want accÃ©der au dÃ©tail du raisonnement algorithmique pour un calcul donnÃ©,
So that je puisse expliquer prÃ©cisÃ©ment un rÃ©sultat et faciliter le support.

**Acceptance Criteria:**

**Given** l'exÃ©cution du moteur de calcul.
**When** le diagnostic est gÃ©nÃ©rÃ©.
**Then** un objet de log structurÃ© (CalculTrace) est produit, contenant les entrÃ©es et les rÃ¨gles appliquÃ©es.
**And** cette trace est persistÃ©e en base de donnÃ©es liÃ©e au DVP.

## Epic 4: Cockpit & Simulation

DÃ©livrer la valeur ajoutÃ©e principale : un tableau de bord de pilotage (Cockpit) permettant de visualiser sa situation et de simuler des ajustements (What-If) en temps rÃ©el.

### Story 4.1: Dashboard Cockpit - Vue d'ensemble

As a Ã©tudiant,
I want visualiser mes piliers DVP sur un tableau de bord centralisÃ©,
So that je puisse voir l'Ã©tat d'avancement global de mon projet.

**Acceptance Criteria:**

**Given** un utilisateur avec un DVP en cours ou complÃ©tÃ©.
**When** j'accÃ¨de au dashboard cockpit.
**Then** je vois une barre latÃ©rale avec les 4 piliers et leur Ã©tat de complÃ©tion (%).
**And** la zone centrale affiche les informations structurantes du projet (Ville, Date, Ã‰tudes).

### Story 4.2: Restitution du Diagnostic (ViabilityGauge)

As a Ã©tudiant,
I want voir mon statut de viabilitÃ© de maniÃ¨re visuelle et immÃ©diate,
So that je puisse ressentir instantanÃ©ment si mon projet est sur la bonne voie.

**Acceptance Criteria:**

**Given** un diagnostic calculÃ© par le moteur de vÃ©ritÃ©.
**When** j'ouvre mon Cockpit.
**Then** je vois le composant `ViabilityGauge` affichant la couleur (ðŸ”´ðŸŸ ðŸŸ¢) et l'Ã©tiquette verbale explicite.
**And** un message de synthÃ¨se empathique expliquant le rÃ©sultat est affichÃ© en prioritÃ©.

### Story 4.3: Justifications BoÃ®te Blanche (InsightCards)

As a Ã©tudiant,
I want comprendre les facteurs prÃ©cis qui rendent mon dossier fragile,
So that je sache exactement sur quel levier agir.

**Acceptance Criteria:**

**Given** un diagnostic prÃ©sentant des fragilitÃ©s (ðŸŸ  ou ðŸ”´).
**When** je consulte le Cockpit.
**Then** je vois des `InsightCards` listant les points bloquants ou sensibles.
**And** chaque carte affiche le lien entre la donnÃ©e saisie et la rÃ¨gle mÃ©tier appliquÃ©e.

### Story 4.4: Simulateur What-If - Mode Interactif

As a Ã©tudiant,
I want tester des scÃ©narios alternatifs sans modifier mon dossier officiel,
So that je puisse explorer librement les solutions pour rendre mon projet viable.

**Acceptance Criteria:**

**Given** le Cockpit ouvert.
**When** j'active le volet "Simulateur What-If".
**Then** je peux ajuster des variables (Ville, Type de logement, Ã‰pargne) via des contrÃ´les interactifs.
**And** la `ViabilityGauge` se met Ã  jour immÃ©diatement (<500ms) pour reflÃ©ter l'impact.

## Epic 5: Standard of Truth Admin

Fournir les outils opÃ©rationnels pour maintenir les rÃ©fÃ©rentiels mÃ©tiers (loyers, seuils) Ã  jour, avec un historique d'audit et de versioning.

### Story 5.1: Dashboard Admin - Gestion des RÃ©fÃ©rentiels

As a administrateur,
I want visualiser l'ensemble des rÃ©fÃ©rentiels (Villes, Piliers, Seuils),
So that j'aie une vue d'ensemble de la "vÃ©ritÃ©" du systÃ¨me.

**Acceptance Criteria:**

**Given** un utilisateur authentifiÃ© avec le rÃ´le `ADMIN`.
**When** j'accÃ¨de Ã  l'espace `/admin`.
**Then** je vois une liste catÃ©gorisÃ©e des rÃ¨gles mÃ©tier actives.
**And** la date de derniÃ¨re mise Ã  jour de chaque rÃ©fÃ©rentiel est visible.

### Story 5.2: Ã‰dition des RÃ¨gles & Seuils mÃ©tier

As a administrateur,
I want modifier une valeur mÃ©tier spÃ©cifique (ex: loyer moyen),
So that les futurs diagnostics DVP soient basÃ©s sur la rÃ©alitÃ© actuelle.

**Acceptance Criteria:**

**Given** l'interface d'Ã©dition d'une rÃ¨gle.
**When** je modifie une valeur et soumets le formulaire.
**Then** le systÃ¨me prÃ©-enregistre le changement sans Ã©craser la version prÃ©cÃ©dente.
**And** un Ã©cran de confirmation affiche le changement d'Ã©tat.

### Story 5.3: Audit Trail & Justification des changements

As a administrateur,
I want justifier chaque modification de rÃ¨gle (source, motif),
So that je conserve une traÃ§abilitÃ© complÃ¨te pour l'audit et la conformitÃ©.

**Acceptance Criteria:**

**Given** une validation de changement de rÃ¨gle.
**When** je valide dÃ©finitivement la modification.
**Then** le systÃ¨me m'impose de saisir un motif ou une source (ex: "Source INSEE").
**And** l'auteur, le timestamp et le motif sont enregistrÃ©s de maniÃ¨re immuable.

## Epic 6: Sharing & Export

Finaliser l'expÃ©rience en permettant l'export formel du diagnostic (PDF) et en exposant la vision produit via la landing page pÃ©dagogique.

### Story 6.1: Landing Page PÃ©dagogique (La Vision)

As a visiteur,
I want comprendre la diffÃ©rence entre sÃ©lection et luciditÃ©,
So that je saisisse la valeur unique du DVP TrailLearn.

**Acceptance Criteria:**

**Given** la landing page publique.
**When** je la consulte.
**Then** elle expose les concepts de "BoÃ®te Blanche" et de "ResponsabilitÃ© Structurelle".
**And** elle prÃ©sente le DVP comme l'unitÃ© de vÃ©ritÃ© du projet.

### Story 6.2: GÃ©nÃ©ration Export PDF du DVP

As a Ã©tudiant,
I want tÃ©lÃ©charger un rÃ©sumÃ© officiel de mon diagnostic,
So that je puisse le partager avec mes parents ou ma banque.

**Acceptance Criteria:**

**Given** un DVP complÃ©tÃ© dans le Cockpit.
**When** je clique sur "TÃ©lÃ©charger mon Dossier PDF".
**Then** un fichier PDF est gÃ©nÃ©rÃ© et tÃ©lÃ©chargÃ© sur mon appareil.
**And** il contient le statut visuel (ðŸ”´ðŸŸ ðŸŸ¢), le dÃ©tail des piliers et les recommandations.

### Story 6.3: Preuve de VÃ©ritÃ© (Version & Date)

As a tiers de confiance,
I want que chaque PDF exportÃ© affiche la date et la version des rÃ¨gles utilisÃ©es,
So that l'intÃ©gritÃ© et la fraÃ®cheur du document soient garanties.

**Acceptance Criteria:**

**Given** un export PDF gÃ©nÃ©rÃ© par le systÃ¨me.
**When** je consulte le document.
**Then** la date du calcul et l'ID de version des rÃ¨gles (Standard de VÃ©ritÃ©) sont affichÃ©s.
**And** un identifiant unique de vÃ©rification est prÃ©sent en pied de page.


### Epic 2: DVP Core Engine & Wizard
Permettre la saisie fluide et structurÃ©e du dossier de viabilitÃ© via un tunnel "Focus" et le stockage des donnÃ©es dans un modÃ¨le flexible JSONB.
**FRs covered:** FR4, FR6, UX-1, Arch-2.

### Epic 3: The Truth Engine
ImplÃ©menter le moteur de calcul dÃ©terministe et transparent. Transforme les saisies en diagnostics prÃ©cis avec une traÃ§abilitÃ© complÃ¨te des rÃ¨gles utilisÃ©es.
**FRs covered:** FR5, NFR2, Arch-3, ObservabilitÃ©.

### Epic 4: Cockpit & Simulation
DÃ©livrer la valeur ajoutÃ©e principale : un tableau de bord de pilotage (Cockpit) permettant de visualiser sa situation et de simuler des ajustements (What-If) en temps rÃ©el.
**FRs covered:** FR7, FR8, UX-2, UX-3, NFR5.

### Epic 5: Standard of Truth Admin
Fournir les outils opÃ©rationnels pour maintenir les rÃ©fÃ©rentiels mÃ©tiers (loyers, seuils) Ã  jour, avec un historique d'audit et de versioning.
**FRs covered:** FR10, NFR1, NFR3.

### Epic 6: Sharing & Export
Finaliser l'expÃ©rience en permettant l'export formel du diagnostic (PDF) et en exposant la vision produit via la landing page pÃ©dagogique.
**FRs covered:** FR1, FR9.
---
stepsCompleted: ["step-01-validate-prerequisites", "step-02-design-epics", "step-03-create-stories", "step-04-final-validation"]
inputDocuments: ["BMAD_OUTPUT/planning-artifacts/prd-v2.md", "BMAD_OUTPUT/planning-artifacts/architecture.md", "BMAD_OUTPUT/planning-artifacts/ux-design-specification.md"]
---

# TrailLearn - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for TrailLearn, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**1. Conversation & MaÃ¯eutique (Core IA)**
*   **FR1**: L'utilisateur peut engager une conversation exploratoire avec le Coach IA pour dÃ©finir son projet acadÃ©mique/professionnel.
*   **FR2**: Le systÃ¨me peut dÃ©tecter les intentions contradictoires (ex: budget faible vs ambition Ã©levÃ©e) au sein du discours utilisateur.
*   **FR3**: Le Coach IA peut reformuler les tensions dÃ©tectÃ©es sans jugement moral ni validation d'incohÃ©rence.
*   **FR4**: L'utilisateur peut demander une explication sur un diagnostic ou un changement d'indice.
*   **FR5**: L'utilisateur peut valider ou rejeter manuellement une analyse proposÃ©e par l'IA.

**2. Moteur d'Indices (Data & Analytics)**
*   **FR6**: Le systÃ¨me peut calculer l'Indice de ClartÃ© en temps rÃ©el basÃ© sur la complÃ©tude et la cohÃ©rence des rÃ©ponses.
*   **FR7**: Le systÃ¨me peut calculer l'Indice de Traction (mÃ©trique interne) basÃ© sur la dynamique d'exÃ©cution des tÃ¢ches.
*   **FR8**: Le systÃ¨me peut historiser chaque changement d'indice avec son motif (Audit Log).
*   **FR9**: L'utilisateur peut visualiser l'Ã©volution de son Indice de ClartÃ© sous forme de jauge visuelle.

**3. Gestion des Ã‰tats de Sortie (UX Orientation)**
*   **FR10**: Le systÃ¨me peut gÃ©nÃ©rer une fiche DVP-B structurÃ©e Ã  la fin d'une session conversationnelle.
*   **FR11**: L'utilisateur peut sauvegarder plusieurs hypothÃ¨ses de projets (scÃ©narios ramifiÃ©s) simultanÃ©ment.
*   **FR12**: L'utilisateur peut quitter une session incomplÃ¨te tout en conservant ses fragments de prÃ©fÃ©rences (Persistance partielle).
*   **FR13**: Le systÃ¨me peut proposer une reprise de session intelligente basÃ©e sur les derniers fragments sauvegardÃ©s.

**4. Pilotage de l'ExÃ©cution (Focus Mode)**
*   **FR14**: L'utilisateur peut activer un "Focus Mode" masquant le backlog global pour ne montrer que les 3 tÃ¢ches prioritaires.
*   **FR15**: L'utilisateur peut soumettre une "Preuve Facultative" (fichier ou lien) pour chaque tÃ¢che terminÃ©e.
*   **FR16**: L'utilisateur peut fournir un feedback narratif ("Journal de bord") Ã  la clÃ´ture d'une tÃ¢che.
*   **FR17**: L'utilisateur peut "RÃ©optimiser" son plan d'action (dÃ©caler/supprimer les tÃ¢ches en suspens) via une interaction simplifiÃ©e.

**5. Gouvernance & Ops (Admin)**
*   **FR18**: L'administrateur peut mettre Ã  jour les rÃ¨gles de calcul des indices avec gestion de version.
*   **FR19**: Le systÃ¨me peut dÃ©clencher une notification de mise Ã  jour des indices utilisateur suite Ã  une modification globale des rÃ¨gles admin.
*   **FR20**: Le systÃ¨me peut dÃ©clencher des messages de relance intelligents basÃ©s sur l'Indice de Traction et la durÃ©e d'inactivitÃ©.

### NonFunctional Requirements

**Performance**
*   **NFR1**: Time to First Token (TTFT) < 1s (Streaming).
*   **NFR2**: Mise Ã  jour des indices perÃ§ue en < 500ms.

**Reliability & Availability**
*   **NFR5 (Browser Matrix)**: Support prioritaire et tests automatisÃ©s sur **Chrome Mobile (Android Latest)** et **Safari iOS (Latest)**. Support Desktop en fallback.

**Security & Privacy**
*   **NFR3**: Pseudonymisation systÃ©matique des donnÃ©es envoyÃ©es aux LLM externes.
*   **NFR4**: Ã‰tanchÃ©itÃ© stricte des contextes de session entre utilisateurs.

**LLM Governance**
*   **NFR6 (Cost Control)**: Plafond de tokens par session utilisateur configurable via Admin pour maÃ®triser les coÃ»ts API (ex: max 4k tokens/session).
*   **NFR7 (Latency Guardrail)**: Timeout strict de 5s pour les appels LLM non-streamÃ©s (fallback rÃ¨gle statique).

### Additional Requirements

**Architecture Requirements**
*   **Initialization**: Use existing Next.js + tRPC + Prisma + Supabase stack.
*   **Core AI**: Architecture RAG LÃ©gÃ¨re + Streaming SSE via Vercel AI SDK.
*   **Data Model**: Extension Prisma avec `ClarityIndex`, `ActionPlan`, `Task`.
*   **Project Structure**: `features/ai-coach` and `features/execution` isolation.
*   **Guardrails**: Implement `lib/llm-guardrails.ts` for AI safety (Non-Closure principle).

**UX Requirements**
*   **ChatInterface**: Immersive full-screen mobile view, "Thinking" indicator.
*   **FocusDashboard**: Restrictive view (Top 3 Actions only), collapsible backlog.
*   **ViabilityGauge**: Visual representation of Clarity Index.
*   **InsightCard**: "White Box" explanation for index changes.
*   **Mobile-First**: Priority on mobile interactions (thumb-friendly).

### FR Coverage Map

*   **Epic 1**: FR1, FR2, FR3, FR4, FR5, FR6, FR8, FR9.
*   **Epic 2**: FR10, FR11, FR12, FR13.
*   **Epic 3**: FR7, FR14, FR15, FR16, FR17.
*   **Epic 4**: FR18, FR19, FR20.

## Epic List

### Epic 1: Socle Conversationnel & Miroir Lucide (Orientation)
Permettre Ã  l'utilisateur d'engager une conversation introspective avec le Coach IA pour clarifier son projet, dÃ©tecter ses contradictions et visualiser sa maturitÃ© via l'Indice de ClartÃ©.

### Epic 2: Finalisation & Sortie de Session (Orientation)
Transformer l'exploration conversationnelle en un livrable DVP-B structurÃ©, gÃ©rer les scÃ©narios multiples et assurer la continuitÃ© du travail via la persistance des sessions.

### Epic 3: ExÃ©cution AssistÃ©e & Focus Mode (ExÃ©cution)
RÃ©duire la charge mentale de l'action en isolant les prochaines Ã©tapes prioritaires, en permettant la preuve par l'utilitÃ© et en valorisant l'apprentissage narratif.

### Epic 4: Gouvernance & Pilotage (Admin)
Offrir Ã  l'administrateur le contrÃ´le sur les standards de vÃ©ritÃ© (rÃ¨gles) et automatiser le suivi de l'engagement utilisateur.

---

## Epic 1: Socle Conversationnel & Miroir Lucide (Orientation)

### Story 1.1: Initialisation de l'API Chat & Streaming SSE
As a system,
I want to initialize the streaming infrastructure with Vercel AI SDK,
So that I can provide real-time word-by-word responses from the AI Coach.

**Acceptance Criteria:**
**Given** a user message,
**When** the server calls the LLM,
**Then** tokens are streamed back to the client in real-time (SSE) with a TTFT < 1s.

### Story 1.2: Le Miroir Lucide (Prompt System & Contradictions)
As a student,
I want the AI Coach to identify my project contradictions (e.g. budget vs ambition),
So that I can consciously deliberate on my choices without being judged.

**Acceptance Criteria:**
**Given** a contradictory intention (e.g. 5kâ‚¬ budget for USA top school),
**When** the AI responds,
**Then** it must highlight the tension using conditional language and avoid definitive rejection verbs ("Impossible", "Rejected").

### Story 1.3: Calcul de l'Indice de ClartÃ© V1 (Real-time)
As a student,
I want to see my Clarity Index evolve during the conversation,
So that I can measure the maturity of my project project in real-time.

**Acceptance Criteria:**
**Given** a validated user input during chat,
**When** the rule engine executes,
**Then** the index is updated in < 500ms and saved in the `ClarityIndex` table.

### Story 1.4: Jauge de ViabilitÃ© & Insight Cards (UI)
As a student,
I want to visualize my clarity index as a gauge with clear explanations,
So that I understand exactly why my project status changed.

**Acceptance Criteria:**
**Given** an index change,
**When** the `ViabilityGauge` component renders,
**Then** it displays the correct color code (RED/AMBER/GREEN) and an `InsightCard` provides the deterministic reason for the score.

---

## Epic 2: Finalisation & Sortie de Session (Orientation)

### Story 2.1: GÃ©nÃ©ration de la Fiche DVP-B & HypothÃ¨ses
As a student,
I want my conversation to be synthesized into a structured DVP-B project,
So that I can move from exploration to execution.

**Acceptance Criteria:**
**Given** a completed conversation session,
**When** the user clicks "Finalize",
**Then** a DVP-B object is created with all required fields (UserID, Hypotheses[], Final Index) and stored in DB.

### Story 2.2: Persistance des Fragments & Reprise de Session
As a student,
I want to leave my session without losing progress,
So that I can resume my thinking later when I have more time.

**Acceptance Criteria:**
**Given** an interrupted session,
**When** the user returns to the chat,
**Then** the AI Coach offers to resume from the last saved preference fragments.

---

## Epic 3: ExÃ©cution AssistÃ©e & Focus Mode (ExÃ©cution)

### Story 3.1: Moteur de Focus (Filtrage Top 3)
As a system,
I want to filter the action backlog to show only the 3 most critical tasks,
So that I can reduce the user's cognitive load and prevent paralysis.

**Acceptance Criteria:**
**Given** a backlog of multiple tasks,
**When** the focus engine runs,
**Then** it returns only the top 3 tasks based on dynamic priority and hides the rest.

### Story 3.2: Dashboard Focus Mode (UI)
As a student,
I want a clean view showing only my next actions,
So that I don't feel overwhelmed by the total amount of work.

**Acceptance Criteria:**
**Given** the Focus Mode is enabled,
**When** I visit the dashboard,
**Then** I see 3 clear action cards and a subtle "View full plan" option.

### Story 3.3: Preuve Facultative (Upload)
As a student,
I want to add proof to my completed tasks,
So that I can increase the Coach's confidence in my progress.

**Acceptance Criteria:**
**Given** a completed task card,
**When** I click "Add Proof",
**Then** I can upload a file or link that is associated with the `Task` object via `evidenceUrl`.

### Story 3.4: Feedback Narratif (Journal de Bord)
As a student,
I want to share how I felt about completing a task,
So that I can reflect on my learning journey.

**Acceptance Criteria:**
**Given** a task is closed,
**When** the system asks "How did it go?",
**Then** ma rÃ©ponse est stockÃ©e dans `userFeedback` et l'Indice de Traction est mis Ã  jour.

### Story 3.5: SecrÃ©taire Logistique (Prompt RÃ©optimisation)
As an inactive student,
I want the Coach to suggest re-organizing my plan without judging my delay,
So that I can restart my momentum easily.

**Acceptance Criteria:**
**Given** inactivity > 7 days,
**When** the user returns,
**Then** the AI Coach uses a logistic/neutral tone to propose moving past deadlines to new optimal dates.

---

## Epic 4: Gouvernance & Pilotage (Admin)

### Story 4.1: Versioning des RÃ¨gles d'Indice (Back-Office)
As an Admin,
I want to update a calculation rule by creating a new version,
So that I don't break existing historical DVP records.

**Acceptance Criteria:**
**Given** a rule modification in the admin panel,
**When** I save,
**Then** a new entry is created in the `RuleVersion` table and becomes the default for future calculations.

### Story 4.2: Job de Relance Intelligente (Cron)
As a system,
I want to detect "Ghost" users to trigger re-optimization prompts,
So that I can maintain user engagement over time.

**Acceptance Criteria:**
**Given** the daily cron job runs,
**When** it identifies users with no activity for J+X days,
**Then** it triggers a "Re-optimization available" notification.