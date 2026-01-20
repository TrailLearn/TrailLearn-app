- Compte supabase : `coachprotalent@gmail.com`
- Compte Vercel : `coachprotalent@gmail.com`
- GitHub Organisation : `TrailLearn`
- Supabase Project name : `TrailLearn`
- secret information about supabase in Keepas : `freelance/TrealLearn/TrailLearn supabase password`
- Vercel account : `coachprotalent@gmail.com`

- User de test :
    * email : `test@staging.com`
    * name : `Test staging`
    * password : `password123`

### 🚀 Sprint 2 Updates (AI Configuration)

**Configuration du Provider LLM (Source de vérité unique)**
Définir la variable `LLM_PROVIDER` pour choisir le moteur (défaut: `openai`).

#### Option A : OpenAI (Défaut)
- `LLM_PROVIDER`: `openai`
- `OPENAI_API_KEY`: `sk-...`
- `OPENAI_MODEL`: `gpt-4o` (défaut) ou `gpt-3.5-turbo`

#### Option B : Azure OpenAI
- `LLM_PROVIDER`: `azure_openai`
- `AZURE_RESOURCE_NAME`: Nom de la ressource Azure
- `AZURE_API_KEY`: Clé API Azure
- `AZURE_DEPLOYMENT_NAME`: Nom du déploiement (ex: `gpt-4o-deploy`)

#### Option C : DeepSeek
- `LLM_PROVIDER`: `deepseek`
- `DEEPSEEK_API_KEY`: Clé API DeepSeek
- `DEEPSEEK_MODEL`: `deepseek-chat` (défaut)

*Note : Seules les variables du provider choisi sont requises.*