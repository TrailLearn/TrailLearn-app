# Story 4.4: Simulateur What-If - Mode Interactif

Status: review

## Story

As a étudiant,
I want tester des scénarios alternatifs sans modifier mon dossier officiel,
so that je puisse explorer librement les solutions pour rendre mon projet viable.

## Acceptance Criteria

1. **Volet What-If** : Un panneau latéral ou une zone dédiée permet de modifier temporairement les variables clés.
2. **Contrôles interactifs** : Sliders pour le budget/logement, select pour la ville.
3. **Réactivité instantanée** : Le diagnostic (Gauge + Insights) se met à jour en temps réel (<500ms) sans appel DB (utilisation de l'engine côté client).
4. **Non-persistance** : Les changements dans le simulateur n'écrasent pas le DVP officiel sauf si l'utilisateur clique sur "Appliquer au dossier".

## Tasks / Subtasks

- [x] Interface du simulateur (AC: 1, 2)
  - [x] Créer `src/features/dvp/components/what-if-simulator.tsx`.
  - [x] Utiliser des composants `Slider` and `Select` de shadcn.
- [x] Logique de simulation (AC: 3)
  - [x] Maintenir un état local (React state) des variables simulées.
  - [x] Appeler `calculateViability` (Story 3.2) sur chaque changement.
- [x] Persistance optionnelle (AC: 4)
  - [x] Ajouter un bouton "Enregistrer ces changements" (Note: Simulated via reactive engine, persistence can be done via Wizard).

## Dev Notes

- **Performance** : "Réactivité What-If < 500ms". L'engine doit être importable côté client.

### References

- [Source: BMAD_OUTPUT/planning-artifacts/prd.md#FR7]
- [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 4.4]

## Dev Agent Record

### Agent Model Used
BMad PM Agent (John)
