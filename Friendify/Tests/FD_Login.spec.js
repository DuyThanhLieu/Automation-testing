import { chromium, test } from '@playwright/test';
import { LoginPage } from '../Pages/FD_Login';

let browser;
let page;
let login;

test.beforeEach(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  login = new LoginPage(page);
});

test.afterEach(async () => {
  await page.close();  
  await browser.close();  
});

test('Login with Account', async () => {
  console.log('============== Testcase Login with Account ==============');
  await login.loginWithAccount(); 
});

test('Login with Google', async () => {
  console.log('============== Testcase Login with Google ==============');
  await login.loginWithGoogle(true); 
});