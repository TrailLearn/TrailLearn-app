---
stepsCompleted: ["step-01-init", "step-02-context", "step-03-starter", "step-04-decisions", "step-05-patterns", "step-06-structure", "step-07-validation"]
status: 'APPROVED'
inputDocuments:
  - "BMAD_OUTPUT/planning-artifacts/prd-v3.md"
  - "BMAD_OUTPUT/project-context.md"
  - "BMAD_OUTPUT/analysis/brainstorming-session-2026-01-26.md"
  - "Brand/TrailLearn.md"
  - "Brand/Identity.md"
project_name: 'TrailLearn'
user_name: 'aubinaso'
date: '2026-01-27'
---

# Architecture Design Document - TrailLearn

**Project:** TrailLearn
**Status:** DRAFT (Initialization)
**Date:** 2026-01-27

---

## 1. Executive Summary

### 1.1 Architectural Vision
[Vision statement aligning technical decisions with product goals]

### 1.2 Key Architectural Drivers
- **Scalability:** [Strategy]
- **Security:** [Strategy]
- **Performance:** [Strategy]
- **Maintainability:** [Strategy]

---

## 2. High-Level Architecture

### 2.1 System Context (C4 Level 1)
[Description of system boundaries and external interactions]

### 2.2 Container Diagram (C4 Level 2)
[Description of internal containers: Web App, API, Database, etc.]

### 2.3 Technology Stack
- **Frontend:** [Framework, UI Lib]
- **Backend:** [Framework, Runtime]
- **Database:** [Type, ORM]
- **Infrastructure:** [Cloud Provider, Services]

---

## 3. Key Architectural Decisions (ADRs)

### ADR-001: [Title]
- **Context:** [Problem description]
- **Decision:** [Chosen solution]
- **Consequences:** [Trade-offs accepted]

---

## 4. Data Architecture

### 4.1 Data Model Overview
[ERD description or key entities]

### 4.2 Data Flow & Persistence
[How data moves and is stored]

---

## 5. Security Architecture

### 5.1 Authentication & Authorization
[Auth strategy, Roles, RLS]

### 5.2 Data Protection
[Encryption, Compliance]

---

## 6. Implementation Strategy

### 6.1 Development Phases
[Phase 1, Phase 2...]

### 6.2 Testing Strategy
[Unit, Integration, E2E]

---

## 7. Risks & Mitigations
- **Risk 1:** [Mitigation]

## 8. Project Context Analysis

### Requirements Overview

**Functional Requirements Impact:**
- **Deep Data Model (Profil Être):** Requires flexible schema (JSONB possible for some evolving attributes) but strict relational integrity for core identity.
- **IKIGAI Engine:** Needs a dedicated logic layer (Service pattern) separable from the UI. Not just simple CRUD.
- **AI Mentor:** Requires a robust LLM integration layer with context management (conversation history + profile data injection).

**Non-Functional Requirements Impact:**
- **Security (Shadow Data):** RLS policies are the primary defense line. Database schema must support granular access control.
- **Performance (IA Latency):** Edge functions or serverless functions with minimal cold start for AI interaction. Streaming support is mandatory.

**Scale & Complexity:**
- **Primary domain:** Web App (EdTech / Psychology)
- **Complexity level:** Medium-High (Due to logic density and security requirements)
- **Estimated architectural components:** 4 Core Modules (Auth, Profile, Engine, Mentor) + Shared UI/Utils.

### Technical Constraints & Dependencies (From Project Context)

**Mandatory Stack:**
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.x (Strict)
- **API:** tRPC 11.x (Backend-for-Frontend)
- **Database:** PostgreSQL (Supabase) + Prisma
- **Auth:** NextAuth.js
- **Styling:** Tailwind CSS + shadcn/ui

**Architectural Patterns:**
- **Feature-First:** Code organized by domain features (`src/features/`), not by type.
- **Backend as Truth:** UI is dumb, logic resides in tRPC procedures.
- **Server State:** TanStack Query managed via tRPC.

### Cross-Cutting Concerns Identified
- **Row Level Security (RLS):** Must be designed into the schema from day one.
- **AI Observability:** Tracing inputs/outputs for the Mentor agent (cost & quality monitoring).
- **Type Safety:** End-to-end typing (Zod -> Prisma -> tRPC -> React).

## 9. Starter Template & Migration Strategy

### Primary Technology Domain
**Full-Stack Web Application** (Next.js App Router focus - Brownfield Context)

### Selected Approach: Custom Scaffold (T3-Aligned) - Brownfield Evolution

**Rationale:**
We are operating in a **Brownfield context** (existing codebase). Using a monolithic boilerplate would require a rewrite. Instead, we will evolve the existing Next.js App Router application by strictly applying the **Feature-First** architecture and incrementally integrating the T3 stack components (tRPC v11, Prisma, NextAuth).

