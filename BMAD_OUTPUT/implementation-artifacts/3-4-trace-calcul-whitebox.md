# Story 3.4: Trace de Calcul (Observabilité Boîte Blanche)

Status: review

## Story

As a développeur,
I want accéder au détail du raisonnement algorithmique pour un calcul donné,
so that je puisse expliquer précisément un résultat et faciliter le support.

## Acceptance Criteria

1. **Objet de Trace** : Le moteur de calcul (3.2) produit un log structuré des étapes (ex: "Input: cost=300, Rule: min=400, Result: Negative").
2. **Stockage** : Cette trace est persistée en base de données (table `CalculationTrace` ou champ dédié dans `DvpRecord`).
3. **Accès Admin** : Un administrateur peut visualiser cette trace depuis le dashboard admin.

## Tasks / Subtasks

- [x] Extension du moteur (AC: 1)
  - [x] Modifier `calculateViability` pour collecter les logs d'exécution.
- [x] Persistance (AC: 2)
  - [x] Créer le modèle `CalculationLog` ou étendre `DvpRecord`.
  - [x] Sauvegarder la trace lors du snapshot (3.3).
- [x] Interface de visualisation (AC: 3)
  - [x] Créer un composant `CalculationDebugView` pour l'admin.

## Dev Notes

- **Boîte Blanche** : L'objectif est la transparence totale. On veut pouvoir dire "Le rouge vient de la ligne 42 des règles de Lyon".

### References

- [Source: BMAD_OUTPUT/planning-artifacts/architecture.md#Observabilité]
- [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 3.4]

## Dev Agent Record

### Agent Model Used
BMad PM Agent (John)
