import { describe, it, expect } from 'vitest';
import { LLMGuardrails } from './llm-guardrails';

describe('LLM Ethical Guardrails', () => {
  it('should reject definitive closure terms', () => {
    const badOutput = "C'est impossible avec ce budget.";
    const result = LLMGuardrails.validateNonClosure(badOutput);
    expect(result.isValid).toBe(false);
    expect(result.violations).toContain('impossible');
  });

  it('should accept conditional terms', () => {
    const goodOutput = "Ce sera difficile, mais on peut explorer des pistes.";
    const result = LLMGuardrails.validateNonClosure(goodOutput);
    expect(result.isValid).toBe(true);
  });
});
