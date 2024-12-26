import { expect } from '@playwright/test';
import fs from 'fs';
import { config } from '../Utils/BS_config';
// const { chromium } = require('playwright');
// // import { chromium } from 'playwright'; // Sử dụng import ES6 thay vì require

export class ActionsPage {
  constructor(browser) {
    this.browser = browser;
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////                  FUNCTION                //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async openWithSavedCookies() {
    try {
      const cookiesFilePath = config.cookiesFilePath;
      if (!fs.existsSync(cookiesFilePath)) {
        throw new Error(`Cookie file does not exist at path: ${cookiesFilePath}`);
      }
      const cookies = JSON.parse(fs.readFileSync(cookiesFilePath, 'utf-8'));
      this.context = await this.browser.newContext();
      await this.context.addCookies(cookies);
      this.page = await this.context.newPage();
      await this.page.goto(config.busaiUrl);
      // await expect(this.page.getByText('AI Chat GPTNew chat')).toBeVisible();
    } catch (error) {
      console.error('Failed to open with saved cookies:', error);
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  convertToPoints(pointText) {
    if (pointText.includes('K')) {
      return parseFloat(pointText.replace('K', '')) * 1000;
    } else if (pointText.includes('M')) {
      return parseFloat(pointText.replace('M', '')) * 1000000;
    } else if (pointText.includes('B')) {
      return parseFloat(pointText.replace('B', '')) * 1000000000;
    } else if (pointText.includes('T')) {
      return parseFloat(pointText.replace('T', '')) * 1000000000000;
    } else {
      return parseFloat(pointText);
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async getPoints() {
    try {
      const pointsText = await this.page.locator(config.Locator_GetPoint).innerText();
      return this.convertToPoints(pointsText);
    } catch (error) {
      console.error('❌ Error retrieving points:', error);
      throw error;
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
  async checkPointsBeforeChat() {
    await this.page.waitForTimeout(2000);
    const points = await this.getPoints();
    console.log('🔍 Points before chat:', points);
    return points;
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async checkPointsAfterChat(expectedDecrease, pointBeforeChat) {
    const pointAfterChat = await this.getPoints();
    const pointUsed = pointBeforeChat - pointAfterChat;
  
    console.log('⚡⚡⚡ Total points used after chat:', pointUsed);
    if (pointUsed === expectedDecrease) {
      console.log(`✅ Points decreased by ${expectedDecrease} as expected.`);
    } else {
      console.error(`❌ Points mismatch. Expected decrease: ${expectedDecrease}, Actual decrease: ${pointUsed}`);
    }
  
    return pointAfterChat;
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async performActionsIfElementExists() {
    const locator = this.page.locator('.w-\\[24px\\]');
    if (await locator.count() > 0) {
      await locator.first().click();
      
      await this.page.getByRole('button', { name: 'Confirm' }).click();
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async uploadFile(filePath) {
    try {
      const fileInput = this.page.locator('input[type="file"]');
      await fileInput.setInputFiles(filePath);
      console.log('📂 File uploaded:', filePath);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////                 TEST CASE                //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async performFirstChat(message1) {
  console.log('🚀 ============== Testcase 1 Chat with Speed ==============');
  const pointBeforeChat = await this.checkPointsBeforeChat();

  try {
    await this.page.locator('form div').first().click();
    await this.page.waitForTimeout(10000);

    try {
      await this.page.getByPlaceholder('Type something...').fill(message1);
      console.log('📝 Typed message:', config.message1);
    } catch (error) {
      console.error('⚠️ Unable to type message:', config.message1, 'Error:', error);
    }

    await this.page.locator('form').getByRole('button').click();
    await this.page.waitForTimeout(5000);

    try {
      await expect(this.page.getByText(config.expect_message1)).toBeVisible();
      console.log('✅ Result AI generated is visible:', config.expect_message1);
    } catch (error) {
      console.error('❌ Failed to verify Result AI generated visibility:', config.expect_message1, 'Error:', error);
    }

    try {
      await this.page.locator('#scrollableDiv').getByRole('img').click();
      await this.page.getByRole('button', { name: 'Confirm' }).click();
      await expect(this.page.getByText('Delete sucessfully')).toBeVisible();
      console.log('✅ Message deleted successfully');
    } catch (error) {
      console.error('❌ Failed to delete the message:', error);
      return; 
    }

  } catch (error) {
    console.error('❌ Error during chat flow:', error);
    return;
  }

  await this.page.waitForTimeout(5000);
  await this.checkPointsAfterChat(250, pointBeforeChat);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async performSecondChat(message2) {
  console.log('🚀 ============== Testcase 2 Chat with Intelligent ==============');
  const pointBeforeChat = await this.checkPointsBeforeChat();

  await this.page.locator('form div').first().click();
  await this.page.waitForTimeout(10000);
  await this.page.getByRole('link', { name: 'New chat' }).click();
  await this.page.locator('//span[text()="Intelligent"]').click();
    
  try {
  await this.page.getByPlaceholder('Type something...').fill(message2);
  console.log('📝 Typed message:', config.message2);
  } catch (error) {
  console.error('⚠️ Unable to type message:', config.message2, 'Error:', error);
  }
    
  await this.page.locator('form').getByRole('button').click();
  await this.page.waitForTimeout(5000);

  try {
    await expect(this.page.getByText(config.expect_message2)).toBeVisible();
    console.log('✅ Result AI generated is visible:', config.expect_message2);
  } catch (error) {
    console.error('❌ Failed to verify Result AI generated visibility:', error);
    return;
  }

  try {
    await this.page.locator('#scrollableDiv').getByRole('img').click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    await expect(this.page.getByText('Delete sucessfully')).toBeVisible();
    console.log('✅ Message deleted successfully');
  } catch (error) {
    console.error('❌ Failed to delete the message:', error);
    return; 
  }
  await this.page.waitForTimeout(5000);
  await this.checkPointsAfterChat(250, pointBeforeChat);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async performGenerateDocs() {
  console.log('🚀 ============== Testcase 3 Generate Docs ==============');
  const pointBeforeChat = await this.checkPointsBeforeChat();

  try {
    await this.page.getByRole('link', { name: 'Assist' }).click();
    
    const uploadLocator = this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .pdf)' }).locator('div').first();
    await uploadLocator.waitFor({ state: 'visible', timeout: 10000 });
    await uploadLocator.click();

    const filePath = config.path_generateDocs;
    await this.uploadFile(filePath); 

    console.log('🚀 Starting Summary...');
    await this.page.getByRole('button', { name: 'Start Summary' }).click();
  } catch (error) {
    console.error('❌ Failed to generate docs:', error);
  }

  try {
    await expect(this.page.getByText(config.expect_text_Docs)).toBeVisible({ timeout: 30000 });
    console.log('✅ Result AI generated is visible:', config.expect_text_Docs);
  } catch (error) {
    console.error('❌ Failed to verify Result AI generated visibility:', error);
  }

  await this.page.waitForTimeout(15000);
  await this.checkPointsAfterChat(1000, pointBeforeChat);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async deleteGenerateDocs() {
  console.log('🚀 ============== Testcase 4 deleteGenerateDocs ==============');

  await this.page.getByRole('link', { name: 'Ask' }).click();
  await this.page.getByRole('link', { name: 'Assist' }).click();
  await this.page.locator('#scrollableDiv').getByRole('img').nth(1).click();
  await this.page.getByRole('button', { name: 'Confirm' }).click();
  console.log('✅ Delete Docs');
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async performGenerateAudio() {
  console.log('🚀 ============== Testcase 5 Generate Audio ==============');
  const pointBeforeChat = await this.checkPointsBeforeChat();

  try {
    await this.page.getByRole('link', { name: 'Assist' }).click();
    await this.page.getByText('Audio').click();

    const uploadSection = this.page.locator('div').filter({ hasText: /^Upload File \(Max 5MB \.mp3\) Small or poor-quality sound may limit summarization\.$/ }).nth(1);
    await uploadSection.waitFor({ state: 'visible', timeout: 10000 });
    await uploadSection.click();

    const filePath = config.path_generateAudio;
    await this.uploadFile(filePath); 

    await this.page.getByRole('button', { name: 'Start Summary' }).click();
  } catch (error) {
    console.error('❌ Failed to perform audio summary generation steps:', error);
  }

  try {
    await expect(this.page.getByText(config.expect_text_Audio)).toBeVisible({ timeout: 30000 });
    console.log('✅ Result AI generated is visible:', config.expect_text_Audio);
  } catch (error) {
    console.error('❌ Failed to verify Result AI generated visibility:', error);
  }

  await this.page.waitForTimeout(15000);
  await this.checkPointsAfterChat(1000, pointBeforeChat);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async deleteGenerateAudio() {
  console.log('🚀 ============== Testcase 6 delete Audio ==============');

  try {
      await this.page.getByRole('link', { name: 'Ask' }).click();
      await this.page.getByRole('link', { name: 'Assist' }).click();
      await this.page.getByText('Audio').click();
      await this.page.locator('#scrollableDiv').getByRole('img').click();
      await this.page.getByRole('button', { name: 'Confirm' }).click();
      console.log('✅ Delete Audio');

  } catch (error) {
      console.error('❌ Failed to delete audio:', error);
  }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async performGenerateImage_Summary() {
  console.log('🚀 ============== Testcase 7 Generate Image Summary ==============');
  const pointBeforeChat = await this.checkPointsBeforeChat();

  try {
    await this.page.getByRole('link', { name: 'Assist' }).click();
    await this.page.getByText('Image', { exact: true }).click();
    await expect(this.page.getByText('New features release')).toBeVisible();

    await this.page.locator('label:has-text("Upload File (Max 5MB .png | .")').waitFor({ state: 'visible', timeout: 10000 });
    
    const filePath = config.path_generateImage_Summary;
    await this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .png | .' }).locator('div').first().click();
    await this.uploadFile(filePath); 

    await this.page.getByRole('button', { name: 'icon action Summary' }).click();
    await expect(this.page.getByText('points to Summary')).toBeVisible();
    await this.page.getByRole('button', { name: "Let's start" }).click();
    console.log('🚀 Summary generation started');

    try {
      await expect(this.page.locator('div').filter({ hasText: /^Image_4KB\.png$/ }).nth(1)).toBeVisible();
      await expect(this.page.getByRole('img', { name: 'avt' })).toBeVisible({ timeout: 30000 });
      console.log('✅ Result AI generated is visible');
    } catch (error) {
      console.error('❌ Failed to verify Result AI generated visibility:', error);
    }


  } catch (error) {
    console.error('❌ An error occurred during the image summary generation:', error);
  }

  await this.page.waitForTimeout(15000);
  await this.checkPointsAfterChat(1000, pointBeforeChat);
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async deleteGenerateImage_Summary() {
  console.log('🚀 ============== Testcase 8 delete Image Summary ==============');

  try {
      await this.page.getByRole('link', { name: 'Ask' }).click();
      await this.page.getByRole('link', { name: 'Assist' }).click();
      await this.page.getByText('Image', { exact: true }).click();
      await this.page.locator('#scrollableDiv').getByRole('img').click();
      await this.page.getByRole('button', { name: 'Confirm' }).click();
      console.log('✅ Delete Image');

  } catch (error) {
      console.error('❌ Failed to delete image summary:', error);
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async performGenerateImage_RemoveObject() {
  console.log('🚀 ============== Testcase 9 Remove Object ==============');
  const pointBeforeChat = await this.checkPointsBeforeChat();

  try {
    await this.page.locator('label:has-text("Upload File (Max 5MB .png | .") div').first().click();
    const filePath = config.path_generateImage_RemoveObject;
    await this.uploadFile(filePath); 

    await this.page.getByRole('button', { name: 'icon action Remove object' }).click();
    await expect(this.page.getByRole('heading', { name: 'Quick tip' })).toBeVisible();
    await this.page.getByRole('button', { name: "Let's start" }).click();
    console.log('🚀 Remove object process started');

    await this.page.getByRole('slider').fill('100');
    await this.page.locator('canvas').nth(1).click({ position: { x: 186, y: 83 } });
    await this.page.locator('canvas').nth(1).click({ position: { x: 432, y: 90 } });
    await this.page.getByRole('main').getByRole('button').first().click();
    await this.page.getByRole('main').getByRole('button').nth(1).click();
    await expect(this.page.locator('canvas').nth(1)).toBeVisible({ position: { x: 432, y: 90 } });
    await this.page.getByRole('main').getByRole('button').nth(2).click();
    await this.page.locator('canvas').nth(1).click({ position: { x: 185, y: 89 } });
    await this.page.getByRole('button', { name: 'Clean •' }).click();
    console.log('🧹 Clean action executed successfully');

    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole('button', { name: 'Download image' }).click();
    const download = await downloadPromise;
    console.log('📥 Download successful:', download.suggestedFilename());

  } catch (error) {
    console.error('❌ Failed to generate image with "Remove Object":', error);
    return; 
  }

  try {
    await expect(this.page.getByRole('img', { name: 'Image result' })).toBeVisible({ timeout: 30000 });
    console.log('✅ Result AI generated is visible');
  } catch (error) {
    console.error('❌ Failed to verify Result AI generated visibility:', error);
  }

  await this.page.waitForTimeout(15000);
  await this.checkPointsAfterChat(1000, pointBeforeChat);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async deleteGenerateImage_RemoveObject() {
  console.log('🚀 ============== Testcase 10 Remove Object ==============');

  try {
      await this.page.getByRole('link', { name: 'Ask' }).click();
      await this.page.getByRole('link', { name: 'Assist' }).click();
      await this.page.getByText('Image', { exact: true }).click();
      await this.page.locator('#scrollableDiv').getByRole('img').click();
      await this.page.getByRole('button', { name: 'Confirm' }).click();
      console.log('✅ Delete Image');

  } catch (error) {
      console.error('❌ Failed to delete image summary:', error);
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async performGenerateImage_RemoveText() {
  console.log('🚀 ============== Testcase 11 Remove Text ==============');
  const pointBeforeChat = await this.checkPointsBeforeChat();

  try {
    const filePath = config.path_generateImage_RemoveText;
    await this.page.locator('label:has-text("Upload File (Max 5MB .png | .") div').first().click();
    await this.uploadFile(filePath); 

    await this.page.getByRole('button', { name: 'icon action Remove text' }).click();
    await this.page.getByRole('button', { name: "Let's start" }).click();
    console.log('🚀 Remove Text operation started');

    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole('button', { name: 'Download image' }).click();
    const download = await downloadPromise;
    console.log('📥 Download successful:', download.suggestedFilename());

  } catch (error) {
    console.error('❌ Failed to generate image with "Remove Text":', error);
    return; 
  }

  try {
    await expect(this.page.getByRole('img', { name: 'Image result' })).toBeVisible({ timeout: 30000 });
    console.log('✅ Result AI generated is visible');
  } catch (error) {
    console.error('❌ Failed to verify Result AI generated visibility:', error);
  }

  await this.page.waitForTimeout(15000);
  await this.checkPointsAfterChat(1000, pointBeforeChat);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async deleteGenerateImage_RemoveText() {
  console.log('🚀 ============== Testcase 12 Remove Text ==============');
  try {
    await this.page.getByRole('link', { name: 'Ask' }).click();
    await this.page.getByRole('link', { name: 'Assist' }).click();
    await this.page.getByText('Image', { exact: true }).click();
    await this.page.locator('#scrollableDiv').getByRole('img').click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    console.log('✅ Delete Image');

  } catch (error) {
    console.error('❌ Failed to delete image summary:', error);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}