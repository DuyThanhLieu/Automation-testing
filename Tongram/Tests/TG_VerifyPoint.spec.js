import { chromium, test } from '@playwright/test';
import VerifyPointFunction from '../Pages/TG_VerifyPoint.js';

let verifyPointFunction;

test.beforeAll(async () => {
  const browser = await chromium.launch(); 
  const page = await browser.newPage();
  verifyPointFunction = new VerifyPointFunction(page); 
});

test.afterAll(async () => {
  await verifyPointFunction.page.close(); 
  const browser = verifyPointFunction.page.context().browser();
  await browser.close(); 
});

test('Verify Point', async () => {
  console.log('============== Testcase Verify Point ==============');
  await verifyPointFunction.Login();
  await verifyPointFunction.verifyPoint(); 
});
