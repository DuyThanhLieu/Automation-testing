import { expect } from '@playwright/test';
import { config } from '../../Utils/config';

class CreateMusicPage {
  constructor(page) {
    this.page = page;
  }

  logTimeTaken(startTime) {
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    console.log(`🕒 Time taken from header appearance to success message: ${minutes} minutes and ${seconds} seconds`);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// If the expected xpath appears within a certain time frame, console.log ////////////
async VerifyLocator(expectedLocator) {
  try {
      await this.page.waitForTimeout(3000);
      await expect(expectedLocator).toBeVisible({ timeout: 900000 });
      console.log(`🔵 Locator verified: ${expectedLocator}`);
  } catch (error) {
      console.error(`❌ Locator ${expectedLocator} not displayed:`, error);
      throw new Error('❌ Verification Failed');
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// If xpath appears, click n times, if it does not appear within a period of time then fail //////
async ClickNTime(buttonLocator, clickCount, successMessage, failureMessage) {
  try {
      await this.VerifyLocator(buttonLocator);
      console.log(successMessage);
      for (let i = 0; i < clickCount; i++) {
          await buttonLocator.click();
      }
  } catch (error) {
      console.error(failureMessage, error);
      throw new Error(failureMessage);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// If the success button is visible, console.log success; if the fail button is visible, console.log fail; if neither is visible, console.log unknown //
async verifyHistoryStatus(successLocator, failedLocator, successMessage, failureMessage, unknownMessage) {
  try {
      const isSuccessVisible = await successLocator.isVisible();
      const isFailedVisible = await failedLocator.isVisible();

      await this.page.waitForTimeout(2000);
      if (isSuccessVisible) {
          console.log(successMessage);
      } else if (isFailedVisible) {
          console.log(failureMessage);
      } else {
          console.log(unknownMessage);
      }
  } catch (error) {
      console.error(`❌ Error checking status:`, error);
      throw new Error('❌ Failed to verify history status.');
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// If there is a button, click it and verify the success message ////////////
async clickAndVerify(clickLocator, successLocator, successMessage) {
  try {
      await clickLocator.waitFor({ state: 'visible', timeout: 5000 });
      await clickLocator.click();
      await successLocator.waitFor({ state: 'visible', timeout: 5000 });
      console.log(` ${successMessage}`);
  } catch (error) {
      console.error(`❌ Action failed:`, error);
      throw new Error('❌ Failed to click and verify success.');
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// If the xpath appears, click it, wait, then click it again ////////////
async VerifyLocatorandDoubleClick(expectedLocator, clickAction = false, timeout) {
  try {
      await this.VerifyLocator(expectedLocator);
      if (clickAction) {
          await this.page.waitForTimeout(1000);
          await expectedLocator.click();
          await this.page.waitForTimeout(timeout); 
          await expectedLocator.click();
      }
  } catch (error) {
      console.error(`❌ ${expectedLocator} is not clickable or not displayed:`, error);
      throw new Error('❌ Failed');
  }
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// async VerifyLocatorandDoubleClick(expectedLocator, clickAction = false, timeout, verificationLocator = null) {
//   try {
//       await this.VerifyLocator(expectedLocator);
      
//       if (clickAction) {
//           await expectedLocator.click();
//           await this.page.waitForTimeout(timeout); 
//           await expectedLocator.click();
//       }


//       if (verificationLocator) {
//           await this.VerifyLocator(verificationLocator); 
//           console.log(`✅ Verification successful for locator: ${verificationLocator}`);
//       }
      
//   } catch (error) {
//       console.error(`❌ ${expectedLocator} is not clickable or not displayed:`, error);
//       throw new Error('❌ Failed');
//   }
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// If the xpath appears, click it, verify the new page URL, then go back to the previous page ////////////
async checkAndNavigate(button, expectedURL) {
  try {
      const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          button.click(),
      ]);
  
      if (newPage) {
          await newPage.waitForURL(expectedURL, { timeout: 600000 });
          console.log(`🔵 New tab opened and navigated to ${expectedURL}`);
          await this.page.waitForTimeout(1000);
          await newPage.close();
      } else {
          await this.page.waitForURL(expectedURL, { timeout: 600000 });
          console.log(`🔵 Same page navigated to ${expectedURL}`);
          await this.page.waitForTimeout(1000);
          await this.page.goBack({ timeout: 600000 });
      }
  } catch (error) {
      console.error(`❌ Failed to navigate to ${expectedURL}:`, error);
      throw new Error('❌ Navigation Failed');
  }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async checkActiveButtonandReload(expectone, expecttwo) {
  try {
      await this.page.waitForTimeout(2000);
      await expectone.click();
      console.log(`✅ Clicked on ${expectone}`);
      await this.page.waitForTimeout(2000);
      await expect(expecttwo).toBeVisible({ timeout: 120000 });
      console.log(`🔵 ${expecttwo} is displayed`);
      await this.page.reload({ timeout: 120000 });
      console.log(`✅ Page reloaded successfully`);

  } catch (error) {
      console.error(`❌ Failed to navigate:`, error);
      throw new Error('❌ Navigation Failed');
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Retry the action up to 3 times if it fails //
async retry(action, retries = 3) {
  for (let i = 0; i < retries; i++) {
      try {
          await action();
          return; 
      } catch (error) {
          console.error(`Attempt ${i + 1} failed:`, error);
          if (i === retries - 1) throw error; 
      }
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Check the element's attribute and verify its value //
async checkElementAttribute(locator, attribute, expectedValue) {
  const actualValue = await locator.getAttribute(attribute);
  if (actualValue !== expectedValue) {
      throw new Error(`Expected ${attribute} to be ${expectedValue}, but got ${actualValue}`);
  }
  console.log(`✅ ${attribute} is as expected: ${expectedValue}`);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Check if the convert voice button is visible and click it twice if it is //

async clickButton(expectButton) {
  try {
      const buttonVisible = await expectButton.isVisible();
      const clickCount = 2; 
      const successMessage = "✅ Clicking Generate...";
      const failureMessage = "❌ Generate button is not present.";
  
      if (buttonVisible) {
          console.log(successMessage);
          for (let i = 0; i < clickCount; i++) {
              await expectButton.click();
          }
      } else {
          console.log(failureMessage);
          throw new Error(failureMessage);
      }
  } catch (error) {
      console.error(`❌ Error clicking convert voice button:`, error);
      throw new Error('❌ Failed to click convert voice button.');
  }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async uploadFile(filePath) {
  await this.page.setInputFiles("(//input[@type='file'])", filePath);
  console.log(`✅ File uploaded: ${filePath}`);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async createMusic() {
    try {
      const randomPromptButton = this.page.getByRole('button', { name: 'Get Random Prompt' });
      const validLinkMessage = await this.page.getByText('Create music successfully!');
      const generateButton = this.page.locator(`//span[text()='Generate']`);
      const Playbutton1 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//button[1])[1]`);
      const Playbutton2 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//button[1])[5]`);
      const Downloadbutton1 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][3])[1]`);
      const Downloadbutton2 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][3])[2]`);
      const Viewmorebutton1 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//button[1])[4]`);
      const Viewmorebutton2 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//button[1])[8]`);
      const Deletebutton = this.page.locator(`(//div[contains(., 'Create Music')]/following-sibling::div[1])[6]`);
      const expectTimeMusic1 = this.page.locator(`(//p[string-length(normalize-space())=5 and normalize-space() = concat('0','0',':','0','3')])[1]`);
      const expectTimeMusic2 = this.page.locator(`(//p[string-length(normalize-space())=5 and normalize-space() = concat('0','0',':','0','6')])[1]`);

      await this.page.getByRole('link', { name: 'Create Music' }).click();
      
      await randomPromptButton.click();
      await this.page.getByPlaceholder('Naming your masterpiece...').fill(config.CreateMusics_Name);

      await this.ClickNTime(generateButton, 1, "✅ Clicking Generate...", "❌ Generate button is not present.");
      
      await this.VerifyLocator(validLinkMessage);


      const textsToCheck = [
        `LYRIC VIDEO: ${config.CreateMusics_Name}`,  
        `LYRIC VIDEO: ${config.CreateMusics_Name} Option 2`
      ];
      
      let startTime; 
      for (const text of textsToCheck) {
        const locator = this.page.getByText(text);
        if (await locator.count() > 0) {
          if (!startTime) {
            startTime = Date.now();
          }
          const isVisible = await locator.first().isVisible();
          console.log(isVisible ? `"${text}" is present.` : `"${text}" not found.`);
        } else {
          console.log(`"${text}" not found in the document.`);
        }
      }
      const successMessages = await Promise.all([
        this.page.getByText('Success').first().waitFor({ timeout: 240000 }),
        this.page.getByText('Success').nth(1).waitFor({ timeout: 240000 })
      ]);
      successMessages.forEach((msg, index) => {
        console.log(`Success message ${index + 1} is visible.`);
      });
      if (startTime) {
        this.logTimeTaken(startTime);
      }

      const successStartTime = Date.now(); 
      await this.VerifyLocatorandDoubleClick(Playbutton1, true, 3000);
      // await this.VerifyLocator(expectTimeMusic1);
      // await this.VerifyLocatorandDoubleClick(Playbutton1, true, 3000, expectTimeMusic1);
      await this.page.waitForTimeout(5000);
      await this.VerifyLocatorandDoubleClick(Playbutton2, true, 6000);
      // await this.VerifyLocator(expectTimeMusic2);
      // await this.VerifyLocatorandDoubleClick(Playbutton2, true, 6000, expectTimeMusic2);

      await this.VerifyLocator(Downloadbutton1);
      await this.VerifyLocator(Downloadbutton2);
      await this.VerifyLocator(Viewmorebutton1);
      await this.VerifyLocator(Viewmorebutton2);

      this.logTimeTaken(successStartTime);

    } catch (error) {
      console.error('❌ Error during Generate process:', error);
      throw new Error('❌ Generate Failed: '  + error.message);
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async DeleteHistory() {
  const successTd = this.page.locator(`//tr[.//h6[text()='${config.CreateMusics_Name}']][1]//p[text()='Success']`);
  const failedTd = this.page.locator(`//tr[.//h6[text()='${config.CreateMusics_Name}']][1]//p[text()='Failed']`);
  const deleteButton = this.page.locator(`//tr[.//h6[text()='${config.CreateMusics_Name}']][1]//button[contains(@class, 'delete-button')]`);
  const deleteSuccessLocator = this.page.locator(`//div[contains(text(), 'Delete success!')]`); 

  await this.page.getByRole('link', { name: 'History Activities' }).click();
  // await this.page.waitForSelector(`(//h6[text()='${config.CreateMusics_Name}'])[1]`, { state: 'visible' });

  await this.verifyHistoryStatus(
    successTd,
    failedTd,
    '✅ Song created with Success status on history summary page',
    '❌ Song created with Failed status on history summary page',
    '❌ Test status unknown: No success or failure message found.'
  );

  await this.clickAndVerify(
    deleteButton,
    deleteSuccessLocator,
    '✅ Delete success on history!'
  );
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async Tutorial() {
const buttons_url = [
  { locator: this.page.locator(`//a[p[text()='Busai Music']]`), url: 'https://music.busai.me/' },
  { locator: this.page.locator(`//a[p[text()='Facebook']]`), url: 'https://www.facebook.com/' },
  { locator: this.page.locator(`//a[p[text()='Youtube']]`), url: 'https://www.youtube.com/' },
  { locator: this.page.locator(`//a[p[text()='Spotify']]`), url: 'https://open.spotify.com/' },
];
const buttons_button = [
  { locator: this.page.locator(`(//p[text()='Watch Tutorial'])[1]`), button: this.page.locator(`(//div[.//img[@alt='Video thumbnail']]//img)[14]`) },
];

try {
  for (const button of buttons_url) {
    await this.page.waitForTimeout(1000);
    await this.checkAndNavigate(button.locator, button.url);
  }
} catch (error) {
  console.error(`❌ Error occurred while clicking links:`, error);
  throw new Error('❌ Back URL Failed');
}

try {
  for (const button of buttons_button) {
    await this.checkActiveButtonandReload(button.locator, button.button);
  }
} catch (error) {
  console.error(`❌ Error occurred while navigating to the tutorial:`, error);
  throw new Error('❌ Navigation Failed');
}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

export default CreateMusicPage;
