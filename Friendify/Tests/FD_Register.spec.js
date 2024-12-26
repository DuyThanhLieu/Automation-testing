import { chromium, test } from '@playwright/test';
import { RegisterPage } from '../Pages/FD_Register';

let registerPage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  registerPage = new RegisterPage(page);
});

test.afterAll(async () => {
  await registerPage.page.close();
  const browser = registerPage.page.context().browser();
  await browser.close();
});

test('Register and Login', async () => {
  console.log('============== Testcase Register and Login ==============');
  await registerPage.registerAndLogin();
});
