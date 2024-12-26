// /tests/Tongram/Tongram.spec.js
import { test } from '@playwright/test';
import { TongramPage } from '../Pages/TG_Cookies';

test('Cookie Tongram', async ({ page }) => {
  const tongramPage = new TongramPage(page);

  await tongramPage.navigateToTongram();
  await tongramPage.logInWithTelegram();
  await tongramPage.saveCookies();
});
