const fs = require('fs');
const path = require('path'); 
const { test, expect } = require('@playwright/test');
import { config } from '../Utils/TG_config.js'; // Ensure correct path

class TGDailyTaskPage {
  constructor(page) {
    this.page = page;
    this.initializeLocators();
  }

  initializeLocators() {
    this.summaryElement = this.page.locator(config.chatPointSelector);
    this.engagementElement = this.page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
    this.reviewElement = this.page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
    this.shareElement = this.page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
    this.launchPlusButton = this.page.locator('button:has-text("Launch +")');
    this.launchButton = this.page.locator('button:has-text("Launch")');
    this.pointSelector = 'span.font-bold.leading-none.text-black';
    this.searchInput = this.page.locator('input[placeholder="Search"]');
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////                  FUNCTION                //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async Login() {
    try {
      const cookiesPath = path.join(config.cookiesDir, config.cookiesFile);
      const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
      await this.page.context().addCookies(cookies);
      await this.page.goto(config.tongramUrl);
      await this.page.waitForLoadState('networkidle');  
      console.log('✅ Page loaded successfully with cookies.');
    } catch (error) {
      console.error('❌ Error during login:', error.message);
      throw error;  
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async LoginCMS() {
    try {
      await this.page.goto(config.CMSUrl);
      await this.page.getByLabel('Email').click();
      await this.page.getByLabel('Email').fill(config.CMSUser);
      await this.page.getByLabel('Password').click();
      await this.page.getByLabel('Password').fill(config.CMSPassword);
      await this.page.getByRole('button', { name: 'Submit' }).click();
      await this.page.waitForSelector('text=Login successful!', { timeout: 5000 });
      console.log('✅ Login CMS successful!');
    } catch (error) {
      console.error('❌ Error during login:', error.message);
      throw error;  
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
//////////////////////////////////////                 TEST CASE                //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async verifyPoint() {
  try {
    const pointText1 = await this.page.locator(config.Point_1).innerText();
    const pointElement1 = this.convertToPoints(pointText1);
    console.log(`📍 Current points (1): ${pointElement1}`);
    await this.page.locator(config.Point_1).click();
    await this.page.getByRole('button', { name: 'Earn More' }).click();

    const pointText2 = await this.page.locator(config.Point_2).innerText();
    const pointElement2 = this.convertToPoints(pointText2);
    console.log(`📍 Current points (2): ${pointElement2}`);

    const pointText3 = await this.page.locator(config.Point_3).innerText();
    const earnedPoints = pointText3.split(': ')[1];
    const pointElement3 = this.convertToPoints(earnedPoints);
    console.log(`📍 Current points (3): ${pointElement3}`);

    if (pointElement1 === pointElement2 && pointElement2 === pointElement3) {
      console.log("✅ All points match!");
    } else {
      console.error("❌ Points do not match!");
      throw new Error("Point verification failed."); 
    }
  } catch (error) {
    console.error('❌ Error during point verification:', error.message);
    throw error; 
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async DailyLogin() {
  try {
    await this.page.locator(config.Point_1).click();
    await this.page.getByRole('button', { name: 'Earn More' }).click();
    const taskContainer = this.page.locator(config.Earn_DailyLogin);

    const claimButton = taskContainer.locator(config.Claim_Xpath);
    const completeIcon = taskContainer.locator(config.Complete_Xpath);

    const pointText = await this.page.locator(config.Point_2).innerText();
    const pointsBeforeClaim = this.convertToPoints(pointText);
    console.log(`📍 Current Points before claim: ${pointsBeforeClaim}`);

    if (await claimButton.count() > 0) {
      console.log("🎯 Claim button found, clicking...");
      await claimButton.click();
      await this.page.waitForSelector(config.Complete_Xpath, { state: 'visible' });

      const pointTextAfterClaim = await this.page.locator(config.Point_2).innerText();
      const pointsAfterClaim = this.convertToPoints(pointTextAfterClaim);
      console.log(`📍 Current Points after claim: ${pointsAfterClaim}`);

      if (pointsAfterClaim === pointsBeforeClaim + 10) {
        console.log("✅ Points increased by 10 after claiming!");
      } else {
        console.error("❌ Points did not increase by 10 as expected.");
      }

      if (await completeIcon.count() > 0) {
        console.log("🎉 Claim completed successfully, completed for today.");
      }
    } else if (await completeIcon.count() > 0) {
      console.log("⏭️ Claim already completed before, skipping...");
    } else {
      console.error("⚠️ No relevant elements found.");
    }
    
    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

  } catch (error) {
    console.error('❌ Error during DailyLogin task:', error.message);
    throw error; 
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async AppExplorer() {
    try {
      console.log('🔍 Searching for the app...');
      await this.page.getByPlaceholder('Search for your favorite apps').first().click();
      await this.page.getByPlaceholder('Search for your favorite apps').first().fill(config.Search_Query_1);

      console.log('🖱️ Selecting the search result and opening the app...');
      await this.page.getByRole('banner').getByRole('link', { name: config.Search_Query_Data_1 }).click();
      await this.page.locator(`//button[text()='Open']`).click();

      const page2Promise = this.page.waitForEvent('popup');
      await this.page.getByRole('button', { name: 'Launch' }).click();
      const page2 = await page2Promise;

      await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
      await this.page.locator(config.Point_1).click();
      await this.page.getByRole('button', { name: 'Earn More' }).click();

      const claimButton = await this.page.locator(config.Claim_Xpath);
      const completedImage = await this.page.locator(config.Complete_Xpath);
  
      const pointTextBeforeClaim = await this.page.locator(config.Point_2).innerText();
      const pointsBeforeClaim = this.convertToPoints(pointTextBeforeClaim);
      console.log(`📊 Current Points before claim: ${pointsBeforeClaim}`);
  
      if (await claimButton.count() > 0) {
        console.log("🎯 Claim button found, clicking...");
        await claimButton.click();
        const pointTextAfterClaim = await this.page.locator(config.Point_2).innerText();
        const pointsAfterClaim = this.convertToPoints(pointTextAfterClaim);
        console.log(`📊 Current Points after claim: ${pointsAfterClaim}`);
        if (pointsAfterClaim === pointsBeforeClaim + 50) {
          console.log("✅ Points increased by 50 after claiming!");
        } else {
          console.log("❌ Points did not increase as expected.");
        }
        if (await completedImage.count() > 0) {
          console.log("🎉 Claim completed successfully, completed for today.");
        }

      } else if (await completedImage.count() > 0) {
        console.log("⏭️ Claim already completed, skipping...");
      } else {
        console.log("⚠️ No relevant elements found.");
      }
  
      console.log('🔙 Returning to the main page...');
      await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
  
    } catch (error) {
      console.error('❌ Error during AppExplorer task:', error.message); 
    }
  }
  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async AppReviewer() {
  try {
    const searchPlaceholder = this.page.getByPlaceholder('Search for your favorite apps').first();
    const feedbackMessageSelector = "//div[@class='relative flex h-[240px] flex-col items-center justify-center gap-y-4']//div[h5[text()='Submitted']]";
    const alreadyReviewedSelector = "//div[@class='go2072408551']//div[@role='status' and @aria-live='polite' and text()='You have already reviewed this app!']";
    const claimButtonLocator = this.page.locator(config.Claim_Xpath);
    const completedImageLocator = this.page.locator(config.Complete_Xpath);
    const pointsLocator = this.page.locator(config.Point_2);

    console.log('🔍 Searching for the app...');
    await searchPlaceholder.click();
    await searchPlaceholder.fill(config.Search_Query_3);
    await this.page.getByRole('banner').getByRole('link', { name: config.Search_Query_Data_3 }).click();
    await this.page.waitForLoadState('networkidle');

    console.log('✍️ Submitting feedback...');
    await this.page.locator(config.Stars_5).first().click();
    await this.page.getByPlaceholder('What is on your mind?').fill(config.Content_Comment_Game);
    await this.page.getByRole('button', { name: 'Submit', exact: true }).click();
    await this.page.waitForTimeout(1000); 

    const feedbackSubmitted = await this.page.locator(feedbackMessageSelector).isVisible({ timeout: 5000 }).catch(() => false);
    const alreadyReviewed = await this.page.locator(alreadyReviewedSelector).isVisible({ timeout: 5000 }).catch(() => false);

    console.log("📝 Feedback Submitted:", feedbackSubmitted);
    console.log("🔄 Already Reviewed:", alreadyReviewed);

    if (feedbackSubmitted && !alreadyReviewed) {
      console.log("✅ Feedback submitted successfully.");
    } else if (alreadyReviewed) {
      console.log("⚠️ The game has already been reviewed.");      
    } else {
      console.error("❌ Feedback submission failed or unexpected state.");
    }

    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

    await this.page.locator(config.Point_1).click();
    await this.page.getByRole('button', { name: 'Earn More' }).click();

    const pointTextBeforeClaim = await pointsLocator.innerText();
    const pointsBeforeClaim = this.convertToPoints(pointTextBeforeClaim);
    console.log(`📊 Current Points before claim: ${pointsBeforeClaim}`);

    if (await claimButtonLocator.count() > 0) {
      console.log("🎯 Claim button found, clicking...");
      await claimButtonLocator.click();

      const pointTextAfterClaim = await pointsLocator.innerText();
      const pointsAfterClaim = this.convertToPoints(pointTextAfterClaim);
      console.log(`📊 Current Points after claim: ${pointsAfterClaim}`);
      
      if (pointsAfterClaim === pointsBeforeClaim + 20) {
        console.log("✅ Points increased by 20 after claiming!");
      } else {
        console.log("❌ Points did not increase as expected.");
      }

      if (await completedImageLocator.count() > 0) {
        console.log("🎉 Claim completed successfully, completed a one a day.");
      }

    } else if (await completedImageLocator.count() > 0) {
      console.log("⏭️ Claim already completed, skipping...");
    } else {
      console.log("⚠️ No relevant elements found.");
    }

    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

  } catch (error) {
    console.error('❌ Error during AppReviewer task:', error);
  }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async DeleteReviewAdmin() {
  try {
    console.log('📄 Navigating to Review Rating page...');
    await this.page.getByRole('link', { name: 'Review Rating' }).click();
    const reviewExists = await this.page.locator("//td[text()='" + config.Content_Comment_Game + "']").isVisible();

    if (reviewExists) {
      await this.page.locator("//td[@class='ant-table-cell' and text()='" + config.Content_Comment_Game + "']/preceding-sibling::td//input[@type='checkbox']").check();
      console.log('🗑️ Clicking the delete button...');
      await this.page.getByText('Xóa').click();
      await this.page.getByRole('button', { name: 'Ok' }).click();
      const reviewCount = await this.page.locator("//td[text()='" + config.Content_Comment_Game + "']").count();
      if (reviewCount === 0) {
        console.log('🎉 Test case passed: Review deleted successfully.');
      } else {
        console.error('❌ Test case failed: Review still exists after deletion.');
      }
    } else {
      console.log('⚠️ Test case skipped: Review does not exist, skipping deletion.');
    }

  } catch (error) {
    console.error('❌ Error during delete review:', error);
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async AppSharer() {
  try {
    const claimButtonLocator = this.page.locator(config.Claim_Xpath);
    const completedImageLocator = this.page.locator(config.Complete_Xpath);
    const pointsLocator = this.page.locator(config.Point_2);

    const searchPlaceholder = this.page.getByPlaceholder('Search for your favorite apps').first();
    await searchPlaceholder.click();
    await searchPlaceholder.fill(config.Search_Query_3);
    await this.page.getByRole('banner').getByRole('link', { name: config.Search_Query_Data_3 }).click();
    await this.page.waitForLoadState('networkidle');

    await this.page.getByRole('button', { name: 'Share' }).click();
    await this.page.waitForTimeout(1000);

    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

    await this.page.locator(config.Point_1).click();
    await this.page.getByRole('button', { name: 'Earn More' }).click();

    const pointTextBeforeClaim = await pointsLocator.innerText();
    const pointsBeforeClaim = this.convertToPoints(pointTextBeforeClaim);
    console.log(`📊 Current Points before claim: ${pointsBeforeClaim}`);

    if (await claimButtonLocator.count() > 0) {
      console.log('🎁 Claiming points...');
      await claimButtonLocator.click();

      const pointTextAfterClaim = await pointsLocator.innerText();
      const pointsAfterClaim = this.convertToPoints(pointTextAfterClaim);
      console.log(`📊 Current Points after claim: ${pointsAfterClaim}`);

      if (pointsAfterClaim === pointsBeforeClaim + 20) {
        console.log('🎉 Points increased by 20 after claiming!');
      } else {
        console.log('❗ Points did not increase as expected.');
      }

      if (await completedImageLocator.count() > 0) {
        console.log("🎉 Claim completed successfully, completed a one a day.");
      }
    } else if (await completedImageLocator.count() > 0) {
      console.log('⚠️ Claim already completed, skipping...');
    } else {
      console.log('❓ No relevant elements found.');
    }
    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

  } catch (error) {
    console.error('❌ Error during AppSharer task:', error);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

export default TGDailyTaskPage;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////