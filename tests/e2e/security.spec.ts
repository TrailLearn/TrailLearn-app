import { test, expect } from '../support/fixtures';

test.describe('🛡️ Safe Space & Security', () => {
  
  test('Unauthenticated user is redirected from Dashboard to Signin', async ({ page }) => {
    // 1. Try to access protected route directly
    await page.goto('/dashboard');
    
    // 2. Verify redirection occurs (URL should contain signin or not be dashboard)
    // Note: NextAuth redirects to custom signin page /auth/signin
    await expect(page).toHaveURL(/\/auth\/signin/);
    
    // 3. Verify user cannot see dashboard content
    await expect(page.getByText('Tableau de Bord Cockpit')).not.toBeVisible();
  });

  test('Unauthenticated user is redirected from Cockpit/DVP to Signin', async ({ page }) => {
    await page.goto('/dashboard/dvp');
    await expect(page).toHaveURL(/\/auth\/signin/);
  });

});
