---
stepsCompleted: ["step-01-init", "step-02-discovery", "step-03-success", "step-04-journeys", "step-05-domain", "step-06-innovation", "step-07-project-type", "step-08-scoping", "step-09-functional", "step-10-nonfunctional", "step-11-polish"]
inputDocuments:
  - "BMAD_OUTPUT/analysis/brainstorming-session-2026-01-13.md"
  - "Brand/TrailLearn.md"
  - "Brand/Identity.md"
  - "Brand/FIGMA.md"
workflowType: 'prd'
classification:
  projectType: web_app
  domain: edtech
  complexity: medium
  projectContext: greenfield
---

# Product Requirements Document - TrailLearn

**Author:** aubinaso
**Date:** Wednesday, January 14, 2026

## Executive Summary

**Vision** : TrailLearn est un "tiers de confiance préventif" conçu pour sécuriser les projets de mobilité internationale des étudiants. Contrairement aux plateformes de placement classiques, TrailLearn privilégie la **responsabilité structurelle** à la réputation marketing.

**Differentiator** : Le cœur du produit est le **Dossier de Viabilité du Parcours (DVP)**, un Stress-Test algorithmique transparent qui confronte les intentions de l'étudiant (budget, logement, académique) à la réalité du terrain.

**Value Proposition** : Transformer l'incertitude anxieuse en une lucidité actionnable grâce à un diagnostic "boîte blanche" et des remédiations concrètes.

## Project Classification

*   **Project Type:** Application Web (Web App Hybride SSR/SPA)
*   **Domain:** EdTech (avec extension future vers CareerTech)
*   **Complexity:** Medium (functional V1) / High (conceptual/ethical)
*   **Project Context:** Greenfield (initial implementation)

## Success Criteria

### User Success
*   **Aha! Moment** : Découverte d'une fragilité non anticipée (ex: déficit budgétaire de 200€) avec un plan de remédiation immédiat.
*   **Outcome** : Passage d'une intention vague à un plan d'action lucide ("J'ai évité une erreur critique").

### Business Success (KPIs V1)
*   **Adoption** : Nombre de DVP complétés et taux de complétion.
*   **Valeur Perçue** : % d'utilisateurs consultant les remédiations après détection d'une fragilité 🔴 ou 🟠.
*   **Crédibilité** : Intention de recommandation basée sur l'utilité du Stress-Test.

### Technical & Ethical Success
*   **Précision** : Diagnostics cohérents basés sur des règles métier documentées.
*   **Transparence** : Algorithme explicable (White Box) et traçabilité complète des sources.

## Product Scope

### MVP (V1 - Web Only)
*   **Cœur (DVP)** : Stress-Test sur 3 piliers (Budget, Langue, Logement) pour 1 à 2 corridors pilotes (ex: Cameroun → France).
*   **Fonctions Clés** : Saisie structurée, moteur de règles, restitution visuelle (🔴🟠🟡), remédiations et export PDF.
*   **Modules Adjacents** : Catalogues informatifs de bourses et d'opportunités (sans candidature directe).

### Future Phases
*   **Phase 2 (Growth)** : Extension géographique, Mentorat humain (remédiations complexes), briques du Trajectogramme.
*   **Phase 3 (Vision)** : Knowledge Ledger (communauté certifiée), Legacy Loop (IA auto-apprenante), Application Mobile.

## User Journeys

### Sarah (Étudiante) - De l'incertitude à la lucidité
Sarah souhaite étudier en France mais craint l'échec financier. Sur TrailLearn, elle remplit son DVP. Le système lui révèle une **Fragilité Critique 🔴** sur son budget parisien. Grâce aux remédiations, elle ajuste son projet vers une ville de province (Lyon) où son DVP devient **Viable sous conditions ⚠️**. Elle repart avec un plan réaliste et sécurisé.

### Thomas (Admin) - Le Gardien des Standards
Thomas identifie une hausse des loyers à Lyon. Il met à jour le référentiel dans le Back-Office. Le système évalue l'impact sur les dossiers en cours et Thomas valide la nouvelle règle (versionnée). La fiabilité du "Standard de Vérité" est maintenue sans interruption de service.

## Domain-Specific Requirements

### 1. Ethical Transparency
Chaque diagnostic est accompagné de sa règle source (ex: "Coût vie Paris + 15% marge"). Le système rejette toute forme de "boîte noire" décisionnelle.

### 2. Privacy & Safety (Safe Space)
Données DVP privées par défaut (AES-256 / TLS 1.3). Isolation stricte (RLS). Aucune revente de données ni scoring externe sans consentement.

### 3. Responsibility (Duty of Care)
Sémantique prudente : "Viable", "Non viable". Absence de promesse de succès (Visa/Admission). Focus sur l'aide à la décision.

## Innovation & Novel Patterns

*   **Structural Innovation** : Le DVP comme unité de vérité (projet stress-testé) plutôt que le profil déclaratif.
*   **Decision-Centric UX** : Absence volontaire de boutons "Postuler" pour favoriser la réflexion et la lucidité avant l'action.
*   **Algorithmic Responsibility** : Moteur déterministe et pédagogique vs IA prédictive opaque.

## Web App Specific Requirements

*   **Architecture** : Next.js (SSR pour le SEO public / SPA pour le DVP privé).
*   **SEO** : Indexation des guides et corridors ; NoIndex strict sur les données individuelles.
*   **Accessibilité** : WCAG 2.1 AA (Double codage visuel, navigation clavier, support lecteurs d'écran).
*   **Performance** : Feedback immédiat (<200ms) ; Temps de calcul DVP mis en scène (2-3s).

## Functional Requirements

### 1. Welcome & Account
*   **FR1** : Page d'accueil pédagogique (Lucidité vs Sélection).
*   **FR2** : Consentement éclairé obligatoire avant DVP.
*   **FR3** : Gestion de compte et droit à l'oubli (effacement complet).

### 2. Tunnel DVP & Logic
*   **FR4** : Saisie structurée par piliers (Budget, Langue, Logement).
*   **FR5** : Calcul du "Reste à Vivre" et détection des fragilités (🔴🟠🟡).
*   **FR6** : Gestion de l'état "Incomplet" si données critiques manquantes.
*   **FR7** : Simulation "What-If" (recalcul immédiat après changement de variable).

### 3. Restitution & Ops
*   **FR8** : Dashboard de résultats avec justifications explicites et remédiations.
*   **FR9** : Export PDF incluant date et version des règles.
*   **FR10** : Back-office Admin de gestion des seuils et référentiels (avec historique d'audit).

## Non-Functional Requirements

### 1. Reliability & Trust
*   **Indicateur de fraîcheur** : Date de mise à jour visible pour chaque donnée source.
*   **Versioning** : Liaison immuable d'un DVP à une version de règles métier.
*   **Obsolescence** : Marquage des données > 12 mois comme "potentiellement obsolètes".

### 2. Performance & UX
*   **Chargement LCP** : < 1.5s pour les pages publiques.
*   **Réactivité What-If** : < 500ms.
*   **Clarté Cognitive** : Langage international sans jargon administratif.
