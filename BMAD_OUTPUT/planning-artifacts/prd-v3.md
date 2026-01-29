---
stepsCompleted: ["step-01-init", "step-e-01-discovery", "step-e-02-review", "step-e-03-edit"]
inputDocuments:
  - "BMAD_OUTPUT/analysis/brainstorming-session-2026-01-26.md"
  - "BMAD_OUTPUT/project-context.md"
  - "Brand/TrailLearn.md"
  - "Brand/Identity.md"
workflowType: 'prd'
classification:
  domain: 'EdTech'
  projectType: 'web_app'
  complexity: 'Medium'
lastEdited: '2026-01-27'
editHistory:
  - date: '2026-01-27'
    changes: 'Added UJ-4 Travel Journey, Quantified AI/UX metrics, Updated Frontmatter'
documentCounts:
  briefCount: 0
  researchCount: 0
  brainstormingCount: 1
  projectDocsCount: 3
---

# Product Requirements Document - TrailLearn (V3) : Architecte de Projet de Vie (IKIGAI)

**Auteur :** aubinaso
**Date :** 27 Janvier 2026
**Version :** 3.0 (Pivot Majeur - Post-Brainstorming 26/01/26)

## 1. Résumé Exécutif

### Vision
TrailLearn évolue d'un outil de faisabilité logistique vers un **Architecte de Projet de Vie**. Notre mission est de guider les utilisateurs à travers une introspection profonde pour aligner leur **Être** (valeurs, vitalité, zones d'ombre) avec leur **Faire** (carrière, projet, voyage), en utilisant le cadre IKIGAI non comme un idéal statique, mais comme une dynamique de construction viable.

### Différenciateur Clé
Contrairement aux bilans de compétences classiques ou aux IA de coaching génériques, TrailLearn intègre :
1.  **La Vérité Psychologique :** Prise en compte des "Zones d'Ombre" et de l'auto-sabotage pour protéger l'utilisateur.
2.  **Le Réalisme Économique :** Un moteur de "Viabilité Stratégique" qui ne vend pas du rêve mais construit des architectures de revenus hybrides (Portefeuille, Séquençage).
3.  **L'IA Maïeutique :** Un "Miroir de Contradiction" qui ne donne pas de réponses, mais pose les questions qui débloquent l'inertie.

### Utilisateurs Cibles
- **Cible Primaire : Étudiants & Jeunes Adultes (18-30 ans) :** En phase de construction de projet de vie, académique et personnel. Cherchent à structurer leur identité et leur avenir de manière cohérente.
- **Cible Secondaire (V4+) : Quêteurs de Sens & Profils en Transition (30-50 ans) :** Professionnels cherchant un pivot ou un réalignement profond.
- **Cible Transversale : Les Profils Atypiques :** Multipotentiels et neuro-atypiques ayant besoin d'un cadre de réflexion non-linéaire.

---

## 3. Portée du Produits (Scope)

### In Scope (MVP - Les 3 Piliers de la Vérité)
1.  **Le Profil Être (Data Model Avancé) :**
    - Capture du Taux de Renouvellement Vital (TRV).
    - Jauge de Sens Perçu & Sélecteur de Complexité.
    - Déclaration des Zones d'Ombre (Sabotage/Exposition).
2.  **Le Moteur IKIGAI (Logique de Composition) :**
    - Algorithme de Contextualisation Dynamique (Profil + Contexte -> Viabilité).
    - Stratège de Viabilité (Génération de scénarios : Portefeuille, Séquençage).
    - Filtre de Toxicité (Shadow Guard).
3.  **L'IA Mentor (Expérience Maïeutique) :**
    - Persona "Miroir Lucide".
    - Détection de Dissonance Cognitive.
    - Protocole d'Action Réversible.

### Règle d'Or du Module Voyage
**Le voyage est une réponse tactique, pas une option.** Aucune suggestion de voyage ne doit être faite sans un diagnostic préalable du Moteur IKIGAI et de l'IA Mentor. Une destination n'est proposée que si elle sert d'hypothèse existentielle formulée (ex: tester une compétence, une autonomie ou une identité dans un environnement à faible coût réputationnel).

### Out of Scope (Pour V3.0)
- Intégration API temps réel des offres d'emploi (simulation basée sur des archétypes pour l'instant).
- Réservation logistique de voyage (le voyage est traité comme "Laboratoire d'Identité", pas agence de voyage).
- Réseau social / Communauté (Focus sur l'introspection individuelle d'abord).

---

## 4. Parcours Utilisateurs (User Journeys)

### UJ-1 : La Révélation de l'Être (Onboarding Introspectif)
1.  L'utilisateur commence le "Diagnostic Vital".
2.  Au lieu de demander "Quel est votre métier ?", l'IA demande "Quelle est votre tolérance actuelle au chaos ?".
3.  L'IA sonde les "Zones d'Ombre" (ex: peur de l'exposition publique) avec tact.
4.  Le système construit le "Profil Être" incluant le TRV et les mécanismes de sabotage.
5.  **Résultat :** L'utilisateur se sent "vu" et compris dans sa complexité, pas juste comme une fiche de poste.