**Initialization/Migration Strategy:**
1.  **Baseline:** Existing Next.js 15 App Router codebase.
2.  **Structural Refactor:** Move existing domain logic into `src/features/[domain]`.
3.  **Integration:**
    - Install `tRPC v11` (Server Actions integration).
    - Configure `Prisma` with Postgres (Supabase).
    - Configure `NextAuth.js`.

**Architectural Decisions Provided:**
- **Language:** TypeScript 5.x (Strict)
- **Styling:** Tailwind CSS (configured via `create-next-app`)
- **Routing:** App Router (FileSystem based)
- **State:** TanStack Query (via tRPC)
- **Migration:** Incremental adoption. New features (e.g., Mentor) built directly in new architecture; legacy features refactored opportunistically.

## 10. Core Architectural Decisions (ADRs)

### ADR-001: Feature-First Structure
- **Context:** Avoid code sprawl and "folder-by-type" anti-patterns.
- **Decision:** All domain logic resides in `src/features/[domain]/`.
- **Structure:** 
  - `components/` (UI)
  - `hooks/` (Client logic)
  - `server/` (tRPC sub-routers & internal services)
  - `types/` & `schemas/` (Zod definitions)
- **Consequences:** `app/` directory remains slim, containing only routing and layouts.

### ADR-002: tRPC v11 & App Router Integration
- **Context:** Need type-safe API aligned with Next.js 15.
- **Decision:** Use `tRPC v11@next`. 
- **Pattern:** 
  - **Reads:** Server-side prefetch in RSC + Hydration for TanStack Query.
  - **Writes:** Mutations via Client Components.
  - **Fallback:** Use Route Handlers/Adapters if v11@next becomes unstable during migration.

### ADR-003: "Soft RLS" with Enhanced Compensations
- **Context:** Sensitive "Shadow Zone" data requiring high confidentiality.
- **Decision:** Implement **Soft RLS** (App-level enforcement) for MVP V3, with a clear path to **Hard RLS** (Postgres sessions) for V4+.
- **Compensations (Mandatory):**
  - **Logical Separation:** Dedicated `shadow_profiles` table.
  - **Encryption:** Application-level encryption for Shadow Zone fields.
  - **Restricted Access:** Access limited to a single internal service and `protectedProcedure`.
  - **CI Validation:** Automated authorization tests in CI for all sensitive procedures.
  - **No Direct Access:** Client-side direct DB access (Supabase Client) is forbidden for sensitive tables.

### ADR-004: IA Mentor Streaming
- **Context:** Requirement for <3s p95 latency.
- **Decision:** Use **Vercel AI SDK (Core)** for standardized streaming.
- **Implementation:** tRPC handles conversation initiation and logging; a dedicated Route Handler manages the high-performance streaming stream.
  - **Target:** p95 < 3s for first-token delivery.

## 11. Implementation Patterns & Consistency Rules

### 11.1 Naming Conventions (Conflict Prevention)
- **Database (Prisma/Postgres):**
  - Models: `PascalCase` (e.g., `ShadowProfile`).
  - Fields: `camelCase` (e.g., `isEncrypted`).
  - Relations: `camelCase`.
- **Files:** `kebab-case.tsx` or `.ts` (e.g., `profile-card.tsx`).
- **React Components:** `PascalCase`.
- **Logic:** `camelCase` for functions and variables.
- **tRPC:** `camelCase` for routers and procedures (e.g., `mentor.getSessions`).

### 11.2 Feature-First Directory Structure
Each domain in `src/features/[domain]/` MUST follow this skeleton:
- `/components`: Domain-specific UI components.
- `/hooks`: Custom React hooks (TanStack Query wrappers).
- `/server`: tRPC sub-routers and internal logic (Services).
- `/types`: Shared TypeScript definitions.
- `/schemas`: Zod validation schemas.
- `index.ts`: Public API for the feature (exports only what is needed externally).

### 11.3 "Shadow Zone" Implementation Pattern (Security)
- **Isolation:** Sensitive data resides in `shadow_profiles` table.
- **Encryption:** AES-256-GCM application-level encryption for specific fields.
- **Access Control:** All reads/writes must pass through a dedicated `ShadowService` in `src/features/profile/server/`. No other feature may import Prisma models for shadow data directly.
- **Audit:** Every access to `shadow_profiles` must be logged.

### 11.4 API & Data Fetching Patterns
- **Standard Fetch:** Use RSC (Server Components) for initial data fetching with tRPC prefetching and Hydration.
- **Mutations:** Exclusively via tRPC Client procedures with optimistic updates where applicable.
- **Error Handling:** Use `TRPCError` with semantic codes. UI must use `sonner` toasts or inline error messages for feedback.
- **Loading:** Mandatory use of `shadcn/ui` Skeletons for RSC suspense states.

