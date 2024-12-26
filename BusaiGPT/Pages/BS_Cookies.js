import fs from 'fs';
import path from 'path';
import { config } from '../Utils/BS_config';

export class BusaiPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToBusai() {
    await this.page.goto(config.busaiUrl);
  }

  async logInWithTelegram() {
    const page1Promise = this.page.waitForEvent('popup');
    await this.page.getByRole('button', { name: 'panda Log in with Telegram' }).click();

    const page1 = await page1Promise;
    await page1.goto(config.ssoUrl);
    const page2Promise = page1.waitForEvent('popup');
    await page1.getByRole('button', { name: 'Login with telegram' }).click();
    
    const page2 = await page2Promise;
    await page2.goto(config.telegramAuthUrl);
    await page2.locator('#login-phone').fill(config.phoneNumber);
    await page2.getByRole('button', { name: 'Next' }).click();
    await this.page.waitForTimeout(10000);
  }

  async saveCookies() {
    const dir = config.cookiesDir;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const cookies = await this.page.context().cookies();  
    const filePath = path.join(dir, config.cookiesFile); 
    fs.writeFileSync(filePath, JSON.stringify(cookies, null, 2));
  }
}

