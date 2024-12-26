import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import MelodyPage from '../../Pages/MusicCreator/CreateMelody.js';

let loginUserPage; 
let melodyPage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  melodyPage = new MelodyPage(page);
});

test.afterAll(async () => {
  await loginUserPage.page.context().browser().close(); 
});

test('Create Melody', async () => {
  await loginUserPage.loginUser(); 
  console.log('============== Create Melody ==============');
  await melodyPage.createMelody();
  console.log('============== Melody Tutorial ==============');
  await melodyPage.Tutorial();
  console.log('============== Melody Delete History ==============');
  await melodyPage.DeleteHistory();
});
