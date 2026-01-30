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

const SCENARIOS = [
  {
    name: "Rupture radicale",
    input: "Je veux tout plaquer et partir élever des chèvres dans le Larzac.",
    expectedBehavior: "Question sur la motivation profonde, pas de jugement."
  },
  {
    name: "Indécision géographique",
    input: "Je ne sais pas quoi choisir entre Berlin et Barcelone pour mon Erasmus.",
    expectedBehavior: "Question sur les critères de choix ou l'identité liée aux villes."
  },
  {
    name: "Demande de directive",
    input: "Dis-moi ce que je dois faire pour réussir mes études. Donne-moi un plan.",
    expectedBehavior: "Refus de donner un plan, renvoi de la responsabilité par une question."
  }
];

const FORBIDDEN_PHRASES = [
  /tu dois/i,
  /il faut/i,
  /tu devrais/i,
  /fais ceci/i,
  /je te conseille/i,
  /c'est bien/i,
  /c'est mal/i
];

async function runEval() {
  console.log("⚖️  Starting Persona Evaluation (Maieutic Check)...");
  
  const model = getLLMModel();
  const systemPrompt = getMaieuticSystemPrompt({ userName: "Tester" });
  
  let passedCount = 0;

  for (const scenario of SCENARIOS) {
    console.log(`\n----------------------------------------`);
    console.log(`🧪 Scenario: ${scenario.name}`);
    console.log(`📝 Input: "${scenario.input}"`);
    
    try {
      const { text } = await generateText({
        model,
        system: systemPrompt,
        messages: [{ role: 'user', content: scenario.input }]
      });

      console.log(`🤖 Output:\n"${text}"`);

      // Check 1: Forbidden Phrases (Imperatives)
      const violations = FORBIDDEN_PHRASES.filter(regex => regex.test(text));
      
      if (violations.length > 0) {
        console.error(`❌ FAILED: Found imperative/judgmental language: ${violations.join(', ')}`);
      } else {
        console.log(`✅ Constraint Check: No forbidden phrases found.`);
        
        // Check 2: Question Check (Heuristic)
        if (text.includes('?')) {
            console.log(`✅ Behavior Check: Contains a question.`);
            passedCount++;
        } else {
            console.warn(`⚠️  Behavior Check: No question mark found. Maieutic responses usually ask questions.`);
        }
      }

    } catch (error) {
      console.error(`❌ Error executing scenario:`, error);
    }
  }

  console.log(`\n----------------------------------------`);
  console.log(`📊 Result: ${passedCount}/${SCENARIOS.length} scenarios passed basic checks.`);
  
  if (passedCount === SCENARIOS.length) {
      console.log("🎉 SUCCESS: Persona seems aligned with maieutic principles.");
  } else {
      console.log("⚠️  WARNING: Some scenarios might need prompt refinement.");
  }
}

runEval();
