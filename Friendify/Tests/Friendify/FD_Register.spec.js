// /tests/Friendify/FD_Register.spec.js
import { test } from '@playwright/test';
import { RegisterPage } from '../../Pages/Friendify/FD_Register';

test('Register Account', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.registerAndLogin();
});
