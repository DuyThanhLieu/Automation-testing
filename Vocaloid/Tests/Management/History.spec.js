import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import HistoryPage from '../../Pages/Management/History.js';

let loginUserPage; 
let historyPage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  historyPage = new HistoryPage(page);
});

test.afterAll(async () => {
  await loginUserPage.page.context().browser().close(); 
});

test('Action History', async () => {
  console.log('============== Testcase Action History ==============');
  await loginUserPage.loginUser(); 
  await historyPage.rateHistory();
  await historyPage.reportHistory();
  await historyPage.deleteHistory();
});
