# Story 2.6: Saisie Pilier 4 - Langue

Status: done

## Story

As a étudiant,
I want déclarer mon niveau de langue pour le pays cible,
So that je puisse vérifier si je réponds aux exigences académiques.

## Acceptance Criteria

1. [ ] **Given** l'étape 4 du tunnel. **When** je sélectionne mon niveau CECRL (A1-C2). **Then** l'information est stockée.
2. [ ] **And** si le niveau est inférieur au minimum requis (B2 par défaut mocké), une alerte visuelle simple apparaît (Feedback immédiat, pas de blocage).

## Tasks / Subtasks

- [ ] Task 1: Créer le Formulaire Langue (AC: 1)
  - [ ] Créer `src/features/dvp/components/forms/language-step-form.tsx`.
  - [ ] Champs: Niveau Langue (Select: A1, A2, B1, B2, C1, C2).
- [ ] Task 2: Feedback Niveau (AC: 2)
  - [ ] Afficher une alerte (Alert Shadcn) jaune si niveau < B2. "Attention: La plupart des universités demandent un niveau B2 minimum."
- [ ] Task 3: Sauvegarde
  - [ ] Connecter à `dvp.update`. Stocker dans `dvp.data.language`.

## Dev Notes

### Architecture
- **Step**: Ajouter cette étape dans le `WizardStepper` si nécessaire (ou vérifier si elle rentre dans l'étape "Projet").
- **UX**: Simple select.

## Dev Agent Record
- **Agent**: PM (Auto-generated)
- **Action**: Created Story 2.6