### 11.5 Enforcement for AI Agents
- **Rule 1:** NEVER create a new root-level folder without architectural review.
- **Rule 2:** Always check `@/features/[domain]/index.ts` before creating a duplicate utility.
- **Rule 3:** All tRPC procedures interacting with user data MUST use `protectedProcedure`.

## 12. Project Structure & Migration Strategy

### 12.1 Target Project Structure (The "North Star")
```text
TrailLearn/
├── src/
│   ├── app/                   # ROUTING & LAYOUT ONLY (Slim Layer)
│   ├── components/            # SHARED UI COMPONENTS (Atoms/Molecules)
│   ├── features/              # DOMAIN LOGIC (The Heart)
│   │   ├── profile/           # "Profil Être" + Shadow Zone
│   │   ├── ikigai-engine/     # Moteur de composition & Viabilité
│   │   ├── ai-mentor/         # IA Maïeutique (Prompts, History)
│   │   ├── travel-lab/        # Module Voyage (Conditionnel)
│   │   └── auth/              # Extensions NextAuth
│   ├── server/                # CORE BACKEND
│   │   └── api/               # tRPC Root Router
│   └── legacy/                # (Temporary) Location for un-migrated V1 code
```

### 12.2 Brownfield Migration Strategy
**Objective:** Evolve V1 codebase to V2 target without "Big Bang" rewrite.

**Phase 1: Foundation (Zero Breaking Changes)**
- Initialize `src/features/` directory structure.
- Setup tRPC v11 router alongside existing API routes.
- Isolate existing V1 business logic into `src/legacy/` or mark as deprecated.

**Phase 2: Additive Development (V2 Features)**
- Build `ai-mentor` and `ikigai-engine` directly in `src/features/`.
- Use the new tRPC router for these features.
- Connect V2 features to existing Auth/User system.

**Phase 3: Strangler Fig Migration (V1 Features)**
- Progressively refactor V1 features (e.g., old Profile page) into `src/features/profile/`.
- Switch routes in `src/app/` to use new components one by one.
- Delete legacy code only when fully replaced.

### 12.3 Integration Boundaries
- **tRPC Boundary:** Primary data gateway. No direct DB access in Client Components.
- **Shadow Boundary:** `shadow_profiles` table ACCESSIBLE ONLY via `src/features/profile/server/shadow-service.ts`.
- **UI Boundary:** `src/components/ui` are dumb/pure. Logic resides in `src/features/*/hooks`.

## 13. Architecture Validation Results

### Coherence Validation ✅
- **Stack Compatibility:** Next.js 15 + tRPC v11 is bleeding edge but consistent with the "Modern T3" vision.
- **Pattern Consistency:** Feature-first structure effectively isolates domain logic, preventing the "monolith" trap.
- **Brownfield Reality:** The migration strategy (Phase 1-3) effectively mitigates the risk of a "Big Bang" rewrite.

### Requirements Coverage ✅
- **Functional Requirements:** All 4 major modules (Profile, IKIGAI, Mentor, Travel) have dedicated feature folders.
- **Non-Functional Requirements:** Security (Shadow Zone) and Performance (AI Streaming) are addressed via specific ADRs.

### Readiness Assessment
**Overall Status:** READY FOR IMPLEMENTATION
**Confidence Level:** High
**Key Strength:** The "Soft RLS" with compensations offers a pragmatic balance between security and velocity for a brownfield project.

## 14. Implementation Handoff & Execution Plan

### Guiding Principle: Brownfield Evolution
**Do NOT rewrite from scratch.** Evolve the existing codebase.
**Target:** `src/features/` is the destination. `src/legacy/` (virtual or physical) is the departure point.

### Phase 1: Foundation & First Vertical Slice (Concrete Steps)
1.  **Scaffold Foundation:** Create `src/features/` and `src/server/api/root.ts` (tRPC v11) alongside existing API routes.
2.  **Safety Net:** Ensure existing `src/app/api/...` routes continue to work.
3.  **Migration Pilot (Vertical Slice):**
    - Pick ONE simple feature (e.g., "Basic Profile" or "Auth Status").
    - Move/Rewrite its logic into `src/features/profile/`.
    - Expose it via the new tRPC router.
    - Update the UI to consume it.
    - **Goal:** Prove the pattern works in production without regression.

### Security Reminder (Shadow Zone)
**MANDATORY:** Implement the `ShadowService` with application-level encryption BEFORE storing any real user Shadow Data. Soft RLS alone is not enough for this specific data category.