### UJ-2 : La Confrontation au Miroir (Coaching Maïeutique)
1.  L'utilisateur exprime un désir contradictoire (ex: "Je veux un impact mondial" ET "Je ne supporte pas la critique publique").
2.  L'IA Mentor active le "Miroir de Contradiction".
3.  Elle ne bloque pas, mais demande : "Tu souhaites un fort impact, mais ton seuil d'exposition est bas. Qu'est-ce que tu protèges en évitant la lumière ?"
4.  L'utilisateur réalise le blocage.
5.  **Résultat :** Une prise de conscience (Insight) qui débloque la prise de décision.

### UJ-3 : L'Architecture de Viabilité (Construction IKIGAI)
1.  L'utilisateur a défini ses passions et besoins financiers.
2.  Le Moteur IKIGAI analyse que la passion "Écriture Poétique" ne couvre pas le "Besoin Financier" immédiat.
3.  Au lieu de dire "Impossible", le Stratège propose : "Scénario Hybride : Consultant Technique (3j/semaine pour la sécurité) + Écriture (2j/semaine pour le sens)".
4.  Le système valide que ce mix respecte le TRV (énergie) de l'utilisateur.
5.  **Résultat :** Un plan d'action concret, chiffré et psychologiquement durable.

### UJ-4 : Le Voyage comme Hypothèse Test (Réponse Tactique)
1.  Le diagnostic révèle une "Zone d'Ombre" : Peur du jugement social dans l'environnement actuel.
2.  L'IA Mentor propose une hypothèse : "Si tu étais anonyme dans une grande ville étrangère, oserais-tu lancer ton projet ?"
3.  L'utilisateur accepte de tester cette hypothèse.
4.  Le module Voyage suggère une destination "Anonymat Urbain" (ex: Berlin, Tokyo) pour 2 semaines.
5.  Le système génère un "Protocole d'Action" pour ce voyage : "Lancer le MVP en anglais sous pseudonyme".
6.  **Résultat :** Le voyage n'est pas une fuite, mais une expérience scientifique de validation de soi.

---

## 5. Exigences du Domaine & Conformité

- **Confidentialité Psychologique (Éthique) :** Les données de "Zone d'Ombre" (peurs, sabotages) sont strictement privées. Aucune utilisation pour du ciblage publicitaire.
- **Transparence de l'IA :** L'utilisateur doit savoir qu'il interagit avec une IA "Miroir", et que les conseils sont des "Hypothèses à tester", pas des vérités absolues.
- **Protection de l'Utilisateur :** Le "Shadow Guard" doit empêcher le système de recommander des voies dangereuses pour la santé mentale de l'utilisateur (ex: burnout prédictible).

---

## 6. Exigences Fonctionnelles (FR)

### FR-01 : Gestion du Profil Être
- **FR-01-A :** Le système doit permettre à l'utilisateur de définir son "Taux de Renouvellement Vital" (fréquence de besoin de changement).
- **FR-01-B :** Le système doit capturer les préférences de "Complexité Cognitive" (Besoin de structure vs Besoin de chaos créatif).
- **FR-01-C :** Le système doit stocker les "Zones d'Ombre" de manière sécurisée et cryptée (RLS strict).

### FR-02 : IA Mentor (Miroir Lucide)
- **FR-02-A :** L'IA doit analyser le texte utilisateur pour détecter les contradictions sémantiques entre les valeurs déclarées et les objectifs visés.
- **FR-02-B :** L'IA doit pouvoir poser des "Questions de Verrouillage Anti-Fuite" lorsque l'utilisateur évite un sujet difficile.
- **FR-02-C :** L'IA doit contextualiser ses réponses en fonction de l'état émotionnel détecté avec une précision cible > 80% (benchmark sentiment analysis).

### FR-03 : Moteur de Viabilité IKIGAI
- **FR-03-A :** Le système doit générer des scénarios de "Portefeuille de Carrière" combinant plusieurs activités.
- **FR-03-B :** Le système doit calculer un "Score de Viabilité" pour chaque scénario, intégrant Finances + Énergie (TRV) + Sens.
- **FR-03-C :** Le système doit filtrer (Shadow Guard) les options qui violent les contraintes de sécurité psychologique de l'utilisateur.

### FR-04 : Module Voyage (Laboratoire d'Identité)
- **FR-04-A :** Le système ne peut suggérer des destinations que si une "Hypothèse Existentielle" a été validée par le Moteur IKIGAI et le Mentor (dépendance stricte au diagnostic).
- **FR-04-B :** Le système doit suggérer des types de destinations basés sur l'objectif de transformation (ex: "Besoin d'anonymat pour tester une nouvelle identité" -> Grande Métropole étrangère).
- **FR-04-C :** Le système doit permettre de définir des "Protocoles d'Action Réversible" (missions à accomplir durant le voyage).

---

## 7. Exigences Non-Fonctionnelles (NFR)



- **Sécurité (Privacy First) :** Données psychologiques sensibles stockées avec RLS (Row Level Security) strict. Cryptage au repos.

- **Latence IA :** Réponses du Mentor en moins de 3 secondes (p95) pour maintenir la fluidité de la conversation introspective (Streaming responses).

- **Fiabilité du Garde-Fou :** Le "Filtre de Toxicité" doit avoir un taux de faux négatifs proche de 0 (ne jamais laisser passer une recommandation dangereuse identifiée).

- **Accessibilité & UX Calme :** Interface conforme WCAG 2.1 AA. Densité visuelle maîtrisée (Ratio espace vide > 40%) pour favoriser la concentration profonde.
