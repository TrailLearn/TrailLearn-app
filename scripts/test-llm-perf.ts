import fs from 'node:fs';
import path from 'node:path';
import { streamText } from 'ai';
import { getLLMModel } from '../src/lib/llm-config';

// Load .env manually
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

async function runPerfTest() {
  console.log("⏱️  Starting LLM Performance Test (TTFT & Streaming)...");
  
  const model = getLLMModel();
  const startTime = Date.now();
  let firstTokenTime: number | null = null;
  let fullText = "";

  try {
    const result = await streamText({
      model,
      prompt: "Write a short poem about speed (approx 50 words).",
    });

    console.log("🚀 Request sent. Waiting for stream...");

    for await (const chunk of result.textStream) {
      if (firstTokenTime === null) {
        firstTokenTime = Date.now();
        const ttft = firstTokenTime - startTime;
        console.log(`\n⚡ First Token Received! TTFT: ${ttft}ms`);
        
        if (ttft > 3000) {
            console.warn("⚠️  TTFT > 3000ms. Requirement NOT MET.");
        } else {
            console.log("✅ TTFT < 3000ms. Requirement MET.");
        }
      }
      process.stdout.write(chunk);
      fullText += chunk;
    }

    const endTime = Date.now();
    const totalTime = endTime - startTime;
    console.log(`\n\n🏁 Stream Complete.`);
    console.log(`Total Duration: ${totalTime}ms`);
    console.log(`Total Length: ${fullText.length} chars`);
    
  } catch (error) {
    console.error("\n❌ Performance Test Failed:", error);
  }
}

runPerfTest();
