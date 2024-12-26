import { test } from '@playwright/test';
import { BusaiPage } from '../Pages/BS_Cookies';

test('Cookie Busai', async ({ page }) => {
  const busaiPage = new BusaiPage(page);

  await busaiPage.navigateToBusai();
  await busaiPage.logInWithTelegram();
  await busaiPage.saveCookies();
});
