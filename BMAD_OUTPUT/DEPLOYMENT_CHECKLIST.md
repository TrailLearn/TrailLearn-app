# Deployment Checklist & Environment Setup

Pour passer en **Live Staging** (Supabase + Vercel) et valider la Story 1.3.

## 1. Supabase (Database)

1.  [ ] **Créer un projet** sur [database.new](https://database.new) (ou utiliser un projet existant).
2.  [ ] **Récupérer la Connection String** (Settings > Database > Connection Pooling).
    *   Utiliser le mode `Transaction` (port 6543) pour IPv4 (compatible Vercel/Prisma).
    *   Format: `postgres://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true` (Adapter si besoin).
3.  [ ] **Exécuter les Migrations Prisma** (depuis le terminal local vers Supabase) :
    *   Mettre à jour le `.env` local avec l'URL de prod Supabase (juste pour la commande) OU utiliser l'option `--url`.
    *   `npx prisma migrate dev --name init_rls_supa` (Cela va créer les tables sur Supabase).
4.  [ ] **Activer le RLS (Safe Space)** :
    *   Aller dans l'**SQL Editor** de Supabase.
    *   Copier-coller le contenu de `prisma/sql/enable_rls.sql` et exécuter.
    *   Vérifier dans le Table Editor que les tables ont l'icône "RLS" (cadenas/bouclier).

## 2. Vercel (Hosting)

1.  [ ] **Importer le projet** depuis GitHub.
2.  [ ] **Configurer les Variables d'Environnement** :

| Variable | Description | Valeur / Exemple |
| :--- | :--- | :--- |
| `DATABASE_URL` | Connection string Postgres (Supabase) | `postgres://postgres...:6543/postgres?pgbouncer=true` |
| `AUTH_SECRET` | Secret pour NextAuth (encryption) | Générer via `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL canonique du site | `https://traillearn-staging.vercel.app` (Auto sur Vercel si non défini, mais recommandé) |
| `NEXTAUTH_SECRET` | Alias pour AUTH_SECRET (parfois requis v4/v5) | Même valeur que AUTH_SECRET |

3.  [ ] **Déployer**.

## 3. Validation Live

1.  [ ] Accéder à l'URL Vercel.
2.  [ ] Tenter de s'inscrire (Signup) -> Vérifier que l'utilisateur est créé dans Supabase (`User` table).
3.  [ ] Tenter de se connecter (Signin) -> Vérifier redirection Dashboard.
4.  [ ] Vérifier qu'on ne peut pas accéder aux données sans être connecté (Middleware actif).

## 4. Reprise du Dev (Story 2.1)

Une fois cette étape validée :
1.  Le code est en prod/staging.
2.  La DB est Postgres.
3.  On peut attaquer le modèle DVP (JSONB) qui fonctionnera nativement sur cette infra.
