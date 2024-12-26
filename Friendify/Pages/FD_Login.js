import fs from 'fs';
import path from 'path';
import { config } from '../Utils/FD_config';

export class LoginPage {
  constructor(page) {
    this.page = page;
  }
////////////////////////////////////////////////////////////////////////////////////////////////
  async saveCookies() {
    const cookies = await this.page.context().cookies();
    const filePath = path.join(config.cookiesDir, config.cookiesFile);
    if (!fs.existsSync(config.cookiesDir)) {
      fs.mkdirSync(config.cookiesDir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(cookies, null, 2));
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  async loginWithAccount() {
    await this.page.goto(config.url);  
    await this.page.getByText('Login').click();
    await this.page.getByPlaceholder('Email...').fill(config.email);
    console.log(`Entered email: ${config.email}`);
    await this.page.getByPlaceholder('Password...').fill(config.password);
    console.log(`Entered password: ${config.password}`);
    await this.page.getByRole('button', { name: 'Login' }).click();
  
    const logoVisible = await this.page.locator("//img[@alt='avatar']").isVisible();
    if (logoVisible) {
      console.log('✅  Login successfully');
    } else {
      console.log('❌ Login failed. Please check your credentials or account status.');
      throw new Error('❌ Login failed.');
    }
    
    await this.page.getByRole('button', { name: 'avatar' }).click();
    await this.page.getByText('Logout').click();  
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    console.log('✅ Logout successfully');
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  async loginWithGoogle(skipReferral) {
    await this.page.goto(config.url);
    await this.page.getByText('Login').click();
    
    const popupPromise = this.page.waitForEvent('popup');
    await this.page.getByText('Continue with Google').click();
    const popup = await popupPromise;

    await popup.getByLabel('Email or phone').fill(config.googleEmail);
    console.log(`Entered email: ${config.googleEmail}`);
    await popup.getByRole('button', { name: 'Next' }).click();
    await popup.getByLabel('Enter your password').fill(config.googlePassword);
    console.log(`Entered email: ${config.googlePassword}`);
    await popup.getByRole('button', { name: 'Next' }).click();

    try {
      const skipButton = await this.page.getByRole('button', { name: 'Skip' });
      await skipButton.click();
      console.log('⏭️   Skip button clicked');
    } catch (error) {
      console.log('⏭️   Skip button not found');
    }

    const logoVisible = await this.page.locator("//img[@alt='avatar']").isVisible();
    if (logoVisible) {
      console.log('✅  Login successfully');
    } else {
      console.log('❌ Login failed. Please check your credentials or account status.');
      throw new Error('❌ Login failed.');
    }

    await this.page.getByRole('button', { name: 'avatar' }).click();
    await this.page.getByText('Logout').click();  
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    console.log('✅ Logout successfully');
  }
}