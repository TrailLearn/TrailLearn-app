# Story 12.7: Hub IA Conversationnel & Stateful Chat

Status: done

## Story

As a utilisateur de TrailLearn,
I want échanger avec les IA via une interface de chat fluide et spécialisée,
So that je puisse construire mon projet de manière dynamique, conserver mon historique et recevoir des recommandations structurées sous forme de cartes.

## Acceptance Criteria

1. [ ] **Hub Coach IA** : Créer une page `/dashboard/coach` présentant deux cartes d'entrée : "Orientation Académique" et "Opportunités & Profil Builder".
2. [ ] **Chat Stateful** : Chaque discussion doit être liée à une session sauvegardée (`AiConversation`) permettant de reprendre là où on s'était arrêté.
3. [ ] **Interface Chat Riche** : Le chat doit supporter des blocs UI structurés (Cartes métiers, Gaps compétences, Écoles) insérés dans le flux de texte.
4. [ ] **Séparation des Contextes** : L'IA Orientation et l'IA Opportunités doivent avoir des systèmes de prompts et des historiques distincts.
5. [ ] **Persistance** : Tous les messages (utilisateur et IA) ainsi que les données structurées générées doivent être stockés en base.

## Tasks / Subtasks

- [x] Task 1: Evolution du Modèle de Données (Prisma)
  - [x] Ajouter les modèles `AiConversation` et `AiMessage`.
  - [x] Définir l'énumération `AiType` (ORIENTATION, OPPORTUNITY).
  - [x] Lier les conversations à l'utilisateur et les messages aux conversations.
  - [x] Exécuter `npx prisma generate`.
- [x] Task 2: Hub & Navigation
  - [x] Créer la page `/dashboard/coach/page.tsx` avec les cartes de sélection.
  - [x] Configurer les routes `/dashboard/coach/orientation` et `/dashboard/coach/opportunities`.
- [x] Task 3: API tRPC Stateful
  - [x] Créer une procédure `createConversation`.
  - [x] Créer une procédure `sendMessage` (named saveMessage in router).
  - [x] Créer une procédure `getHistory` (named getMessages in router).
- [x] Task 4: Adaptation des Services IA
  - [x] Modifier `OrientationService` et `OpportunityService` pour accepter un historique de messages.
  - [x] Implémenter la logique de "questions dynamiques" pour remplacer le wizard.
  - [x] Créer les API Routes de streaming (`/api/coach/orientation` & `/api/coach/opportunities`).
- [x] Task 5: Interface Chat UI (Frontend)
  - [x] Créer un composant `CoachChatInterface` générique.
  - [x] Créer le composant `UIBlockRenderer` pour afficher les cartes structurées.

## Dev Notes

- **Modèles Structurés** : Utiliser `Json` dans `AiMessage` pour stocker les blocs UI calculés par le LLM.
- **Streaming** : Privilégier `streamText` avec des `tools` ou `generateObject` pour les réponses finales.
- **Migration** : Les modèles `AiOrientation` et `AiOpportunity` créés précédemment serviront de "Snapshots" de résultats validés, tandis que `AiMessage` stocke le flux de pensée.

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Completion Notes List
- Restructured AI module from static wizard to stateful conversation.
- Implemented `AiConversation` and `AiMessage` models for persistent chat history.
- Created `/dashboard/coach` hub with specialized sub-chats.
- Built generic `CoachChatInterface` supporting custom API routes and streaming.
- Developed `UIBlockRenderer` for structured data cards (Jobs, Skills, Opportunities).
- Secured message persistence directly in Edge API routes.
- Cleaned up legacy `ai-wizard` and obsolete tRPC routers.

### File List
- `prisma/schema.prisma`
- `src/server/api/routers/ai-coach.ts`
- `src/server/api/root.ts`
- `src/app/dashboard/coach/page.tsx`
- `src/app/dashboard/coach/orientation/page.tsx`
- `src/app/dashboard/coach/opportunities/page.tsx`
- `src/app/api/coach/orientation/route.ts`
- `src/app/api/coach/opportunities/route.ts`
- `src/features/ai-coach/components/coach-chat-interface.tsx`
- `src/features/ai-coach/components/ui-block-renderer.tsx`
- `src/features/ai-engine/services/orientation.service.ts`
- `src/features/ai-engine/services/opportunities.service.ts`
- `src/app/dashboard/opportunities/page.tsx` (Restored to catalogue)
