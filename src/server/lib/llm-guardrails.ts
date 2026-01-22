/**
 * Ethical Guardrails for LLM responses.
 * Enforces the "Non-Closure" principle.
 */
export const LLMGuardrails = {
  FORBIDDEN_TERMS: [
    'impossible',
    'non viable',
    'tu ne peux pas',
    'c\'est mort',
    'refusé',
    'abandonne'
  ],

  /**
   * Checks if a text contains forbidden definitive rejection terms.
   * @param text The text to check
   * @returns true if valid, false if contains forbidden terms
   */
  validateNonClosure(text: string): { isValid: boolean; violations: string[] } {
    const lowerText = text.toLowerCase();
    const violations = this.FORBIDDEN_TERMS.filter(term => lowerText.includes(term));
    
    return {
      isValid: violations.length === 0,
      violations
    };
  }
};
