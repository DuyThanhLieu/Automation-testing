// /Pages/Friendify/FD_Register.js
import { config } from '../../Utils/FD_config';
import fs from 'fs';
import path from 'path';
import { expect } from '@playwright/test';

export class RegisterPage {
  constructor(page) {
    this.page = page;
  }

  async registerAndLogin() {
    const iterations = config.numberOfIterations; // Get the number of iterations from config

    for (let i = 0; i < iterations; i++) {
      const randomString = Math.random().toString(36).substring(2, 10);
      const randomName = `TesterFriendify${randomString}`;
      const randomEmail = `TesterFriendify${randomString}@gmail.com`;
      const password = 'Tester25082024@';

      await this.page.goto(config.signupUrl);

      await this.page.getByPlaceholder('Full name...').waitFor({ timeout: 5000 });
      await this.page.getByPlaceholder('Full name...').fill(randomName);

      await this.page.getByPlaceholder('Email...').fill(randomEmail);
      await this.page.getByPlaceholder('Password...', { exact: true }).fill(password);
      await this.page.getByPlaceholder('Confirm password...').fill(password);
      await this.page.getByPlaceholder('Referral code...').fill(config.referralCode);

      await this.page.getByRole('button', { name: 'Register' }).click();

      await expect(this.page.getByText('Register successfully')).toBeVisible({ timeout: 10000 });

      console.log(`Registered with email: ${randomEmail}`);
      console.log(`Password: ${password}`);

      // Login after registration
      await this.page.getByPlaceholder('Email...').fill(randomEmail);
      await this.page.getByPlaceholder('Password...').fill(password);
      await this.page.getByRole('button', { name: 'Login' }).click();

      await expect(this.page).toHaveTitle('Friendify GPT - Your AI Personal Assistant');

      await this.page.waitForTimeout(4000);
      await this.page.getByRole('button', { name: 'avatar' }).click();
      await this.page.getByText('Logout').click();
      await this.page.getByRole('button', { name: 'Confirm' }).click();
    }
  }
}
