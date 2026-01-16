# Story 1.3: Activation du Safe Space (RLS Postgres)

Status: in-progress

## Story

As a utilisateur soucieux de ma vie privée,
I want que mes données soient isolées au niveau de la base de données via Row Level Security (RLS),
So that aucun autre utilisateur ne puisse y accéder par erreur ou malveillance, et que la sécurité soit garantie en profondeur (Defense in Depth).

## Acceptance Criteria

1. [ ] **Given** une base de données PostgreSQL sur Supabase. **When** j'active les politiques Row Level Security (RLS) sur la table `User` et les tables liées (`Account`, `Session`, `Post`). **Then** le RLS est actif.
2. [ ] **Given** une connexion standard (ex: API Data ou client anonyme). **When** une requête tente de lire les données. **Then** elle est rejetée par défaut sauf politique explicite.
3. [ ] **Given** l'application Next.js (Prisma). **When** elle se connecte via la connection string de service (Supabase Transaction Pooler). **Then** elle conserve l'accès complet nécessaire au fonctionnement backend (via rôle admin/service ou politique permissive pour le user postgres).
4. [ ] **Given** un déploiement Vercel. **When** les variables d'environnement sont configurées. **Then** l'application fonctionne en production sur les données réelles (Staging).

## Tasks / Subtasks

- [ ] Task 1: Préparer le script SQL d'activation RLS.
  - [ ] Enable RLS sur `User`, `Account`, `Session`, `Post`.
  - [ ] Créer des policies :
    - `service_role` (utilisé par Prisma/Backend) : FULL ACCESS.
    - `authenticated` (utilisé potentiellement par Supabase Client direct, optionnel ici mais bonne pratique) : READ/UPDATE own rows `USING (auth.uid() = id)` (nécessite mapping ID Supabase Auth vs Prisma, ici on utilise NextAuth pur donc le `auth.uid()` de Supabase ne matche pas directement l'ID Prisma qui est un CUID. On va se concentrer sur la protection par défaut : DENY ALL pour public/anon, ALLOW ALL pour postgres/service_role).
- [ ] Task 2: Documentation Déploiement & Checklist.
  - [ ] Créer `DEPLOYMENT.md` avec les étapes Supabase (création projet, exécution SQL via Dashboard/Editor) et Vercel (ENV vars).
- [ ] Task 3: Validation Live (Manuel).
  - [ ] Push code.
  - [ ] Setup Supabase & Vercel.
  - [ ] Verify Login flow.

## Dev Notes

### RLS Strategy avec Prisma & NextAuth (Self-Hosted Auth)
Comme nous utilisons NextAuth avec Prisma Adapter (et non Supabase Auth pour l'instant), la gestion des utilisateurs est dans la table `User` de Prisma.
Supabase Auth gère ses utilisateurs dans `auth.users`. Il y a une distinction.
Ici, "Safe Space" RLS signifie surtout : **Verrouiller l'accès direct à la DB pour tout ce qui n'est pas le backend officiel.**
Donc :
- Enable RLS.
- Policy "Enable All for Postgres/Service Role" (notre backend Prisma).
- Policy "Deny All for Public/Anon" (sécurité par défaut).

Cela empêche quiconque trouvant l'URL publique (si exposée) ou utilisant l'API Data Supabase sans clé service de lire les données.

### Implementation
Le fichier `prisma/sql/enable_rls.sql` sera créé pour être exécuté dans l'éditeur SQL Supabase.

## Dev Agent Record
- **Agent**: Amelia
