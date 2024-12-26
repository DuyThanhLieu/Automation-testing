import { expect } from '@playwright/test';

class HistoryPage {
  constructor(page) {
    this.page = page;
  }

  async rateHistory() {
    try {
      await this.page.getByRole('link', { name: 'History Activities' }).click();
      await this.page.locator("(//button[contains(@class, 'delete-button')]/preceding-sibling::button[2])[1]").first().click();    
      await expect(this.page.getByRole('heading', { name: 'Review' })).toBeVisible();

      console.log('🔍 Rating the activity...');
      await this.page.getByTitle('out of 5').locator('path').nth(4).click();
      await this.page.getByRole('textbox').fill('Good Music');
      await this.page.getByRole('button', { name: 'Submit' }).click();

      console.log('🔍 Checking for Success message visibility...');
      await expect(this.page.getByText('Success!')).toBeVisible();
      
    } catch (error) {
      console.error('❌ Error during rating history:', error);
      throw new Error(this.errorMessage + error.message);
    }
  }

  async reportHistory() {
    try {
      await this.page.getByRole('link', { name: 'History Activities' }).click();
      await this.page.locator("(//button[contains(@class, 'delete-button')]/preceding-sibling::button[1])[1]").first().click();
      await expect(this.page.getByRole('heading', { name: 'I am flagging this activity as' })).toBeVisible();

      console.log('🔍 Selecting Bug Report...');
      await this.page.getByText('Bug Report').click();
      await this.page.getByRole('button', { name: 'Flag activity' }).click();

      console.log('🔍 Checking for Success message visibility...');
      await expect(this.page.getByText('Success!')).toBeVisible();
      
    } catch (error) {
      console.error('❌ Error during reporting history:', error);
      throw new Error(this.errorMessage + error.message);
    }
  }

  async deleteHistory() {
    try {
      await this.page.getByRole('link', { name: 'History Activities' }).click();

      console.log('🔍 Clicking the delete button...');
      await this.page.locator("(//button[contains(@class, 'delete-button')])[1]").first().click();
      await expect(this.page.getByText('Delete success!')).toBeVisible();
      
    } catch (error) {
      console.error('❌ Error during deleting history:', error);
      throw new Error(this.errorMessage + error.message);
    }
  }

  get errorMessage() {
    return '❌ Failed in the History process due to an error: ';
  }
}

export default HistoryPage;
