---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: 'Tuesday, January 20, 2026'
project_name: 'TrailLearn'
user_name: 'aubinaso'
date: 'Tuesday, January 20, 2026'
---

# Architecture Decision Document (Updated for Epics 7 & 8)

## Project Context Analysis

### Requirements Overview

**Functional Requirements (V2):**
Le système s'enrichit de deux nouveaux piliers majeurs :
1.  **L'Orientation Maïeutique (Epic 7)** : Un Chatbot IA réflexif ("Miroir Lucide") capable de gérer des dialogues longs, de détecter des contradictions et de calculer un **Indice de Clarté** en temps réel.
2.  **L'Exécution Assistée (Epic 8)** : Un moteur de **Focus Mode** qui filtre le backlog pour ne montrer que 3 actions, avec un **Secrétaire Logistique** (IA) pour la réoptimisation sans jugement.

**Non-Functional Requirements (V2):**
*   **Performance IA** : Latence perçue (TTFT) < 1s via Streaming (SSE).
*   **Gouvernance LLM** : Contrôle strict des coûts (Token limits) et anonymisation des données envoyées.
*   **Auditabilité Étendue** : Traçabilité des indices (Clarté/Traction) pour distinguer l'impact des règles admin vs inputs utilisateur.
*   **Compatibilité Mobile** : Support prioritaire Chrome Mobile / Safari iOS.

**Scale & Complexity:**
Complexité accrue par l'intégration d'un composant IA conversationnel (stateful) au sein d'une architecture stateless (Serverless).

### Technical Constraints & Dependencies
*   **Stack Existante** : Next.js + tRPC + Prisma + Supabase (Doit être préservée).
*   **LLM Provider** : OpenAI (ou équivalent via OpenRouter) pour le moteur conversationnel.
*   **Streaming** : Nécessité de supporter le streaming HTTP (Vercel Edge/Serverless compatible).

## Architecture Updates for V2 (Epics 7 & 8)

### Core AI Architecture
**Decision:** Architecture RAG Légère + Streaming SSE.
**Rationale:**
*   **RAG Léger** : Le "Miroir Lucide" a besoin du contexte du DVP existant (Budget, Notes) pour détecter les contradictions. Ce contexte sera injecté dans le System Prompt à chaque tour de parole.
*   **Streaming (Server-Sent Events)** : Indispensable pour l'UX. L'utilisateur doit voir l'IA "réfléchir" et écrire mot à mot pour maintenir l'engagement et masquer la latence d'inférence.
*   **Gestion d'État** : L'historique de conversation (court terme) est stocké en DB (table `ChatMessages`) mais chargé en mémoire vive pour le contexte LLM.

### Data Model Updates (DVP-B & Indices)
**Decision:** Extension du Schéma Prisma.
**Rationale:**
L'intégration du DVP-B nécessite une structure stricte pour garantir le contrat de données défini dans le PRD.

**Nouveaux Modèles (Draft Schema):**

```prisma
// Extension du modèle User/Project existant

model ClarityIndex {
  id        String   @id @default(cuid())
  userId    String
  score     Int      // 0-100
  breakdown Json     // Détail du calcul (ex: {budget: 20, academic: 80})
  source    String   // "RULE_ENGINE" | "AI_ESTIMATE" | "MANUAL_OVERRIDE"
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
}

model ActionPlan {
  id          String   @id @default(cuid())
  userId      String
  focusMode   Boolean  @default(true) // Si true, seules les top-3 tasks sont visibles
  tractionScore Int    // 0-100 (Engagement interne)
  lastInteraction DateTime
  
  tasks       Task[]
}

model Task {
  id          String   @id @default(cuid())
  planId      String
  status      String   // PENDING, DONE, SKIPPED
  priority    Int      // 1 (Highest) - 100
  evidenceUrl String?  // Preuve facultative
  userFeedback String? // Journal de bord narratif
  
  plan        ActionPlan @relation(fields: [planId], references: [id])
}
```

### LLM Integration Strategy
**Decision:** Vercel AI SDK (Core).
**Rationale:**
*   **Standardisation** : Fournit une abstraction propre pour le streaming (`useChat`, `StreamData`) compatible Next.js App Router.
*   **Agnostique** : Permet de changer de provider (OpenAI -> Anthropic) en changeant une ligne de config.
*   **Middleware** : Facilite l'ajout de rate-limiting et de calcul de tokens (Cost Governance).

## Project Structure Updates

### Directory Structure Additions

```
src/
├── app/
│   └── (dashboard)/
│       └── chat/              # Nouvelle route pour l'interface Conversationnelle
│           └── page.tsx
├── features/
│   ├── ai-coach/              # Feature Epic 7 (Orientation)
│   │   ├── components/        # ChatInterface, ClarityGauge
│   │   ├── prompts/           # System Prompts (Miroir, Secrétaire)
│   │   └── services/          # LLM Service (OpenAI wrapper)
│   └── execution/             # Feature Epic 8 (Exécution)
│       ├── components/        # FocusDashboard, TaskCard
│       └── logic/             # Algo de priorisation (Top 3)
├── server/
│   ├── api/
│   │   └── routers/
│   │       ├── ai.ts          # Endpoint tRPC pour l'init/history (hors streaming)
│   │       └── execution.ts   # Endpoint pour la gestion des tâches
│   └── lib/
│       └── llm-guardrails.ts  # Validation des sorties IA (Non-Fermeture)
```

## Architecture Validation Results (V2)

### Coherence Validation ✅
L'ajout de Vercel AI SDK s'intègre naturellement dans la stack Next.js existante. L'utilisation de Prisma pour stocker les indices et les tâches maintient la cohérence avec le "Safe Space" (RLS).

### Requirements Coverage Validation ✅
*   **Epic 7** : Couvert par `features/ai-coach` + Streaming.
*   **Epic 8** : Couvert par `features/execution` + Modèle de données `Task`.
*   **NFR Performance** : Le Focus Mode est une simple requête DB filtrée (rapide).
*   **NFR Éthique** : Les `llm-guardrails.ts` assureront le post-traitement des réponses pour bannir les verbes interdits.

### Implementation Readiness Validation ✅
L'architecture est prête. Les schémas de données sont définis, la stack IA est choisie.

### Architecture Readiness Assessment (V2)

**Overall Status:** READY FOR IMPLEMENTATION

**Key Strengths V2:**
*   **Modular AI** : L'IA est traitée comme une feature, pas comme un monolithe magique.
*   **Data-Driven Execution** : Le Focus Mode est piloté par la donnée (priorité), ce qui rend l'expérience déterministe et rapide.

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

---