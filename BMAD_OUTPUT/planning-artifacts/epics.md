---
stepsCompleted: ["step-01-validate-prerequisites", "step-02-design-epics", "step-03-create-stories", "step-04-final-validation"]
inputDocuments:
  - "BMAD_OUTPUT/planning-artifacts/prd-v3.md"
  - "BMAD_OUTPUT/planning-artifacts/architecture-v2.md"
  - "BMAD_OUTPUT/planning-artifacts/ux-design-specification.md"
  - "BMAD_OUTPUT/planning-artifacts/epics-v1.md"
---

# TrailLearn - Epic Breakdown (V3)

## Overview

This document provides the complete epic and story breakdown for TrailLearn, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories. This version integrates the V1/V2 baseline (Epics 1-10) and the new V3 extensions (Epics 11-14).

## Requirements Inventory

### Functional Requirements

**Baseline (V1/V2):**
- FR-V1-01: Page d'accueil pédagogique.
- FR-V1-02: Consentement éclairé obligatoire.
- FR-V1-03: Gestion de compte et droit à l'oubli.
- FR-V1-04: Saisie structurée par piliers (Budget, Langue, Logement).
- FR-V1-05: Calcul du "Reste à Vivre" et détection des fragilités.
- FR-V1-06: Gestion de l'état "Incomplet".
- FR-V1-07: Simulation "What-If" (Recalcul immédiat).
- FR-V1-08: Dashboard de résultats avec justifications.
- FR-V1-09: Export PDF certifié.
- FR-V1-10: Back-office Admin de gestion des seuils.

