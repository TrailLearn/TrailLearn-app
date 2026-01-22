---
stepsCompleted: ["step-01-init", "step-02-discovery", "step-03-success", "step-04-journeys", "step-05-domain", "step-07-project-type", "step-08-scoping", "step-09-functional", "step-10-nonfunctional", "step-11-polish", "step-12-complete", "step-e-01-discovery", "step-e-02-review", "step-e-03-edit"]
inputDocuments: ["BMAD_OUTPUT/analysis/brainstorming-session-2026-01-20.md", "BMAD_OUTPUT/project-context.md", "BMAD_OUTPUT/planning-artifacts/prd.md"]
workflowType: 'prd'
classification:
  projectType: web_app
  domain: edtech
  complexity: high
  projectContext: brownfield
lastEdited: '2026-01-20'
editHistory:
  - date: '2026-01-20'
    changes: 'Added Browser Matrix, LLM Governance, and DVP-B Data Schema.'
---

# Product Requirements Document - TrailLearn V2 (Epics 7 & 8)

**Vision** : Transformer TrailLearn en un partenaire de décision proactif via une IA maïeutique (Boussole) et un moteur d'exécution sans culpabilité (GPS).

## Executive Summary
TrailLearn V2 étend la plateforme existante pour adresser le "flou" décisionnel et la paralysie de l'action. Par l'introduction d'une IA Maïeutique (Miroir Lucide) et d'un dashboard Focus Mode (Secrétaire Logistique), le produit sécurise le parcours étudiant de l'intention à l'exécution.

## Success Criteria

### User Success
*   **Epic 7 (Orientation)** : L'utilisateur résout ses contradictions projet et obtient un Indice de Clarté > 80%.
*   **Epic 8 (Exécution)** : L'utilisateur maintient une dynamique d'action via le Focus Mode sans abandonner par culpabilité.

### Business Success
*   **Rétention J+7** : Augmentation du taux de retour actif sur l'Epic 8 (Anti-Ghosting).
*   **Conversion** : Taux de passage > 60% entre l'Orientation (Idée) et l'Exécution (Plan).

### Technical Success
*   **Performance** : Dashboard "Focus 3" chargé en < 100ms ; Latence Chatbot (TTFT) < 1s.
*   **Ethical Safety** : 0% de verbes de rejet définitifs utilisés par l'IA.

## Product Scope & Phased Development

### Phase 1: MVP (Lucidité & Confiance)
*   Chatbot "Miroir" (Détection contradictions Budget/Académique/Géo).
*   Indice de Clarté V1 & Sortie 3 états (Cristalline, Hypothèse, Exploration).
*   Dashboard "Focus 3 Actions" & Relance "Réoptimisation" (J+7).

### Phase 2: Growth (Engagement)
*   Indice de Traction (Interne) pour calibrer le ton du coach.
*   Preuves Facultatives (Upload) et Journal de bord narratif.

### Phase 3: Vision (Échelle)
*   Coach IA Vocal & Transfert vers Mentor Humain si Traction critique.

## User Journeys

### Journey 1: Le Miroir Lucide (Lucas, 19 ans)
Lucas veut une école Top Tier aux USA avec un budget de 5k€. Le Coach IA révèle la tension budgétaire sans juger et propose l'alternative "Canada" comme remédiation. Lucas valide et sort avec une clarté de 85%.

### Journey 2: Le Focus Mode (Sarah, 22 ans)
Sarah, admise mais paralysée par 50 tâches, ghoste l'app. Elle reçoit un ping de "Réoptimisation". L'interface ne montre que 3 actions. Elle scanne son passeport et relance sa dynamique.

## Domain-Specific Requirements (Ethical Guardrails)

### Algorithmic Responsibility
*   **Non-Fermeture** : Interdiction des verbes définitifs ("Impossible"). Usage exclusif du conditionnel.
*   **Issue de Secours** : Si Clarté < 40%, proposition systématique d'une alternative ou remédiation.
*   **Responsabilité Partagée** : Chaque diagnostic critique de l'IA requiert une validation explicite de l'utilisateur.

### Data Privacy & Compliance
*   **Droit à l'oubli conversationnel** : Suppression complète des logs et traces de l'IA sur demande.
*   **Auditabilité** : Historisation immuable de chaque changement d'indice.

## Technical Architecture & Integration (Brownfield)

### Extension Next.js
*   **Coach IA** : API conversationnelle avec Streaming (SSE) et gestion de contexte session.
*   **Moteur d'Indice** : Calcul Server-Side protégé, exposé via polling intelligent ou SSE.
*   **Governance Ops** : Versioning des règles de calcul avec capacité de rollback.

### Data Contract: DVP-B Schema
*   **UserID** (UUID) : Liaison utilisateur (Obligatoire).
*   **Status** (Enum) : `DRAFT` | `VALIDATED` | `ARCHIVED` (Obligatoire).
*   **ClarityIndex** (Int 0-100) : Score de maturité calculé (Obligatoire, default: 0).
*   **Hypotheses** (JSONB) : Liste des scénarios explorés (ex: `[{country: "USA", budget: "Low"}, {country: "Canada", budget: "Low"}]`) (Obligatoire).
*   **LastUpdated** (Timestamp) : Date de dernière interaction (Obligatoire).
*   **EvidenceList** (JSONB) : Liens vers preuves uploadées (Optionnel).

## Functional Requirements

### 1. Conversation IA
*   **FR1** : L'utilisateur peut engager une conversation maïeutique pour définir son projet.
*   **FR2** : Le système détecte et reformule les intentions contradictoires.
*   **FR3** : L'utilisateur valide/rejette manuellement chaque analyse critique de l'IA.

### 2. Moteur d'Indices
*   **FR4** : Le système calcule l'Indice de Clarté (Temps réel) et de Traction (Interne).
*   **FR5** : Le système historise chaque changement d'indice (Audit Log).

### 3. Exécution & Focus
*   **FR6** : L'utilisateur peut isoler 3 tâches prioritaires (Focus Mode).
*   **FR7** : L'utilisateur peut soumettre des preuves facultatives et des feedbacks narratifs.

## Non-Functional Requirements

### Performance
*   **NFR1** : Time to First Token (TTFT) < 1s (Streaming).
*   **NFR2** : Mise à jour des indices perçue en < 500ms.

### Reliability & Availability
*   **NFR5 (Browser Matrix)** : Support prioritaire et tests automatisés sur **Chrome Mobile (Android Latest)** et **Safari iOS (Latest)**. Support Desktop en fallback.

### Security & Privacy
*   **NFR3** : Pseudonymisation systématique des données envoyées aux LLM externes.
*   **NFR4** : Étanchéité stricte des contextes de session entre utilisateurs.

### LLM Governance
*   **NFR6 (Cost Control)** : Plafond de tokens par session utilisateur configurable via Admin pour maîtriser les coûts API (ex: max 4k tokens/session).
*   **NFR7 (Latency Guardrail)** : Timeout strict de 5s pour les appels LLM non-streamés (fallback règle statique).
