# Configuration OpenAI

Provider par défaut pour TrailLearn. Idéal pour le développement local et les environnements de staging.

## 📋 Quand utiliser ce provider
- Développement local (setup rapide).
- Prototypage.
- Production si les contraintes de conformité le permettent.

## 🛠 Variables d'Environnement

### Configuration du Provider
```bash
LLM_PROVIDER=openai
```

### Variables Requises
| Variable | Description | Exemple |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Votre clé API OpenAI (commençant par `sk-...`) | `sk-proj-1234...` |

### Variables Optionnelles
| Variable | Description | Défaut |
|----------|-------------|--------|
| `OPENAI_MODEL` | Le modèle à utiliser (ID du modèle) | `gpt-4o` |

### Variables Inutiles (Ignorées)
- `AZURE_*` (Toute configuration Azure est ignorée).
- `DEEPSEEK_*` (Toute configuration DeepSeek est ignorée).

## ⚙️ Exemple `.env`

```bash
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
# Optionnel
OPENAI_MODEL=gpt-4-turbo
```

## 🐛 Erreurs Courantes

### `Missing OPENAI_API_KEY`
- **Cause :** La variable n'est pas définie dans le `.env` ou le fichier n'est pas chargé.
- **Solution :** Vérifiez le fichier `.env` et redémarrez le serveur.

### `401 Unauthorized`
- **Cause :** Clé API invalide ou révoquée.
- **Solution :** Générez une nouvelle clé sur [platform.openai.com](https://platform.openai.com).

### `429 Too Many Requests`
- **Cause :** Quota dépassé ou pas de crédits (compte gratuit expiré).
- **Solution :** Vérifiez la facturation sur OpenAI.