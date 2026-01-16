import { test, expect } from '../support/fixtures';

test.describe('👤 User Journey: Authentication', () => {
  
  test('User can navigate to Sign In page from Landing', async ({ page }) => {
    await page.goto('/');
    
    // Check main CTA
    await page.click('text=Commencer mon DVP');
    await expect(page).toHaveURL(/api\/auth\/signin/);
  });

  // Skipped because UI is not implemented yet (Story 1.2)
  test.skip('Full Login Flow (Mocked)', async ({ page }) => {
    await page.goto('/api/auth/signin');
    // ... implémentation future avec mock auth
  });

});

test.describe('🚀 User Journey: DVP Tunnel', () => {
  
  // Skipped because Feature is not implemented yet (Epic 2)
  test.skip('Start DVP -> Complete Step 1', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('text=Démarrer mon DVP');
    await expect(page).toHaveURL(/dashboard\/dvp\/step\/1/);
    // ...
  });

});
