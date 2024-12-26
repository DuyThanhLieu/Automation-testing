import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import AIMasteringPage from '../../Pages/MixeMaster/AIMastering.js';

let loginUserPage; 
let AImasteringPage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  AImasteringPage = new AIMasteringPage(page);
});

test.afterAll(async () => {
  await loginUserPage.page.context().browser().close(); 
});

test('AI Mastering', async () => {
  await loginUserPage.loginUser(); 
  console.log('============== AI Mastering ==============');
  await AImasteringPage.AIMastering();
  console.log('============== Mastering Tutorial ==============');
  await AImasteringPage.Tutorial();
  console.log('============== Mastering Delete History ==============');
  await AImasteringPage.DeleteHistory();
});
