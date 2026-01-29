# Story 13.3: Shadow Guard (Filtre Protecteur)

Status: ready-for-dev

## Story

As a utilisateur avec des fragilités,
I want que le système m'empêche de choisir des options qui activeraient mes peurs sans préparation,
So that je ne me mette pas en danger psychologique.

## Acceptance Criteria

1. [ ] **Given** une suggestion générée par le moteur (ex: "Conférencier"), **When** cette suggestion entre en conflit avec une Zone d'Ombre (ex: "Phobie sociale" déclarée en Story 11.4), **Then** l'option est tagguée "Risque d'exposition élevé" ou "Exposition progressive recommandée" plutôt que masquée silencieusement. [Source: epics.md#Story 13.3]
2. [ ] **And** le système propose une alternative compatible ou un chemin intermédiaire (ex: "Commencer par des webinaires sans caméra"). [Source: epics.md#Story 13.3]
3. [ ] **And** le message de blocage est protecteur et non culpabilisant ("Pour respecter votre besoin de sécurité actuel, cette option demande une préparation..."). [Source: epics.md#Story 13.3]

## Tasks / Subtasks

- [ ] Task 1: Conflict Detection
  - [ ] Implement `ShadowGuardService.checkConflict(suggestion, shadowProfile)`.
  - [ ] Use LLM to semantic match suggestion tags vs fear description.
- [ ] Task 2: UI Warning
  - [ ] Add `RiskBadge` component.
  - [ ] Overlay warning on Strategy Card.
- [ ] Task 3: Alternative Proposal
  - [ ] If high risk, prompt AI to generate "Stepping Stone" strategy.

## Dev Notes

- **Ethical AI**: This is a critical safety feature. Better to warn too much than too little.

## Dev Agent Record

### Agent Model Used
John (Product Manager)

### File List