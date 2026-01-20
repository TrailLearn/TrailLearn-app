# Story 3.2: Moteur de Calcul (Pure Logic)

Status: review

## Story

As a système,
I want calculer le diagnostic de viabilité (🔴🟠🟢) à partir des saisies et des règles actives,
so that je puisse fournir un résultat objectif et déterministe.

## Acceptance Criteria

1. **Fonction Pure** : Une fonction `calculateViability` est implémentée dans `src/features/dvp/engine/`.
2. **Entrées** : La fonction prend en entrée les données du DVP (`DvpData`) et le référentiel des règles (`BusinessRule[]`).
3. **Sorties** : Retourne un objet contenant `status` (RED, AMBER, GREEN), `score`, `resteAVivre`, et un tableau de `findings` (fragilités détectées).
4. **Calcul Budget** : Le "Reste à Vivre" est calculé : (Revenus mensuels - Loyer estimé - Coût vie ville).
5. **Seuils** : 
   - GREEN : Reste à vivre > seuil_confort.
   - AMBER : Reste à vivre > seuil_survie mais < seuil_confort.
   - RED : Reste à vivre < seuil_survie OU conditions bloquantes (ex: langue insuffisante).
6. **Tests Unitaires** : Couverture complète des scénarios (cas nominaux, limites, erreurs).

## Tasks / Subtasks

- [x] Création de l'engine (AC: 1, 2, 3)
  - [x] Créer `src/features/dvp/engine/calculate-viability.ts`.
  - [x] Définir les types de sortie (`ViabilityResult`, `ViabilityFinding`).
- [x] Implémentation de la logique de calcul (AC: 4, 5)
  - [x] Implémenter le calcul du budget (Piliers Budget + Logement).
  - [x] Intégrer la vérification du pilier Langue.
  - [x] Gérer les cas de données manquantes (Status INCOMPLETE).
- [x] Tests Unitaires (AC: 6)
  - [x] Créer `src/features/dvp/engine/calculate-viability.test.ts`.
  - [x] Tester les 3 couleurs de diagnostic.
  - [x] Tester les cas limites (exactement au seuil).

## Dev Notes

- **Boîte Blanche** : Chaque `finding` doit expliquer *pourquoi* il a été généré (ex: "Budget inférieur au seuil de 800€ à Paris").
- **Pureté** : La fonction ne doit pas appeler la DB elle-même. Les règles doivent être passées en paramètre.

### Project Structure Notes

- Engine : `src/features/dvp/engine/`.
- Types : `src/features/dvp/types.ts`.

### References

- [Source: BMAD_OUTPUT/planning-artifacts/prd.md#FR5]
- [Source: BMAD_OUTPUT/planning-artifacts/architecture.md#Moteur de Calcul (Isolation)]

## Dev Agent Record

### Agent Model Used
BMad PM Agent (John)

### Completion Notes List
- Logic engine structure defined.
- Pure function requirement emphasized.
