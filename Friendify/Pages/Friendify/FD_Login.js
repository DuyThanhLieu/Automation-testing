// /Pages/Friendify/FD_Login.js
import { config } from '../../Utils/FD_config';
import fs from 'fs';
import path from 'path';
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async loginWithAccount() {
    await this.page.goto(config.url);
    await this.page.getByText('Login').click();
    await this.page.getByPlaceholder('Email...').fill(config.email);
    await this.page.getByPlaceholder('Password...').fill(config.password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await expect(this.page).toHaveTitle('Friendify GPT - Your AI Personal Assistant');
    await this.page.waitForTimeout(4000);
    await this.page.getByRole('button', { name: 'avatar' }).click();
    await this.page.getByText('Logout').click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
  }

  async loginWithGoogle(skipReferral) {
    await this.page.goto(config.url);
    await this.page.getByText('Login').click();
    const popupPromise = this.page.waitForEvent('popup');
    await this.page.getByText('Continue with Google').click();
    const popup = await popupPromise;

    await popup.getByLabel('Email or phone').fill(config.googleEmail);
    await popup.getByRole('button', { name: 'Next' }).click();
    await popup.getByLabel('Enter your password').fill(config.googlePassword);
    await popup.getByRole('button', { name: 'Next' }).click();
    await this.page.waitForTimeout(10000);

    const referralCodeField = this.page.locator('text="Add your referral code here"');
    if (await referralCodeField.isVisible()) {
      await this.page.getByRole('button', { name: 'Skip' }).click();
    }

    await expect(this.page).toHaveTitle('Friendify GPT - Your AI Personal Assistant');
    await this.saveCookies();
  }

  async saveCookies() {
    const cookies = await this.page.context().cookies();
    const filePath = path.join(config.cookiesDir, config.cookiesFile);
    if (!fs.existsSync(config.cookiesDir)) {
      fs.mkdirSync(config.cookiesDir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(cookies, null, 2));
  }
}
