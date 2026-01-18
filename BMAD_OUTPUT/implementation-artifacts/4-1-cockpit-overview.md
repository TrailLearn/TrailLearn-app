# Story 4.1: Dashboard Cockpit - Vue d'ensemble

Status: review

## Story

As a étudiant,
I want visualiser mes piliers DVP sur un tableau de bord centralisé,
so that je puisse voir l'état d'avancement global de mon projet.

## Acceptance Criteria

1. **Route Cockpit** : La page `/dvp/cockpit` est créée.
2. **Layout** : Sidebar avec navigation vers les 4 piliers (Projet, Budget, Logement, Langue).
3. **Statut de complétude** : Affichage du % de complétion pour chaque pilier.
4. **Informations clés** : Rappel de la ville cible et du type d'études en zone centrale.

## Tasks / Subtasks

- [x] Création de la page (AC: 1, 2)
  - [x] Créer `src/app/dvp/cockpit/page.tsx`.
  - [x] Implémenter le layout spécifique (Sidebar + Main Content).
- [x] Composants de statut (AC: 3)
  - [x] Créer `PillarStatusCard`.
  - [x] Brancher les données du DVP (`getLatest`).
- [x] Navigation (AC: 2)
  - [x] Permettre de retourner au Wizard pour modifier un pilier spécifique.

## Dev Notes

- **UI Blueprint** : S'inspirer de Taxonomy pour le shell du cockpit.
- **Data** : Utiliser tRPC pour récupérer le DVP en temps réel.

### References

- [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 4.1]
- [Source: BMAD_OUTPUT/planning-artifacts/prd.md#UX-2]

## Dev Agent Record

### Agent Model Used
BMad PM Agent (John)
