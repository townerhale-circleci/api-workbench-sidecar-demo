const { test, expect } = require('@playwright/test');

test.describe('SMOKE - App Boot', () => {
  test('should boot past the splash loader to the sign-in screen', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('splash-loader')).toBeVisible();
    await expect(page.getByTestId('sign-in-screen')).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId('sign-in')).toBeVisible();
  });
});
