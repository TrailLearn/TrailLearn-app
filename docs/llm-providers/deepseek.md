# Configuration DeepSeek

Provider alternatif offrant un rapport performance/prix très agressif, compatible avec l'API OpenAI.

## 📋 Quand utiliser ce provider
- Réduction des coûts (développement ou prod budget-conscious).
- Tests de performance comparatifs.

## 🛠 Variables d'Environnement

### Configuration du Provider
```bash
LLM_PROVIDER=deepseek
```

### Variables Requises
| Variable | Description | Exemple |
|----------|-------------|---------|
| `DEEPSEEK_API_KEY` | Votre clé API DeepSeek | `sk-...` |

### Variables Optionnelles
| Variable | Description | Défaut |
|----------|-------------|--------|
| `DEEPSEEK_MODEL` | Le modèle à utiliser | `deepseek-chat` (souvent équivalent à V3/Coder selon l'alias) |

### Variables Inutiles
- `OPENAI_*`
- `AZURE_*`

## ⚙️ Exemple `.env`

```bash
LLM_PROVIDER=deepseek
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxx
DEEPSEEK_MODEL=deepseek-chat
```

## ⚠️ Particularités

L'implémentation utilise le client OpenAI standard (`createOpenAI` de `@ai-sdk/openai`) mais surcharge la `baseURL` vers `https://api.deepseek.com`.

```typescript
// Extrait de src/lib/llm-config.ts
const deepseek = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});
```

## 🐛 Erreurs Courantes

### `Missing DEEPSEEK_API_KEY`
- **Cause :** Variable manquante.

### Timeout ou Latence
- DeepSeek peut avoir une latence variable selon la charge. Le timeout par défaut du serveur (30s dans `route.ts`) peut être atteint.