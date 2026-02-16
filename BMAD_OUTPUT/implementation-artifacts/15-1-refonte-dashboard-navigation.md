# Story: Refonte du Dashboard et de la Navigation

## État actuel
Le dashboard est minimaliste (2 cartes), avec beaucoup d'espace vide. La navigation ne reflète pas encore la vision globale de TrailLearn.

## Objectifs
- Enrichir le Dashboard pour montrer la vision globale de l'écosystème.
- Repenser le layout en grille 2x2.
- Activer uniquement le Coach IA, mettre les autres en "Preview".
- Ajouter les onglets "Opportunités" et "Bourses" dans la navigation.
- Créer des pages placeholders pour "Opportunités" et "Bourses".

## Critères d'Acceptation (AC)

### AC1: Header Personnalisé
- [x] Afficher "Bonjour, [Nom]"
- [x] Ajouter le sous-titre : "Votre espace de pilotage académique et professionnel."
- [x] Ajouter une barre de progression globale (mock visuel).

### AC2: Grille des Fonctionnalités (Dashboard)
- [x] Mise en page en grille 2x2.
- [x] Carte "Coach IA – Miroir Lucide" : Statut Actif (✅).
- [x] Carte "DVP – Dossier de Viabilité" : Statut Preview (🔒), grisé, badge "Bientôt disponible".
- [x] Carte "Cockpit" : Statut Preview (🔒), grisé, badge "Bientôt disponible".
- [x] Carte "Plan / Focus" : Statut Preview (🔒), grisé, badge "Bientôt disponible".
- [x] Les cartes en preview ne doivent pas être cliquables.

### AC3: Navigation (AppNavbar)
- [x] Ordre : Dashboard, Coach IA, Opportunités, Bourses, DVP (preview), Cockpit (preview).
- [x] Opportunités et Bourses sont visibles et actives (redirigent vers les placeholders).
- [x] DVP et Cockpit sont visibles mais en mode "disabled" (style grisé, non cliquable).

### AC4: Pages Placeholders
- [x] Créer `src/app/dashboard/opportunities/page.tsx`.
- [x] Créer `src/app/dashboard/scholarships/page.tsx`.
- [x] Ces pages doivent afficher un message "Bientôt disponible" avec une structure prête pour l'API (liste, filtres, recherche).

## Tâches d'implémentation

1. [x] Créer les types/constantes pour les statuts des fonctionnalités. (Inclus dans FeatureCard)
2. [x] Modifier `src/components/shared/app-navbar.tsx` pour la nouvelle navigation.
3. [x] Créer les pages placeholders `opportunities` et `scholarships`.
4. [x] Refondre `src/app/dashboard/page.tsx` avec le nouveau header et la grille.
5. [x] Créer des composants dédiés pour les cartes du dashboard dans `src/app/dashboard/_components`.
6. [x] Vérifier le rendu visuel et la cohérence UX.
