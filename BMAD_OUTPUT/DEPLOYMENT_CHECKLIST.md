# TrailLearn - Checklist de Déploiement

Ce document détaille les étapes nécessaires pour déployer TrailLearn en production avec le "Safe Space" (RLS) activé.

## 1. Supabase (Base de Données)

- [ ] **Créer un projet Supabase** (Region: Paris/Frankfurt recommandé pour latence EU).
- [ ] **Récupérer les variables d'environnement** :
  - `DATABASE_URL` (Connection String > Transaction Pooler port 6543)
  - `DIRECT_URL` (Connection String > Session Pooler port 5432)
- [ ] **Exécuter les migrations Prisma** (depuis le poste local ou CI/CD) :
  ```bash
  npx prisma migrate deploy
  ```
- [ ] **Activer le Safe Space (RLS)** :
  - Aller dans le Dashboard Supabase > SQL Editor.
  - Copier/Coller le contenu de `prisma/sql/enable_rls.sql`.
  - Exécuter le script ("Run").
  - Vérifier dans "Table Editor" que les cadenas (RLS) sont actifs sur toutes les tables.

## 2. Vercel (Hosting App)

- [ ] **Importer le projet Git** dans Vercel.
- [ ] **Configurer les Variables d'Environnement** :
  - `DATABASE_URL` : (Valeur Supabase Transaction Pooler)
  - `DIRECT_URL` : (Valeur Supabase Direct Connection - si utilisé par Prisma migrate)
  - `AUTH_SECRET` : Générer une clé forte (`openssl rand -base64 32`)
  - `NEXTAUTH_URL` : (Automatique sur Vercel, mais définir si besoin d'override)
- [ ] **Déployer**.

## 3. Vérification Post-Déploiement

- [ ] **Navigation** : Accéder à l'URL de prod.
- [ ] **Landing Page** : Vérifier l'affichage correct (Design System, Fonts).
- [ ] **Inscription** : Créer un compte utilisateur de test.
- [ ] **Safe Space** : Vérifier que l'accès `/dashboard` est possible une fois connecté.
- [ ] **Déconnexion** : Vérifier que la session est bien détruite.
- [ ] **Security Probe (Optionnel)** : Tenter d'accéder aux données via l'API publique Supabase (si activée) avec une clé anon -> Devrait échouer (RLS).
