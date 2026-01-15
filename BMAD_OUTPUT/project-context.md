---
project_name: 'TrailLearn'
user_name: 'aubinaso'
date: 'Thursday, January 15, 2026'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 18
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

*   **Framework**: Next.js 15.x (App Router)
*   **Language**: TypeScript 5.x (Strict Mode)
*   **Database**: PostgreSQL (Supabase) via Prisma ORM 5.x
*   **API**: tRPC 11.x (Type-safe procedures)
*   **UI**: Tailwind CSS 3.4+ & shadcn/ui
*   **Auth**: NextAuth.js (v4 or v5)

## Critical Implementation Rules

### Language-Specific Rules
*   **TypeScript Strict**: Mandatory explicit typing for function parameters and complex returns. No `any`.
*   **Zod Validation**: Required for all tRPC inputs, environment variables, and API responses.

### Framework-Specific Rules
*   **Feature-First**: All domain logic/components must live in `src/features/[domain]/`.
*   **App Router**: `src/app/` is strictly for routing and layouts. Keep page components minimal.
*   **Server State**: Use TanStack Query (via tRPC) for all server data. No `useEffect` for fetching.

### Code Quality & Style Rules
*   **Naming (Files)**: `kebab-case.tsx` or `kebab-case.ts`.
*   **Naming (Components)**: `PascalCase`.
*   **Naming (Database)**: `PascalCase` for models, `camelCase` for fields.
*   **UI Components**: Stupide/Atomic components in `src/components/ui/`.

### Critical Don't-Miss Rules (Safe Space)
*   **Backend as Truth**: Never hardcode business rules (prices, thresholds) in the frontend. 
*   **Simulation**: Frontend What-If must use coefficients/models provided by the backend via tRPC.
*   **Security (RLS)**: Row Level Security must be enabled on all sensitive tables (DVP, Profile).
*   **tRPC Security**: Use `protectedProcedure` for any user-specific data access.

---

## Usage Guidelines

**For AI Agents:**
*   Read this file before implementing any code.
*   Follow ALL rules exactly as documented.
*   Prioritize `src/features/` over `src/app/` for logic.
*   Update this file if new recurring patterns are established.

**For Humans:**
*   Keep this file lean and focused on agent needs.
*   Update when technology stack changes.
*   Review periodically to remove rules that become standard practice.

Last Updated: Thursday, January 15, 2026