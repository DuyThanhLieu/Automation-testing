import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import CreateMusicPage from '../../Pages/MusicCreator/CreateMusic.js';

let loginUserPage; 
let createMusicPage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  createMusicPage = new CreateMusicPage(page);
});

test.afterAll(async () => {
  await loginUserPage.page.context().browser().close(); 
});

test('Create Music', async () => {
  await loginUserPage.loginUser(); 
  console.log('============== Create Music ==============');
  await createMusicPage.createMusic();
  console.log('============== Music Tutorial ==============');
  await createMusicPage.Tutorial();
  console.log('============== Music Delete History ==============');
  await createMusicPage.DeleteHistory();
});
