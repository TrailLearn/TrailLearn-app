# Story 4.2: Restitution du Diagnostic (ViabilityGauge)

Status: review

## Story

As a étudiant,
I want voir mon statut de viabilité de manière visuelle et immédiate,
so that je puisse ressentir instantanément si mon projet est sur la bonne voie.

## Acceptance Criteria

1. **Composant Jauge** : Création du composant `ViabilityGauge` utilisant `lucide-react` et Tailwind.
2. **États visuels** : Supporte 3 états :
   - 🔴 **Non Viable** : Rouge vif, message d'alerte.
   - 🟠 **Fragile** : Orange/Ambre, message de prudence.
   - 🟢 **Viable** : Vert TrailLearn, message de félicitations.
3. **Intégration Cockpit** : La jauge est affichée en haut du cockpit.
4. **Message empathique** : Un texte explicatif accompagne la couleur.

## Tasks / Subtasks

- [x] Développement du composant UI (AC: 1, 2)
  - [x] Créer `src/features/dvp/components/viability-gauge.tsx`.
  - [x] Implémenter le design (arc de cercle ou barre de progression stylisée).
- [x] Branchement données (AC: 3, 4)
  - [x] Récupérer le `status` du diagnostic (Story 3.3).
  - [x] Mapper le status vers la couleur et le texte.
- [x] Responsive (AC: 1)
  - [x] Assurer un affichage correct sur mobile.

## Dev Notes

- **Accessibilité** : Ne pas se fier uniquement à la couleur (Double codage visuel : icône + texte).

### References

- [Source: BMAD_OUTPUT/planning-artifacts/prd.md#UX-3]
- [Source: BMAD_OUTPUT/planning-artifacts/epics.md#Story 4.2]

## Dev Agent Record

### Agent Model Used
BMad PM Agent (John)
