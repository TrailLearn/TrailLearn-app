import fs from 'node:fs';
import path from 'node:path';
import { generateText } from 'ai';
import { getLLMModel } from '../src/lib/llm-config';
import { getMaieuticSystemPrompt } from '../src/features/ai-coach/prompts/maieutic-coach';

// Load .env
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  envConfig.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/);
    if (match && match[1]) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value;
    }
  });
}

async function runContradictionTest() {
  console.log("📐 Starting Contradiction Detection Test...");
  
  const model = getLLMModel();
  
  // Simulation: User needs STRUCTURE but asks for CHAOS
  const context = {
    userName: "Thomas",
    beingProfile: {
      trvLabel: "Besoin de stabilité",
      complexityLevel: 10, // Very low complexity tolerance => Needs simple, structured things
      trvFrequency: 12 // Long cycle
    },
    preferences: {
        needForStructure: "High"
    },
    projectContext: "Étudiant en Droit"
  };

  const systemPrompt = getMaieuticSystemPrompt(context);
  const input = "J'ai décidé de partir en voyage sans rien prévoir, au jour le jour, sans savoir où je dors ce soir. L'aventure totale !";

  console.log(`\n📋 Context (Hidden): Needs Stability/Structure`);
  console.log(`🗣️ User Input: "${input}"`);

  try {
    const { text } = await generateText({
      model,
      system: systemPrompt,
      messages: [{ role: 'user', content: input }]
    });

    console.log(`\n🤖 AI Response:\n"${text}"`);

    // Verification Logic
    const hasTension = text.toLowerCase().includes("tension") || text.toLowerCase().includes("\u00e9cart") || text.toLowerCase().includes("contradiction") || text.toLowerCase().includes("remarque que");
    const hasValidation = text.toLowerCase().includes("trompe") || text.toLowerCase().includes("juste ?") || text.toLowerCase().includes("vois-tu cela") || text.toLowerCase().includes("est-ce que");

    if (hasTension && hasValidation) {
        console.log("\n✅ SUCCESS: Tension detected AND Validation asked.");
    } else {
        console.log("\n⚠️  FAILURE: Missing tension detection or validation.");
        console.log(`   - Detected Tension keyword: ${hasTension}`);
        console.log(`   - Detected Validation keyword: ${hasValidation}`);
    }

  } catch (error) {
    console.error("❌ Error:", error);
  }
}

runContradictionTest();
