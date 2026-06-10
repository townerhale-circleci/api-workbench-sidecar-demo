const { test, expect } = require('@playwright/test');
const { AppSignInScreen } = require('../../page-objects/components/auth/app-sign-in-screen');
const { RequestMenu } = require('../../page-objects/workbench/request-menu');

test.describe('RUNTIME - MQTT Request Empty State', () => {
  test('should show MQTT empty request state and URL validation', async ({ page }) => {
    await page.goto('/');

    const signIn = new AppSignInScreen(page);
    await signIn.clickSignInButton();

    const menu = new RequestMenu(page);
    await menu.openNewRequestMenu();
    await menu.selectRequestType('mqtt');

    await expect(menu.editorTitle).toHaveText('MQTT Request');
    await expect(menu.emptyStateMessage).toContainText('MQTT broker');

    await menu.urlInput.fill('broker.local:1883');
    await expect(menu.urlValidation).toContainText('must include a protocol');

    await menu.urlInput.fill('mqtt://broker.local:1883');
    await expect(menu.urlValidation).toHaveText('Looks good');
  });
});
