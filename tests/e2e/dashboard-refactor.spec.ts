import { test, expect } from '../support/fixtures';

test.describe('📊 Dashboard Refactor', () => {
  
  test.beforeEach(async ({ page }) => {
    // We assume the user is authenticated via the fixture or we bypass for this test
    // For now, let's just visit the dashboard and see if elements are there
    // If auth is required, this might fail unless we have a mock session
    await page.goto('/dashboard');
  });

  test('should display personalized header and progress bar', async ({ page }) => {
    const header = page.locator('h1');
    await expect(header).toContainText('Bonjour');
    
    const subtitle = page.locator('text=Votre espace de pilotage académique et professionnel.');
    await expect(subtitle).toBeVisible();

    const progressBar = page.locator('.flex.items-center.gap-3.mt-1');
    await expect(progressBar).toBeVisible();
    await expect(progressBar).toContainText('15%');
  });

  test('should display the 4 feature cards', async ({ page }) => {
    const coachCard = page.locator('text=Coach IA – Miroir Lucide');
    await expect(coachCard).toBeVisible();

    const dvpCard = page.locator('text=DVP – Dossier de Viabilité');
    await expect(dvpCard).toBeVisible();

    const cockpitCard = page.locator('text=Cockpit');
    await expect(cockpitCard).toBeVisible();

    const focusCard = page.locator('text=Plan / Focus');
    await expect(focusCard).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    // Check Opportunities
    await page.click('nav >> text=Opportunités');
    await expect(page).toHaveURL(/\/dashboard\/opportunities/);
    await expect(page.locator('h1')).toContainText('Opportunités');
    await expect(page.locator('text=Bientôt disponible')).toBeVisible();

    // Check Scholarships
    await page.goto('/dashboard');
    await page.click('nav >> text=Bourses');
    await expect(page).toHaveURL(/\/dashboard\/scholarships/);
    await expect(page.locator('h1')).toContainText('Bourses');
  });

  test('should have disabled links for preview features in navbar', async ({ page }) => {
    const dvpLink = page.locator('nav >> text=Mon DVP');
    await expect(dvpLink).toHaveClass(/cursor-not-allowed/);
  });
});
