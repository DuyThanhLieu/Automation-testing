import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import AvatarMVPage from '../../Pages/VideoMaker/AvatarMV.js';

let loginUserPage; 
let avatarMVPage;


test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  avatarMVPage = new AvatarMVPage(page);
});

test.afterAll(async () => {
  await loginUserPage.page.context().browser().close(); 
});

test('Avatar MV', async () => {
  await loginUserPage.loginUser(); 
  console.log('============== Avatar MV ==============');
  await avatarMVPage.generateAvatarMV();
  // console.log('============== Tutorial ==============');
  // await avatarMVPage.Tutorial();
  console.log('============== Delete History ==============');
  await avatarMVPage.DeleteHistory();
});