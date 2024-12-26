import { test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser';

test('Login with Account User', async ({ browser }) => {
  const page = await browser.newPage();
  const loginUserPage = new LoginUserPage(page);

  await test.step('Login and Logout with Account', async () => {
    await loginUserPage.loginUser(); 
    await loginUserPage.logoutUser();
  });
});
