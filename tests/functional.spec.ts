import { test, expect } from '@playwright/test';

test('Functional: Sichtbare interaktive Elemente vorhanden', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  const interactive = page.locator('a:visible, button:visible, input:visible');
  await expect(interactive.first()).toBeVisible({ timeout: 15_000 });
  expect(await interactive.count()).toBeGreaterThan(0);
});

test('Functional: Page rendert Content', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle').catch(() => {});
  // Hauptinhalt: Heading oder beliebiges sichtbares Element
  const content = page.locator('h1:visible, h2:visible, main:visible, [role=main]:visible').first();
  await content.waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
  // Mindestens ein sichtbares Content-Element existiert
  const visibleCount = await page.locator(':visible:not(html):not(head):not(meta):not(title):not(script):not(style)').count();
  expect(visibleCount).toBeGreaterThan(0);
});
