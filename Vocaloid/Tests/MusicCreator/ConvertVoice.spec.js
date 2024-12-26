import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import ConvertVoicePage from '../../Pages/MusicCreator/ConvertVoice.js';

let loginUserPage; 
let convertVoicePage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  convertVoicePage = new ConvertVoicePage(page);
});

test.afterAll(async () => {
  await loginUserPage.page.context().browser().close(); 
});

test('Convert Voice by Link', async () => {
  await loginUserPage.loginUser(); 
  console.log('============== Convert Voice by Link ==============');
  await convertVoicePage.convertVoicebyLink();
  console.log('============== Convert Voice Tutorial ==============');
  await convertVoicePage.Tutorial();
  console.log('============== Convert Voice Delete History ==============');
  await convertVoicePage.DeleteHistory();
});
test('Convert Voice by File', async () => {
  console.log('============== Convert Voice by File ==============');
});
