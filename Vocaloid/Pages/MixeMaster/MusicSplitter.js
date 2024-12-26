import { expect } from '@playwright/test';
import { config } from '../../Utils/config';

class MusicSplitterPage {
  constructor(page) {
    this.page = page;
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////
async uploadFile(filePath) {
  await this.page.setInputFiles("(//input[@type='file'])", filePath);
  console.log(`✅ File uploaded: ${filePath}`);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  console.log(`${successMessage}`);
} catch (error) {
  console.error(`❌ Action failed:`, error);
  throw new Error('❌ Failed to click and verify success.');
}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// If the xpath appears, click it, wait, then click it again ////////////
// async VerifyLocatorandDoubleClick(expectedLocator, clickAction = false, timeout) {
// try {
//   await this.VerifyLocator(expectedLocator);
//   if (clickAction) {
//       await expectedLocator.click();
//       await this.page.waitForTimeout(timeout); 
//       await expectedLocator.click();
//   }
// } catch (error) {
//   console.error(`❌ ${expectedLocator} is not clickable or not displayed:`, error);
//   throw new Error('❌ Failed');
// }
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async VerifyLocatorandDoubleClick(expectedLocator, clickAction = false, timeout, verificationLocator = null) {
  try {
      await this.VerifyLocator(expectedLocator);
      
      if (clickAction) {
          await expectedLocator.click();
          await this.page.waitForTimeout(timeout); 
          await expectedLocator.click();
      }


      if (verificationLocator) {
          await this.VerifyLocator(verificationLocator); 
          console.log(`✅ Verification successful for locator: ${verificationLocator}`);
      }
      
  } catch (error) {
      console.error(`❌ ${expectedLocator} is not clickable or not displayed:`, error);
      throw new Error('❌ Failed');
  }
}
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async MusicSplitterbyLink() {
    let startTime;
    try {
    const splitMusicButton = this.page.locator("//span[text()='Split Music']");
    const validLinkMessage = await this.page.getByText('Valid YouTube link!');
    const headerLocator = this.page.locator(`//div[@class='header']//h2[text()='${config.Youtube_Text_6}']`);
    const successLocator = this.page.locator(`//span[div[contains(text(), 'Success')]]`);
    
    const Playbutton1 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][1])[5]`);
    const Playbutton2 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][1])[11]`);
    const Playbutton3 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][1])[17]`);
    const Playbutton4 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][1])[23]`);
    const Playbutton5 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][1])[29]`);
    const Playbutton6 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][1])[35]`);
    const Playbutton7 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][1])[41]`);
    
    const Downloadbutton1 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])[9]`);
    const Downloadbutton2 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])[18]`);
    const Downloadbutton3 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])[27]`);
    const Downloadbutton4 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])[36]`);
    const Downloadbutton5 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])[45]`);
    const Downloadbutton6 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])[54]`);
    const Downloadbutton7 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])[63]`);

    const Deletebutton = this.page.locator(`(//div[contains(@class, 'header')]//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])`);
    
    const expectTimeMusic1 = this.page.locator(`(//p[string-length(normalize-space())=5 and normalize-space() = concat('0','0',':','0','5')])[1]`);
    const expectTimeMusic2 = this.page.locator(`(//p[string-length(normalize-space())=5 and normalize-space() = concat('0','0',':','0','5')])[2]`);
    const expectTimeMusic3 = this.page.locator(`(//p[string-length(normalize-space())=5 and normalize-space() = concat('0','0',':','0','5')])[3]`);
    const expectTimeMusic4 = this.page.locator(`(//p[string-length(normalize-space())=5 and normalize-space() = concat('0','0',':','0','5')])[4]`);
    const expectTimeMusic5 = this.page.locator(`(//p[string-length(normalize-space())=5 and normalize-space() = concat('0','0',':','0','5')])[5]`);
    const expectTimeMusic6 = this.page.locator(`(//p[string-length(normalize-space())=5 and normalize-space() = concat('0','0',':','0','5')])[6]`);
    const expectTimeMusic7 = this.page.locator(`(//p[string-length(normalize-space())=5 and normalize-space() = concat('0','0',':','0','5')])[7]`);

    await this.page.getByRole('link', { name: 'Music Splitter' }).click();

    await this.page.getByPlaceholder('Paste a Youtube link...').fill(config.Youtube_6);
    await this.ClickNTime(splitMusicButton, 2, "✅ Clicking Generate...", "❌ Generate button is not present.");
    
    // await this.VerifyLocator(validLinkMessage);

    const StartTime = Date.now(); 
    await this.VerifyLocator(headerLocator);
    await this.VerifyLocator(successLocator);
    this.logTimeTaken(StartTime);

    const playButtons = [Playbutton1, Playbutton2, Playbutton3, Playbutton4, Playbutton5, Playbutton6, Playbutton7];
    const expectTimeMusic = [expectTimeMusic1, expectTimeMusic2, expectTimeMusic3, expectTimeMusic4, expectTimeMusic5, expectTimeMusic6, expectTimeMusic7];
    for (let i = 0; i < playButtons.length; i++) {
        await this.page.waitForTimeout(1000);
        await this.VerifyLocatorandDoubleClick(playButtons[i], true, 5000, expectTimeMusic[i]);
        // await this.page.waitForTimeout(1000);
        // await this.VerifyLocator();
    }

    const Downloadbuttons = [Downloadbutton1, Downloadbutton2, Downloadbutton3, Downloadbutton4, Downloadbutton5, Downloadbutton6, Downloadbutton7];
    for (let i = 0; i < Downloadbuttons.length; i++) {
      await this.VerifyLocator(Downloadbuttons[i]);
    }
 
    await this.VerifyLocator(Deletebutton);


  } catch (error) {
    console.error('❌ Error during Generate process:', error);
    throw new Error('❌ Generate Failed: '  + error.message);
  }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async DeleteHistory() {
  const successTd = this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_6}']][1]//p[text()='Success']`);
  const failedTd = this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_6}']][1]//p[text()='Failed']`);
  const deleteButton = this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_6}']][1]//button[contains(@class, 'delete-button')]`);
  const deleteSuccessLocator = this.page.locator(`//div[contains(text(), 'Delete success!')]`); 

  await this.page.getByRole('link', { name: 'History Activities' }).click();
  // await this.page.waitForSelector(`(//h6[text()='${config.Youtube_Text_6}'])[1]`, { state: 'visible' });

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
    { locator: this.page.locator(`//p[text()='Watch Tutorial']`), button: this.page.locator(`(//div[.//img[@alt='Video thumbnail']]//img)[14]`) },
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
///////////////////////////////////////////////////////////////////////////////////////////////////////
}

export default MusicSplitterPage;
