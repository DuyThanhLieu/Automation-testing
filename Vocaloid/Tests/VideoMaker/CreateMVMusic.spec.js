import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import MVScriptsPage from '../../Pages/VideoMaker/CreateMVMusic.js';

let loginUserPage; 
let mvScriptsPage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  mvScriptsPage = new MVScriptsPage(page);
});

test.afterAll(async () => {
  await loginUserPage.page.context().browser().close(); 
});

test('Create MV Music', async () => {
  await loginUserPage.loginUser(); 
  console.log('============== Create MV Music ==============');
  await mvScriptsPage.MVScripts();
  // console.log('============== Tutorial ==============');
  // await mvScriptsPage.Tutorial();
  console.log('============== Delete History ==============');
  await mvScriptsPage.DeleteHistory();
});
