import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Cookie Busai', async ({ page }) => {
  await page.goto('https://music.busai.me/');
  
  try {
    await page.getByText('✖').click();
  } catch (error) {
    console.log("No popup found to close.");
  }

  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Login' }).click();
  
  const page1 = await page1Promise;
  await page1.goto('https://sso.busai.me/auth');

  const page2Promise = page1.waitForEvent('popup');
  await page1.getByRole('button', { name: 'Login with telegram' }).click();
  
  const page2 = await page2Promise;
  await page2.goto('https://oauth.telegram.org/auth?bot_id=7098503440&origin=https%3A%2F%2Fsso.busai.me&request_access=true&return_to=https%3A%2F%2Fsso.busai.me%2Fauth');
  await page2.locator('#login-phone').fill('339824931');
  await page2.getByRole('button', { name: 'Next' }).click();

  await page2.waitForLoadState('networkidle');

  const dir = './Cookies';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const cookies1 = await page1.context().cookies(); 
  const cookies2 = await page2.context().cookies(); 
  const allCookies = [...cookies1, ...cookies2];

  const filePath = path.join(dir, 'cookies_busai_music.json'); 
  fs.writeFileSync(filePath, JSON.stringify(allCookies, null, 2));
  
  await page.goto('https://music.busai.me/');
  await page.waitForLoadState('networkidle');
  
  try {
    await page.getByText('✖').click();
  } catch (error) {
    console.log("No popup found to close.");
  }

  await expect(page.getByRole('img', { name: '.' })).toBeVisible();

  await page.getByRole('img', { name: '.' }).click();
});
