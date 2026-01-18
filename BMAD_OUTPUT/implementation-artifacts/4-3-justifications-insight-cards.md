# Story 4.3: Justifications Boîte Blanche (InsightCards)

Status: review

## Story

As a étudiant,
I want comprendre les facteurs précis qui rendent mon dossier fragile,
so that je sache exactement sur quel levier agir.

## Acceptance Criteria

1. **Composant InsightCard** : Affichage des "Findings" du diagnostic (Story 3.2).
2. **Structure de carte** : Titre, Explication (Règle métier), Valeur saisie, Recommandation.
3. **Catégorisation** : Les cartes sont groupées par piliers (Budget, Logement, etc.).

## Tasks / Subtasks

- [x] Composant UI (AC: 1, 2)
  - [x] Créer `src/features/dvp/components/insight-card.tsx`.
- [x] Rendu de liste (AC: 3)
  - [x] Dans le cockpit, itérer sur `diagnostic.findings` pour afficher les cartes.
- [x] Remédiations (AC: 2)
  - [x] Ajouter un lien vers la documentation ou le simulateur pour chaque fragilité.

## Dev Notes

- **Boîte Blanche** : L'explication doit être pédagogique. "Votre budget est de 500€, mais le coût de la vie à Paris est de 800€."

### References

- [Source: BMAD_OUTPUT/planning-artifacts/prd.md#FR8]
- [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 4.3]

## Dev Agent Record

### Agent Model Used
BMad PM Agent (John)
