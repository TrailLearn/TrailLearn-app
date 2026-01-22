import fs from 'node:fs';
import path from 'node:path';
import { generateText } from 'ai';
import { getLLMModel, LLM_PROVIDERS } from '../src/lib/llm-config';

// 1. Load .env manually to ensure we have the latest values from the file on disk
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  console.log(`📄 Loading environment from ${envPath}`);
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  envConfig.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/);
    if (match && match[1]) {
      const key = match[1];
      let value = match[2] || '';
      // Remove quotes if they exist
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      
      // Override or set process.env (Force override to pick up manual edits)
      process.env[key] = value;
    }
  });
} else {
  console.warn("⚠️  .env file not found at root! Relying on existing environment variables.");
}

async function runDiagnostics() {
  console.log("\n🔍 Starting LLM Connection Diagnostics...");
  console.log("========================================");
  
  const provider = process.env.LLM_PROVIDER;
  console.log(`\n1️⃣  Configuration Check`);
  console.log(`   Selected Provider (LLM_PROVIDER): "${provider}"`);
  
  if (!provider) {
    console.error("   ❌ LLM_PROVIDER is missing. Defaulting to 'openai' in code, but explicit config is better.");
  }

  // --- VARIABLE AUDIT ---
  console.log(`\n   Variable Audit for Provider: ${provider}`);
  
  if (provider === LLM_PROVIDERS.AZURE_OPENAI) {
      logVariableStatus('AZURE_RESOURCE_NAME', process.env.AZURE_RESOURCE_NAME);
      logVariableStatus('AZURE_DEPLOYMENT_NAME', process.env.AZURE_DEPLOYMENT_NAME);
      logVariableStatus('AZURE_API_KEY', process.env.AZURE_API_KEY, true);
      // Explicit check for cross-contamination
      if (process.env.OPENAI_API_KEY) console.log("   ⚠️  Warning: OPENAI_API_KEY is present but SHOULD be ignored.");
  } else if (provider === LLM_PROVIDERS.DEEPSEEK) {
      logVariableStatus('DEEPSEEK_API_KEY', process.env.DEEPSEEK_API_KEY, true);
      logVariableStatus('DEEPSEEK_MODEL', process.env.DEEPSEEK_MODEL);
  } else {
      // OpenAI Default
      logVariableStatus('OPENAI_API_KEY', process.env.OPENAI_API_KEY, true);
  }

  try {
    console.log(`\n2️⃣  Instantiating Model Object`);
    // This will now dynamically read process.env inside the function call
    const model = getLLMModel();
    console.log(`   ✅ Model object created successfully.`);

    console.log(`\n3️⃣  Testing Connection (Generating simple text)...`);
    const result = await generateText({
      model,
      prompt: 'Answer with the single word: "Connected".',
    });

    console.log(`   ✅ Response Received: "${result.text}"`);
    console.log(`\n🎉 SUCCESS! The provider "${provider}" is correctly configured and active.`);
    console.log("========================================");

  } catch (error: any) {
    console.error(`\n❌ DIAGNOSTICS FAILED`);
    console.error("========================================");
    console.error(`Error Name: ${error.name}`);
    console.error(`Message:    ${error.message}`);
    
    // Heuristic Advice
    if (error.message.includes('Missing OPENAI_API_KEY') && provider !== 'openai') {
        console.log(`\n💡 CRITICAL BUG FIX CONFIRMATION NEEDED:`);
        console.log(`   You are seeing 'Missing OPENAI_API_KEY' but provider is '${provider}'.`);
        console.log(`   This implies the code is still falling back to OpenAI logic.`);
        console.log(`   Ensure 'src/lib/llm-config.ts' has been updated to remove the top-level 'provider' constant.`);
    }

    if (error.message.includes('404')) {
       if (provider === LLM_PROVIDERS.AZURE_OPENAI) {
           console.log(`\n💡 DIAGNOSIS: 404 (Not Found) with Azure usually means:`);
           console.log(`   1. 'AZURE_RESOURCE_NAME' is the full URL instead of just the name.`);
           console.log(`   2. 'AZURE_DEPLOYMENT_NAME' does not match the DEPLOYMENT name in Azure AI Studio.`);
       }
    }
    
    process.exit(1);
  }
}

function logVariableStatus(name: string, value: string | undefined, isSecret = false) {
    let status = '';
    if (!value) status = '❌ MISSING';
    else if (isSecret) status = '✅ SET (********)';
    else status = `✅ SET ("${value}")`;
    
    console.log(`      - ${name.padEnd(25)} : ${status}`);
}

runDiagnostics();