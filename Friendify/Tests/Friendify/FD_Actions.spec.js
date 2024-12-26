// /tests/Friendify/FD_Actions.spec.js
import { test } from '@playwright/test';
import { ActionsPage } from '../../Pages/Friendify/FD_Actions';
import { LoginPage } from '../../Pages/Friendify/FD_Login';

test.describe('Friendify Actions', () => {

  test('Login with Account and Perform Actions', async ({ page }) => {
    const actionsPage = new ActionsPage(page);

    // Step 1: Login with Account
    await actionsPage.loginWithAccount();

    // Step 2: Perform Actions
    await actionsPage.performFirstChat();
    await actionsPage.performSecondChat();
    await actionsPage.performOtherActions();
  });
});
