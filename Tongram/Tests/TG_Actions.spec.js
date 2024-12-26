const { chromium, test, expect } = require('@playwright/test');
const TGHomePage = require('../Pages/TG_Actions.js');
const config = require('../Utils/TG_config.js');

let tgHomePage;

test.beforeAll(async () => {
  const browser = await chromium.launch(); 
  const page = await browser.newPage(); 
  tgHomePage = new TGHomePage(page); 
});

test.afterAll(async () => {
  const browser = tgHomePage.page.context().browser(); 
  await browser.close(); 
});


test('Interact with Categories', async () => {
  console.log('============== Testcase Interact with Categories ==============');
  await tgHomePage.Login(); 
  await tgHomePage.Categories(); 
});

test('Interact with DEX', async () => {
  console.log('============== Testcases Interact with DEX ==============');
  await tgHomePage.Login(); 
  await tgHomePage.changeDEX(); 
});

test('News Page', async () => {
  console.log('============== Testcase News Page ==============');
  await tgHomePage.Login(); 
  await tgHomePage.NewPage(); 
});

test('Open Game', async () => {
  console.log('============== Testcase Open Game ==============');
});

test('Review Game', async () => {
  console.log('============== Testcase Review Game ==============');
});

test('Share Game', async () => {
  console.log('============== Testcase Share Game ==============');
});

test('Join Telegram', async () => {
  console.log('============== Testcase Join Telegram ==============');
});

test('Submit App', async () => {
  console.log('============== Testcase Submit App ==============');
});

test('Contact Us', async () => {
  console.log('============== Testcase Contact Us ==============');
});

test('Logout', async () => {
  console.log('============== Testcase Logout ==============');
});
