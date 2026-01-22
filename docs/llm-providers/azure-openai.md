# Configuration Azure OpenAI

Provider recommandé pour la **Production** et les environnements nécessitant une conformité stricte (RGPD, données en Europe, SLA).

## 📋 Quand utiliser ce provider
- Production Enterprise.
- Besoin de latence garantie.
- Données doivent rester dans une région spécifique (ex: France Central).

## 🛠 Variables d'Environnement

### Configuration du Provider
```bash
LLM_PROVIDER=azure_openai
```

### Variables Requises
| Variable | Description | Format / Attention |
|----------|-------------|--------------------|
| `AZURE_RESOURCE_NAME` | Le nom de la ressource Azure AI. | **JUSTE LE NOM** (ex: `my-resource`), PAS l'URL (`https://...`). |
| `AZURE_API_KEY` | Une des deux clés d'accès de la ressource. | `32 char hex string` |
| `AZURE_DEPLOYMENT_NAME` | Le **nom du déploiement** dans Azure AI Studio. | **CRITIQUE :** Ce n'est PAS forcément le nom du modèle (ex: `gpt-4o`). C'est le nom que VOUS avez donné au déploiement (ex: `deploy-gpt4o-prod`). |

### Variables Optionnelles
Aucune variable optionnelle majeure implémentée pour l'instant (API Version gérée par défaut par le SDK).

### Variables Inutiles (Strictement Ignorées)
- `OPENAI_API_KEY` : **Jamais utilisée** quand `LLM_PROVIDER=azure_openai`. Si vous avez une erreur "Missing OPENAI_API_KEY", c'est que `LLM_PROVIDER` n'est pas correctement défini ou chargé.
- `DEEPSEEK_*`.

## ⚙️ Exemple `.env`

Supposons que votre Endpoint Azure est : `https://traillearn-ai-prod.openai.azure.com/`

```bash
LLM_PROVIDER=azure_openai

# Extrait de l'URL (traillearn-ai-prod)
AZURE_RESOURCE_NAME=traillearn-ai-prod

AZURE_API_KEY=9a8b7c6d5e4f...

# Le nom du DÉPLOIEMENT, pas du modèle
AZURE_DEPLOYMENT_NAME=gpt-4o-deployment-v1
```

## 🚨 Pièges Classiques & Diagnostic

### Erreur : `Resource not found (404)`
- **Symptôme :** Le chat répond "Une erreur est survenue" et les logs serveur montrent une 404.
- **Cause 1 :** `AZURE_RESOURCE_NAME` contient l'URL complète (`https://...`) au lieu du nom seul.
  - *Correction :* Ne mettez que le sous-domaine.
- **Cause 2 :** `AZURE_DEPLOYMENT_NAME` est incorrect. Le code essaie d'appeler `.../deployments/{AZURE_DEPLOYMENT_NAME}/...`. Si vous avez mis "gpt-4o" mais que votre déploiement s'appelle "gpt-4o-fr", ça échoue.
  - *Correction :* Vérifiez Azure AI Studio > Deployments.

### Erreur : `Access Denied (401)`
- **Cause :** Clé API incorrecte ou ressource incorrecte.

### "Une erreur est survenue" (Générique)
- Le backend capture l'erreur réelle et renvoie un message générique.
- **Action :** Regardez la console serveur (`npm run dev`) pour voir le vrai message d'erreur (`LLM Service Error: ...`).

## 🧪 Comment tester
1. Configurez le `.env`.
2. Lancez `npm run dev`.
3. Ouvrez le chat "Miroir Lucide".
4. Envoyez "Bonjour".
5. Si ça répond, vérifiez dans les logs Azure (Metrics) que l'appel a bien été reçu sur la ressource.