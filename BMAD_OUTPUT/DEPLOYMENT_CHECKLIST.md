# Deployment Checklist & Environment Setup

Pour passer en **Live Staging** (Supabase + Vercel) et valider la Story 1.3.

**Note Plan Gratuit Supabase :** Certaines options d'interface (UI) pour le pooling ou SSL peuvent varier ou être masquées. Ce guide privilégie les méthodes robustes qui fonctionnent sur tous les plans.

## 1. Supabase (Database)

1.  [ ] **Créer un projet** sur [database.new](https://database.new) (ou utiliser un projet existant).
2.  [ ] **Récupérer la Connection String** :
    *   Cliquer sur le bouton **"Connect"** (en haut à droite du dashboard).
    *   Aller dans l'onglet **"ORMs"** -> **"Prisma"**.
    *   Copier la chaîne affichée.
    *   *Note Pooling (Transaction Mode)* : Vérifier si le port est `6543` (Pooling actif) ou `5432` (Direct). Pour Vercel (Serverless), le port **6543** est recommandé. Si l'UI ne le montre pas explicitement, utilisez la chaîne fournie par l'assistant "Connect" qui est optimisée pour votre projet.
    *   *Format type* : `postgres://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true`
3.  [ ] **Exécuter les Migrations Prisma** (depuis le terminal local vers Supabase) :
    *   Configurer temporairement `DATABASE_URL` dans votre `.env` local avec l'URL de prod Supabase.
    *   `npx prisma migrate dev --name init_rls_supa` (Cela va créer les tables `User`, `Account`, etc. sur Supabase).
4.  [ ] **Activer le RLS (Safe Space)** :
    *   *Note* : Cette étape se fait via **SQL Editor**, méthode universelle (Plan Free ou Pro).
    *   Aller dans l'**SQL Editor** (icône terminal à gauche).
    *   Copier-coller le contenu du fichier local `prisma/sql/enable_rls.sql` et exécuter (**Run**).
    *   Vérifier dans le **Table Editor** que les tables ont bien l'icône "RLS" (cadenas/bouclier) active.

*Note SSL* : Sur le plan gratuit, les options avancées comme "Enforce SSL" peuvent ne pas être modifiables dans l'UI. La configuration standard fournie par la connection string est suffisante et sécurisée pour la V1.

## 2. Vercel (Hosting)

1.  [ ] **Importer le projet** depuis GitHub.
2.  [ ] **Configurer les Variables d'Environnement** :

| Variable | Description | Valeur / Exemple |
| :--- | :--- | :--- |
| `DATABASE_URL` | Connection string Postgres (Supabase) | `postgres://postgres...:6543/postgres?pgbouncer=true` (Voir étape 1.2) |
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
2.  La DB est Postgres (Supabase).
3.  Le RLS est actif.
4.  On peut attaquer le **Story 2.1 : Modèle DVP (JSONB)** qui fonctionnera nativement sur cette infra.