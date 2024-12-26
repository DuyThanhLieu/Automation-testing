import { test } from '@playwright/test';
import { ActionsPage } from '../Pages/BS_Actions';
import { config } from '../Utils/BS_config';

test.describe('Busai Actions', () => {
  test('Group Busai', async ({ browser }) => {
    const actionsPage = new ActionsPage(browser);

      await test.step('Login with Telegram', async () => {
        await actionsPage.openWithSavedCookies();
      });

      await test.step('AI Chat GPT 1', async () => {
        await actionsPage.performFirstChat(config.message1); 
      });

      await test.step('AI Chat GPT 2', async () => {
        await actionsPage.performSecondChat(config.message2); 
      });

      await test.step('AI Generate Image', async () => {
      ///
      });
      
      await test.step('Generate Docs', async () => {
        await actionsPage.openWithSavedCookies();
        await actionsPage.performGenerateDocs(); 
        await actionsPage.deleteGenerateDocs(); 
        });

      await test.step('Generate Audio', async () => {
        await actionsPage.openWithSavedCookies();
        await actionsPage.performGenerateAudio();
        await actionsPage.deleteGenerateAudio();  
        });

      await test.step('Generate Image', async () => {
        await actionsPage.openWithSavedCookies();
        await test.step('Generate Image - Sumary', async () => {
            await actionsPage.performGenerateImage_Summary();
            await actionsPage.deleteGenerateImage_Summary();
        });
    
        await test.step('Generate Image - Remove Object', async () => {
            await actionsPage.performGenerateImage_RemoveObject();
            await actionsPage.deleteGenerateImage_RemoveObject();
        });
    
        await test.step('Generate Image - Remove Text', async () => {
            await actionsPage.performGenerateImage_RemoveText();
            await actionsPage.deleteGenerateImage_RemoveText();
        });
    });
    

      await test.step('Forwarded to Busai Music', async () => {
        ///
        });

      await test.step('Forwarded to Busai Generate', async () => {
        ///
        });

      await test.step('Verify History', async () => {
        ///
        });      
    });
});