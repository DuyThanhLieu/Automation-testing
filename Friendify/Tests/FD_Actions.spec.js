import { chromium, test } from '@playwright/test';
import { ActionsPage } from '../Pages/FD_Actions';

let browser;
let actionsPage;

test.beforeAll(async () => {
  browser = await chromium.launch();
});

test.afterAll(async () => {
  await browser.close();
});

test.beforeEach(async () => {
  const page = await browser.newPage();
  actionsPage = new ActionsPage(page);
});

test.afterEach(async () => {
  try {
    await actionsPage.page.close();
  } catch (error) {
    console.error('Error closing the page:', error);
  }
});

test('Perform First and Second Chats', async () => {
  await actionsPage.loginWithAccount();
  console.log('============== User Chat with Speed ==============');
  await actionsPage.performFirstChat();
  console.log('============== User Chat with Intelligent ==============');
  await actionsPage.performSecondChat();
  await actionsPage.performOtherActions();
});

test('User Create Image Normal', async () => {
  console.log('============== Testcase User Create Image Normal ==============');
  await actionsPage.loginWithAccount();
  await actionsPage.generateImage_1();
});

test('User Create Image Pro', async () => {
  console.log('============== Testcase User Create Image Pro ==============');
  await actionsPage.loginWithAccount();
  await actionsPage.generateImage_2();
});

test('Generate Docs', async () => {
  console.log('============== Testcase Generate Docs ==============');
  await actionsPage.loginWithAccount();
  await actionsPage.generateDoc();
  console.log('============== Testcase Delete Docs ==============');
  await actionsPage.deleteGenerateDocs();
});

test('Generate Audio', async () => {
  console.log('============== Testcase Generate Audio ==============');
  await actionsPage.loginWithAccount();
  await actionsPage.generateAudio();
  console.log('============== Testcase Delete Audio ==============');
  await actionsPage.deleteGenerateAudio();
});

test('Generate Image Summary', async () => {
  console.log('============== Testcase Generate Image Summary ==============');
  await actionsPage.loginWithAccount();
  await actionsPage.generateImage_Summary();
  console.log('============== Testcase Delete Image ==============');
  await actionsPage.deleteGenerateImage_Summary();
});

test('Generate Image Object', async () => {
  console.log('============== Testcase Generate Image Object ==============');
  await actionsPage.loginWithAccount();
  await actionsPage.generateImage_Object();
  console.log('============== Testcase Delete Image ==============');
  await actionsPage.deleteGenerateImage_Object();
});

test('Generate Image Text', async () => {
  console.log('============== Testcase Generate Image Text ==============');
  await actionsPage.loginWithAccount();
  await actionsPage.generateImage_Text();
  console.log('============== Testcase Delete Image ==============');
  await actionsPage.deleteGenerateImage_Text();
});
