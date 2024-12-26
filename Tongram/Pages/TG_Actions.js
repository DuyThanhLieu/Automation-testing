const fs = require('fs');
const path = require('path'); 
import { expect } from '@playwright/test';
import { config } from '../Utils/TG_config.js'; // Ensure correct path

class TGHomePage {
  constructor(page) {
    this.page = page;
    this.summaryElement = page.locator(config.chatPointSelector);
    this.engagementElement = page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
    this.reviewElement = page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
    this.shareElement = page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
    this.launchPlusButton = page.locator('button:has-text("Launch +")');
    this.launchButton = page.locator('button:has-text("Launch")');
    this.pointSelector = 'span.font-bold.leading-none.text-black';
    this.searchInput = page.locator('input[placeholder="Search"]');
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

async Categories() {
  try {
    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
    await this.page.getByRole('main').getByRole('link', { name: 'Games Games' }).click();

    await expect(this.page.getByText('GamesLatestHigh ratingSort')).toBeVisible();
    await this.page.getByRole('button', { name: 'High rating' }).click();
    await expect(this.page.getByRole('button', { name: 'Latest' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Latest' }).click();

    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
    await expect(this.page.getByRole('button', { name: 'Categories' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Categories' }).click();

    await this.page.getByRole('banner').getByRole('link', { name: 'Productivity Productivity' }).click();

    await expect(this.page.getByText('ProductivityLatestHigh')).toBeVisible();
    await this.page.getByRole('button', { name: 'High rating' }).click();
    await expect(this.page.getByRole('button', { name: 'Latest' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Latest' }).click();

    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
    // await expect(this.page.getByRole('button', { name: 'Categories' })).toBeVisible();
    // await this.page.getByRole('button', { name: 'Categories' }).click();
    
    // await  this.page.getByRole('link', { name: 'Social Social' }).click();

    // await expect(this.page.getByText('SocialLatestHigh ratingSort')).toBeVisible();
    // await this.page.getByRole('button', { name: 'High rating' }).click();
    // await expect(this.page.getByRole('button', { name: 'Latest' })).toBeVisible();
    // await this.page.getByRole('button', { name: 'Latest' }).click();

    // await this.page.waitForTimeout(2000);
    // await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
    // await expect(this.page.getByRole('button', { name: 'Categories' })).toBeVisible();
    // await this.page.getByRole('button', { name: 'Categories' }).click();

    // await this.page.getByRole('link', { name: 'Entertainment Entertainment' }).click();

    // await expect(this.page.getByText('EntertainmentLatestHigh')).toBeVisible();
    // await this.page.getByRole('button', { name: 'High rating' }).click();
    // await expect(this.page.getByRole('button', { name: 'Latest' })).toBeVisible();
    // await this.page.getByRole('button', { name: 'Latest' }).click();

    // await this.page.waitForTimeout(2000);
    // await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

    // await this.page.getByRole('banner').getByRole('link', { name: 'Management Management' }).click();

    // await expect(this.page.getByText('ManagementLatestHigh')).toBeVisible();
    // await this.page.getByRole('button', { name: 'High rating' }).click();
    // await this.page.getByRole('button', { name: 'Latest' }).click();
    console.log('✅ Categories navigation completed successfully.');
  } catch (error) {
    console.error('❌ An error occurred during the Categories step:', error);
    throw error;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async changeDEX() {
  try {
    console.log('🔄 Attempting to change DEX...');
    const dexButton = this.page.getByRole('button', { name: 'DEX' });
    await dexButton.click();
    await expect(this.page.locator('div').filter({ hasText: /^TON\/GM$/ }).first()).toBeVisible({ timeout: 5000 });
    await expect(this.page.locator('div').filter({ hasText: /^Swap$/ }).nth(2)).toBeVisible({ timeout: 5000 });
    await this.page.locator('a').first().click();
    await expect(this.page.getByRole('link', { name: 'Tongram Logo' })).toBeVisible({ timeout: 5000 });
    console.log('✅ DEX change action completed successfully.');

  } catch (error) {
    console.error('❌ Error occurred during changeDEX operation:', error.message);
    throw error;
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async NewPage() {
  try {
    await this.page.getByRole('button', { name: 'News' }).click();

    await expect(this.page.getByText('HomeNews')).toBeVisible();
    await expect(this.page.locator(`//h1[text()='Featured']`)).toBeVisible();
    await expect(this.page.locator(`//div[span[text()='All']]`)).toBeVisible();
    await this.page.locator(`//div[span[text()='All']]`).click();
    await expect(this.page.locator(`//span[text()='Developers']`)).toBeVisible();
    await this.page.locator(`//span[text()='Developers']`).click();
    await expect(this.page.locator(`//div[span[text()='News']]`)).toBeVisible();
    await this.page.locator(`//div[span[text()='News']]`).click();  

    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

  } catch (error) {
    console.error('❌ An error occurred during the New Page step:', error);
    throw error;
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////    OLD CODE    ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async CalculatePoints() {
    try {
      const summaryElement = this.page.locator('span.font-bold.leading-none.text-black');
      await summaryElement.waitFor({ state: 'visible' });
    
      const summaryPoint = await summaryElement.evaluate(el => {
        const text = el.textContent.trim();
        return parseInt(text, 10);
      });
    
      await this.page.getByRole('link', { name: `TONGRAM ${summaryPoint}` }).click();
      await this.page.waitForLoadState('networkidle');
    
      await this.page.getByRole('button', { name: 'Engagement' }).click();
      const engagementElement = this.page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
      await engagementElement.waitFor({ state: 'visible' });
      const engagement = await engagementElement.evaluate(el => parseInt(el.textContent.trim(), 10));
    
      await this.page.getByRole('button', { name: 'Review' }).click();
      const reviewElement = this.page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
      await reviewElement.waitFor({ state: 'visible' });
      const review = await reviewElement.evaluate(el => parseInt(el.textContent.trim(), 10));
    
      await this.page.getByRole('button', { name: 'Share' }).click();
      const shareElement = this.page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
      await shareElement.waitFor({ state: 'visible' });
      const share = await shareElement.evaluate(el => parseInt(el.textContent.trim(), 10));
    
      const total = engagement + review + share;
      console.log(`Engagement: ${engagement}`);
      console.log(`Review: ${review}`);
      console.log(`Share: ${share}`);
      console.log(`Total: ${total}`);
  
      if (total === summaryPoint) {
        console.log(`✅ The total value matches ${summaryPoint}`);
      } else {
        console.log(`❌ The total value does not match ${summaryPoint}`);
      }
    } catch (error) {
      console.error('❌ Error during verification and calculation:', error);
    }
  }
  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async searchGame() {
    try {
      await this.page.getByPlaceholder('Search', { exact: true }).click();
      await this.page.getByPlaceholder('Search', { exact: true }).fill(config.Search_Query);
      await this.page.getByPlaceholder('Search', { exact: true }).press('Enter');
      await this.page.getByRole('banner').getByRole('link', { name: config.Search_Query_Data_1 }).click();
      await expect(this.page.getByRole('heading', { name: config.Verify_Search_Query_1 })).toBeVisible();
  
    } catch (error) {
      console.error('❌ Error during search:', error);
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async openGame() {
    try {
      await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
      await this.page.getByRole('main').getByRole('link', { name: 'Games Games' }).click();
      await this.page.waitForLoadState('networkidle');
      
      await this.page.getByRole('link', { name: config.Search_Query_Data_6 }).click();
      await this.page.waitForLoadState('networkidle');
      
      console.log('✅ Game opened successfully.');
    } catch (error) {
      console.error('❌ Error during opening game:', error);
    }
  }
}

// export { TGHomePage };

module.exports = TGHomePage;