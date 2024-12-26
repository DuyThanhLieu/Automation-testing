import { chromium, test } from '@playwright/test';

let browser;
let page;

test.beforeEach(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  
  // Đăng nhập vào Jenkins
  await page.goto('https://jenkins.playgroundvina.com/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('khauntc');  
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('KhauNTC123!@#');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForTimeout(500);
});

test.afterEach(async () => {
  await page.close();  
  await browser.close();  
});

test('Enable FRIENDIFY Project', async () => {
  await page.getByRole('link', { name: 'AUTOMATION' }).click();
  await page.getByRole('link', { name: 'FRIENDIFY', exact: true }).click();
  await page.getByRole('button', { name: 'Enable' }).click();
  await page.waitForTimeout(500);
});

test('Enable TONGRAM Project', async () => {
  await page.getByRole('link', { name: 'AUTOMATION' }).click();
  await page.getByRole('link', { name: 'TONGRAM', exact: true }).click();
  await page.getByRole('button', { name: 'Enable' }).click();
  await page.waitForTimeout(500);
});

test('Enable VOCALOID Project', async () => {
  await page.getByRole('link', { name: 'AUTOMATION' }).click();
  await page.getByRole('link', { name: 'VOCALOID', exact: true }).click();
  await page.getByRole('button', { name: 'Enable' }).click();
  await page.waitForTimeout(500);
});

test('Enable BUSAIGPT Project', async () => {
  await page.getByRole('link', { name: 'AUTOMATION' }).click();
  await page.getByRole('link', { name: 'BUSAIGPT' }).click();
  await page.getByRole('button', { name: 'Enable' }).click();
  await page.waitForTimeout(500);
});
