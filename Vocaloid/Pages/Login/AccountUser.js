import { expect } from '@playwright/test';
import { config } from '../../Utils/config';

class LoginUserPage {
  constructor(page) {
    this.page = page;
  }

  async loginUser() {
    await this.page.goto(config.URL);
    await this.page.getByRole('checkbox').check(); 
    await this.page.locator('.close-button').first().click(); 
    await this.page.getByRole('button', { name: 'Sign In' }).click(); 

    await this.page.getByPlaceholder('Enter your email').fill(config.email);
    await this.page.getByPlaceholder('Enter your password').fill(config.password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await expect(this.page.getByText('Login success')).toBeVisible(); 
    console.log('✅ Login success'); 
  }

  async logoutUser() {
    await this.page.locator('.sc-hYqwXO > svg').click(); 
    await this.page.locator('#wrapper').getByText('Logout').click(); 
    await expect(this.page.getByText('Logout success')).toBeVisible();
  }
}

export default LoginUserPage;
