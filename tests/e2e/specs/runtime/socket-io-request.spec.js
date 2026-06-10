const { test, expect } = require('@playwright/test');
const { AppSignInScreen } = require('../../page-objects/components/auth/app-sign-in-screen');
const { RequestMenu } = require('../../page-objects/workbench/request-menu');

test.describe('RUNTIME - SocketIO API Client', () => {
  test('should open a Socket.IO request from the new menu', async ({ page }) => {
    await page.goto('/');

    const signIn = new AppSignInScreen(page);
    await signIn.clickSignInButton();

    const menu = new RequestMenu(page);
    await menu.openNewRequestMenu();
    await menu.selectRequestType('socket-io');

    await expect(menu.editorTitle).toHaveText('Socket.IO Request');
    await expect(menu.emptyStateMessage).toContainText('Socket.IO server');
  });
});