**Extensions (V3):**
- FR-01: Gestion du Profil Être (TRV, Complexité, Shadow Zone).
- FR-02: IA Mentor (Miroir Lucide, Contradictions, Contextualisation).
- FR-03: Moteur de Viabilité IKIGAI (Scénarios hybrides, Score global, Shadow Guard).
- FR-04: Module Voyage (Hypothèse Existentielle, Protocoles d'action).

### Non-Functional Requirements

- NFR-01: Sécurité (RLS strict + Chiffrement AES-256-GCM pour Shadow Zone).
- NFR-02: Latence IA (Streaming tokens, TTFT < 1s, p95 < 3s).
- NFR-03: Fiabilité du Garde-Fou (Shadow Guard toxicité).
- NFR-04: Accessibilité & UX Calme (WCAG 2.1 AA, Espace vide > 40%).
- NFR-V1-05: Réactivité What-If < 500ms.

### Additional Requirements (Architecture & UX)

- TECH-01: Feature-First Directory Structure (`src/features/[domain]/`).
- TECH-02: Brownfield Migration Strategy (Incremental evolution).
- TECH-04: tRPC v11@next integration with Next.js 15.
- UX-01: Cockpit Dashboard Layout (3-pane UI).
- UX-02: Boîte Blanche (Explainability Cards).

## FR Coverage Map

### Baseline Coverage (Epics 1-10)
[Defined in V1/V2 specs]

### Extension Coverage (Epics 11-14)
- FR-01-A (TRV): Epic 11 - Deep Profile
- FR-01-B (Complexité): Epic 11 - Deep Profile
- FR-01-C (Shadow Zone): Epic 11 - Deep Profile
- FR-02-A (Contradictions): Epic 12 - AI Mentor
- FR-02-B (Anti-Fuite): Epic 12 - AI Mentor
- FR-02-C (Émotionnel): Epic 12 - AI Mentor
- FR-03-A (Scénarios IKIGAI): Epic 13 - IKIGAI Engine
- FR-03-B (Score Viabilité): Epic 13 - IKIGAI Engine
- FR-03-C (Shadow Guard): Epic 13 - IKIGAI Engine
- FR-04-A (Hypothèse Voyage): Epic 14 - Travel Lab
- FR-04-B (Transformation): Epic 14 - Travel Lab
- FR-04-C (Protocole): Epic 14 - Travel Lab

## Epic List

### Epic 1: Foundation & Safe Space (Baseline)
Mettre en place l'environnement sécurisé et les fondations techniques (Auth, RLS).

### Epic 2: DVP Core Engine & Wizard (Baseline)
Permettre la saisie fluide et structurée du dossier de viabilité logistique.

### Epic 3: The Truth Engine (Baseline)
Implémenter le moteur de calcul déterministe et transparent.

### Epic 4: Cockpit & Simulation (Baseline)
Délivrer le tableau de bord de pilotage et la simulation What-If.

### Epic 5: Standard of Truth Admin (Baseline)
Outils opérationnels pour maintenir les référentiels métiers.

### Epic 6: Sharing & Export (Baseline)
Export PDF et Landing Page pédagogique.

### Epic 7 (Legacy): Socle Conversationnel (Completed)
### Epic 8 (Legacy): Finalisation & Sortie de Session (Completed)
### Epic 9 (Legacy): Exécution Assistée (Completed)
### Epic 10 (Legacy): Gouvernance & Pilotage (Completed/Review)

---

### Epic 11: Identity & Deep Profile (Le Profil Être)
Permettre à l'utilisateur de définir son "ADN vital" (Rythme, Complexité) et ses zones d'ombre sécurisées, transformant le profil d'une simple fiche administrative en une cartographie psychologique protégée.
**FRs covered:** FR-01 (A, B, C), NFR-01 (Security/Shadow Zone).

### Story 11.1: Configuration du Taux de Renouvellement Vital (TRV)

As a utilisateur introspectif,
I want définir mon besoin naturel de changement (TRV),
So that le système puisse évaluer si un projet à long terme est compatible avec mon énergie.

**Acceptance Criteria:**

**Given** un utilisateur authentifié sur la page de profil étendu.
**When** je sélectionne une fréquence de TRV (ex: "J'ai besoin de changer tous les 6 mois").
**Then** cette valeur est stockée dans `UserProfile`.
**And** la donnée TRV est exposée via l'API interne (`ContextService`) pour être consommée par le moteur IKIGAI et le Mentor IA (pas de silo).

### Story 11.2: Capture de la Complexité Cognitive

As a utilisateur,
I want indiquer mon besoin de structure versus mon besoin de chaos créatif,
So that les recommandations ne me piègent pas dans un cadre trop rigide ou trop flou.

**Acceptance Criteria:**

**Given** le formulaire de profil Être.
**When** je positionne le curseur "Complexité Cognitive".
**Then** la préférence est enregistrée.
**And** le système fournit un feedback immédiat sur l'environnement type correspondant.
**And** cette métrique est injectée dans le contexte runtime du Mentor pour adapter son style de suggestion (Structuré vs Exploratoire).

### Story 11.3a: Modèle et Frontière d'Accès Shadow Zone

As a architecte système,
I want isoler structurellement les données sensibles,
So that aucune fuite accidentelle ne soit possible via les accès standards.

**Acceptance Criteria:**

**Given** le schéma de base de données.
**When** je crée la table dédiée `ShadowProfile`.
**Then** aucune relation directe (FK) n'est exposée aux requêtes publiques.
**And** l'accès est interdit à tout service autre que le `ShadowBoundaryService` (Design Pattern).
**And** une politique RLS stricte empêche tout SELECT sans l'ID utilisateur explicite dans la session.

### Story 11.3b: Chiffrement Applicatif (AES-256-GCM)

As a responsable sécurité,
I want que les données soient chiffrées avant même d'atteindre la base de données,
So that un accès physique à la DB ne révèle rien (Protection "At Rest").

**Acceptance Criteria:**

**Given** une donnée sensible (ex: texte d'une peur).
**When** elle est transmise au backend.
**Then** elle est chiffrée en AES-256-GCM avec une clé rotative gérée côté serveur.
**And** des tests unitaires valident le cycle Encrypt -> Decrypt avec intégrité parfaite.
**And** toute tentative de lecture sans clé valide lève une exception de sécurité auditée.

### Story 11.4: Saisie Éthique des Zones d'Ombre

As a utilisateur vulnérable,
I want déclarer mes freins psychologiques dans un cadre sécurisant et sans pression,
So that je puisse être honnête sans culpabilité.

**Acceptance Criteria:**

**Given** l'interface de saisie "Zone d'Ombre".
**When** j'accède au formulaire.
**Then** un consentement explicite ("Je comprends que ces données servent à...") est requis.
**And** je peux choisir de passer ("Skip") cette section sans pénalité bloquante.
**And** un bouton "Effacer mes ombres" permet la suppression immédiate et définitive de ces données spécifiques.
**And** l'UI utilise un langage "Safe" (non-jugeant, expliquant l'utilité).

### Epic 12: AI Mentor & Maïeutique (Miroir Lucide)
Déployer l'IA conversationnelle capable de détecter les contradictions entre le discours et le profil profond, agissant comme un miroir bienveillant pour débloquer l'introspection.
**FRs covered:** FR-02 (A, B, C), NFR-02 (Latence), NFR-03 (Garde-fou).

### Story 12.1: Infrastructure IA Streaming (Haute Performance)

As a utilisateur en conversation,
I want recevoir les réponses de l'IA instantanément,
So that le dialogue soit fluide comme une vraie discussion.

**Acceptance Criteria:**

**Given** une requête envoyée au Mentor.
**When** le serveur traite la demande.
**Then** le premier token s'affiche en moins de 3 secondes (p95 Time-To-First-Token).
**And** la réponse s'affiche progressivement (Streaming token-by-token).
**And** si le provider LLM est indisponible, un message de fallback sobre ("Le Mentor réfléchit, réessayez...") s'affiche sans crasher l'app.

### Story 12.2: Persona Maïeutique (System Prompt)

As a utilisateur cherchant du sens,
I want que l'IA me pose des questions plutôt que de me donner des ordres,
So that je construise ma propre solution.

**Acceptance Criteria:**

**Given** le prompt système du Mentor.
**When** l'IA génère une réponse.
**Then** elle n'utilise jamais d'impératifs prescriptifs ("Tu dois", "Il faut").
**And** elle privilégie les questions ouvertes ("Qu'est-ce qui te fait dire ça ?").
**And** des tests automatisés (Eval) vérifient le respect du ton bienveillant/interrogatif sur un jeu de scénarios types.

### Story 12.3: Détection de Contradictions (Triangulation)

As a utilisateur confus,
I want que l'IA m'aide à voir mes incohérences,
So that je puisse aligner mes actes sur mes valeurs.

**Acceptance Criteria:**

**Given** une incohérence détectée entre le Profil (TRV/Complexité), l'Historique et le Message actuel.
**When** l'IA intervient.
**Then** elle formule explicitement la tension ("Je remarque que tu cherches X alors que ton profil indique Y").
**And** elle demande systématiquement confirmation ("Est-ce que je me trompe ?") avant d'approfondir.

### Story 12.4: Contextualisation Shadow Sécurisée (Minimisation)

As a utilisateur soucieux de ma vie privée,
I want que mes données "Shadow" ne soient utilisées que si nécessaire et de manière protégée,
So that l'IA m'aide sans m'exposer inutilement.

**Acceptance Criteria:**

**Given** une session de chat.
**When** le contexte Shadow est requis.
**Then** l'injection est Opt-in (activée par le contexte de la conversation).
**And** les données ne sont jamais envoyées "Brutes" mais résumées ou tagguées (Minimisation) pour le LLM.
**And** les logs de prompt sont filtrés/redacted pour ne jamais persister les données Shadow en clair dans les logs d'observabilité IA.

### Story 12.5: Garde-fous et Safety Logs

As a administrateur éthique,
I want tracer les dérapages potentiels ou les demandes hors-scope,
So that je puisse ajuster la sécurité du modèle.

**Acceptance Criteria:**

**Given** une tentative de l'utilisateur de détourner l'usage (Jailbreak) ou une demande dangereuse (Médical/Suicide).
**When** le système détecte le risque.
**Then** l'IA refuse de répondre (Refusal response).
**And** l'événement est loggué dans un journal "Safety" distinct avec la catégorie du risque (sans les données PII sensibles).

### Epic 13: IKIGAI Engine & Strategy (Moteur de Solutions)
Évoluer du simple constat de faisabilité (V1) vers la génération active de solutions (Scénarios hybrides, Portefeuille d'activités) respectant le TRV de l'utilisateur.
**FRs covered:** FR-03 (A, B, C).

### Story 13.1: Calculateur de Viabilité Holistique (Extension V1)

As a utilisateur cherchant l'équilibre,
I want que mon score de viabilité reflète mon énergie autant que mes finances,
So that je ne m'engage pas dans un projet rentable mais épuisant.

**Acceptance Criteria:**

**Given** un calcul de viabilité lancé (extends Story 3.2 - Moteur V1).
**When** le moteur traite les données.
**Then** il intègre le TRV (Story 11.1) et la Complexité (Story 11.2) comme variables de pondération.
**And** le score final est décomposable en 3 sous-scores visibles (Finance / Énergie / Sens) pour une transparence totale.
**And** si le score baisse, une explication contextuelle est fournie (ex: "Viable financièrement, mais risque d'ennui élevé car votre TRV est court").
**And** le résultat est présenté comme une "Hypothèse de travail" et non une vérité absolue.

### Story 13.2: Générateur de Portefeuille d'Activités Temporel

As a multipotentiel,
I want que le système me propose des combinaisons d'activités plutôt qu'un métier unique,
So that je puisse sécuriser mes revenus tout en nourrissant mes passions.

**Acceptance Criteria:**

**Given** un besoin financier non couvert par la passion principale.
**When** le moteur génère des solutions.
**Then** il propose des scénarios hybrides (ex: "70% Consultant [Sécurité] + 30% Artiste [Sens]").
**And** ces portefeuilles sont séquencés dans le temps (ex: "Année 1 : Focus Sécurité -> Année 2 : Transition progressive").
**And** l'interface indique clairement que cette stratégie est transitoire pour construire les fondations, pas une identité figée à vie.

### Story 13.3: Shadow Guard (Filtre Protecteur)

As a utilisateur avec des fragilités,
I want que le système m'empêche de choisir des options qui activeraient mes peurs sans préparation,
So that je ne me mette pas en danger psychologique.

**Acceptance Criteria:**

**Given** une suggestion générée par le moteur (ex: "Conférencier").
**When** cette suggestion entre en conflit avec une Zone d'Ombre (ex: "Phobie sociale" déclarée en Story 11.4).
**Then** l'option est tagguée "Risque d'exposition élevé" ou "Exposition progressive recommandée" plutôt que masquée silencieusement.
**And** le système propose une alternative compatible ou un chemin intermédiaire (ex: "Commencer par des webinaires sans caméra").
**And** le message de blocage est protecteur et non culpabilisant ("Pour respecter votre besoin de sécurité actuel, cette option demande une préparation...").

### Epic 14: Travel Lab (Laboratoire d'Identité)
Transformer la mobilité géographique en outil de validation identitaire. Le voyage n'est plus une fin, mais un moyen testable ("Protocoles d'action") suggéré par le diagnostic IKIGAI.
**FRs covered:** FR-04 (A, B, C).

### Story 14.1: Moteur d'Hypothèses de Voyage

As a explorateur de moi-même,
I want que le système me suggère des voyages basés sur mes besoins intérieurs, pas sur le tourisme,
So that le dépaysement serve mon évolution.

**Acceptance Criteria:**

**Given** une tension identitaire détectée (ex: "Besoin d'anonymat pour oser créer").
**When** je consulte le module Voyage.
**Then** le système suggère un type d'environnement (ex: "Grande métropole anonyme") plutôt qu'une ville spécifique.
**And** chaque suggestion est formulée comme une hypothèse conditionnelle ("Si tu évolues dans un environnement X, alors Y pourrait se débloquer").
**And** aucune recommandation n'est présentée comme une injonction touristique absolue.

### Story 14.2: Génération de Protocoles d'Action (Quest Cards)

As a voyageur actif,
I want une mission concrète à réaliser sur place,
So that je ne sois pas passif face à mon expérience.

**Acceptance Criteria:**

**Given** une destination validée.
**When** je génère mon plan de voyage.
**Then** une "Quest Card" est créée (ex: "Lancer un projet sous pseudonyme").
**And** la mission est bornée dans le temps (ex: "Test sur 2 semaines") et explicitement réversible.
**And** une option "Abandonner la quête" est disponible à tout moment sans pénalité pour éviter la culpabilité.
**And** une question de clôture ("Qu'as-tu observé sur toi ?") est prévue pour la fin de la mission.