const fs = require('fs');
const path = require('path'); 
import { config } from '../Utils/TG_config.js'; // Ensure correct path

class VerifyPointFunction {
  constructor(page) {
    this.page = page;
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

}

export default VerifyPointFunction;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////