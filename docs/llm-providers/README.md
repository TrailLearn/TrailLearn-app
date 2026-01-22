# Documentation des Providers LLM

Ce dossier contient la documentation détaillée pour configurer les différents fournisseurs d'IA (LLM) supportés par l'application TrailLearn (Miroir Lucide).

## Providers Supportés

L'application utilise une architecture multi-providers abstraite via `src/lib/llm-config.ts`. Le choix du provider se fait via la variable d'environnement `LLM_PROVIDER`.

| Provider | Valeur `LLM_PROVIDER` | Fichier de doc | Usage recommandé |
|----------|-----------------------|----------------|------------------|
| **OpenAI** | `openai` (défaut) | [openai.md](./openai.md) | Développement rapide, tests, production standard. |
| **Azure OpenAI** | `azure_openai` | [azure-openai.md](./azure-openai.md) | **Production Enterprise**, sécurité, conformité, performance garantie. |
| **DeepSeek** | `deepseek` | [deepseek.md](./deepseek.md) | Alternative économique, performance comparable à GPT-4. |

## Architecture

Le système instancie dynamiquement le client AI SDK en fonction de la configuration.
Le code source de référence se trouve dans :
- Configuration : `src/lib/llm-config.ts`
- Service : `src/features/ai-coach/services/ai-service.ts`

## Diagnostic Rapide

Si le chat affiche une erreur générique :
1. Vérifiez les logs du **serveur** (terminal où tourne `npm run dev` ou logs Vercel/Azure).
2. L'erreur réelle y est logguée (`LLM Service Error: ...`).
3. Consultez la page spécifique du provider ci-dessus pour corriger les variables.
