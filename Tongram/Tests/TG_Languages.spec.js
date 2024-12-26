import { chromium, test } from '@playwright/test';
import TGLanguagePage from '../Pages/TG_Languages.js';

let tgLanguagePage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  tgLanguagePage = new TGLanguagePage(page);
});

test.afterAll(async () => {
  await tgLanguagePage.page.context().browser().close();
});

test('Change Language to English', async () => {
  await tgLanguagePage.Login(); 
  console.log("============== Testcase Changing language to English ==============");
  await tgLanguagePage.changeLanguageEN();
});

test('Change Language to Vietnamese', async () => {
  await tgLanguagePage.Login(); 
  console.log("============== Changing language to Vietnamese ==============");
  await tgLanguagePage.changeLanguageVI();
});

test('Change Language to Korean', async () => {
  await tgLanguagePage.Login(); 
  console.log("============== Changing language to Korean ==============");
  await tgLanguagePage.changeLanguageKR();
});
