# Story 2.4: Saisie Pilier 2 - Budget & Garants

Status: ready-for-dev

## Story

As a étudiant,
I want saisir mes ressources financières (Épargne, Aides, Garants),
So that le système puisse évaluer ma solvabilité.

## Acceptance Criteria

1. [ ] **Given** l'étape 2 du tunnel. **When** je saisis mon épargne actuelle et le montant mensuel de mes garants. **Then** je peux voir le total mensuel disponible calculé en temps réel. [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 2.4]
2. [ ] **And** les montants sont validés (positifs, numériques). [Source: UX Requirement]
3. [ ] **And** les données sont sauvegardées dans le JSON du DVP. [Source: Architecture Decision]

## Tasks / Subtasks

- [ ] Task 1: Créer le Formulaire Budget (AC: 1, 2)
  - [ ] Créer `src/features/dvp/components/forms/budget-step-form.tsx`.
  - [ ] Champs: Épargne totale (€), Aide mensuelle garants (€), Autres revenus (€).
  - [ ] Validation Zod: nombres positifs obligatoires (0 par défaut).
- [ ] Task 2: Calculateur Temps Réel (AC: 1)
  - [ ] Utiliser `useWatch` de `react-hook-form` pour écouter les champs.
  - [ ] Afficher un composant "Total Mensuel Estimé" qui se met à jour instantanément : (Épargne / 10 mois) + Garants + Autres.
- [ ] Task 3: Sauvegarde (AC: 3)
  - [ ] Connecter à `dvp.update` via tRPC.

## Dev Notes

### Architecture & Technical Stack
- **Input Handling**: Attention aux inputs numériques en HTML/React (souvent des strings). Utiliser `valueAsNumber: true` ou le coercing Zod.
- **UX**: Afficher le symbole € clairement.

### Implementation Details
- **Logique**: Le calcul "Total Mensuel" est une pré-visualisation simple. Le vrai moteur de calcul (Epic 3) fera foi plus tard, mais l'utilisateur doit avoir un feedback immédiat.

### References
- [Epic Breakdown](BMAD_OUTPUT/planning-artifacts/epics.md)

## Dev Agent Record
- **Agent**: PM (John)
- **Action**: Created Story 2.4
