import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import RemoveVocalPage from '../../Pages/MixeMaster/RemoveVocal.js';

let loginUserPage; 
let removeVocalPage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  removeVocalPage = new RemoveVocalPage(page);
});

test.afterAll(async () => {
  await loginUserPage.page.context().browser().close(); 
});

test('Remove Vocal by Link', async () => {
  await loginUserPage.loginUser(); 
  console.log('============== Remove Vocal by Link ==============');
  await removeVocalPage.removeVocalbyLink();
  console.log('============== Remove Vocal Tutorial ==============');
  await removeVocalPage.Tutorial();
  console.log('============== Remove Vocal Delete History ==============');
  await removeVocalPage.DeleteHistory();
});
test('Remove Vocal by File', async () => {
  console.log('============== Testcase Remove Vocal by File ==============');
});
