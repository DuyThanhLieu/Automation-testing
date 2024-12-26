import { test } from '@playwright/test';
import RegisterPage from '../../Pages/Register/RegisterUser';

test('Register with Account User', async ({ browser }) => {
  const page = await browser.newPage();
  const registerPage = new RegisterPage(page);

  await test.step('Register and Login with new Account', async () => {
    await registerPage.registerAndLogin();
  });
});
