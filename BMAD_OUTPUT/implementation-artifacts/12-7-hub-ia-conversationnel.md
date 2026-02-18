# Story 12.7: Hub IA Conversationnel & Stateful Chat

Status: todo

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
- [ ] Task 5: Interface Chat UI (Frontend)
  - [ ] Créer un composant `ChatInterface` générique.
  - [ ] Créer les parseurs de messages pour détecter les `structuredData` et afficher les cartes correspondantes.

## Dev Notes

- **Modèles Structurés** : Utiliser `Json` dans `AiMessage` pour stocker les blocs UI calculés par le LLM.
- **Streaming** : Privilégier `streamText` avec des `tools` ou `generateObject` pour les réponses finales.
- **Migration** : Les modèles `AiOrientation` et `AiOpportunity` créés précédemment serviront de "Snapshots" de résultats validés, tandis que `AiMessage` stocke le flux de pensée.

## Dev Agent Record

### Agent Model Used
Amelia (Senior Software Engineer)

### Completion Notes List
- (En attente d'implémentation)

### File List
- (En attente d'implémentation)
