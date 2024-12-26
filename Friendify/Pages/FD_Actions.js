// /Pages/Friendify/FD_Actions.js
import { expect } from '@playwright/test';
import { config } from '../Utils/FD_config';

export class ActionsPage {
    constructor(page) {
        this.page = page;
        this.chatPointSelector = config.chatPointSelector;
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////                  FUNCTION                ////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async loginWithAccount() {
        await this.page.goto(config.url);
        await this.page.getByText('Login').click();
        await this.page.getByPlaceholder('Email...').fill(config.email);
        await this.page.getByPlaceholder('Password...').fill(config.password);
        await this.page.getByRole('button', { name: 'Login' }).click();
        // await expect(this.page).toHaveTitle('Friendify GPT - Your AI Personal Assistant');
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertToPoints(pointText) {
        const numStr = pointText.replace(/K|M|B|T/g, '').replace(/,/g, '').trim();
        const multiplier = pointText.includes('K') ? 1000 :
                          pointText.includes('M') ? 1000000 :
                          pointText.includes('B') ? 1000000000 :
                          pointText.includes('T') ? 1000000000000 : 1;
    
        const value = parseFloat(numStr);
        return isNaN(value) ? 0 : value * multiplier;  
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async checkPointsBeforeChat() {
        console.log('🔍 Checking current points...');
        try {
            await this.page.waitForTimeout(5000);
            await this.page.waitForSelector(this.chatPointSelector, { timeout: 10000 });
            const pointTextBeforeChat = await this.page.locator(this.chatPointSelector).innerText();
            const pointBeforeChat = this.convertToPoints(pointTextBeforeChat);
            console.log('🔍 Point before chat: ', pointBeforeChat);
            return pointBeforeChat; 
        } catch (error) {
            console.error('❌ Error checking points before chat:', error);
            throw error; 
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async checkPointsAfterChat(expectedDecrease, pointBeforeChat) {
        try {
            await this.page.waitForTimeout(10000);
            await this.page.waitForSelector(this.chatPointSelector, { timeout: 10000 });
            const pointTextAfterChat = await this.page.locator(this.chatPointSelector).innerText();
            const pointAfterChat = this.convertToPoints(pointTextAfterChat);
            console.log('🔍 Point after chat: ', pointAfterChat);
    
            const pointUsed = pointBeforeChat - pointAfterChat; 
            console.log('⚡⚡⚡ Total points used after chat: ', pointUsed);
            if (pointUsed === expectedDecrease) {
                console.log(`✅ The points decreased correctly by ${expectedDecrease} after the chat.`);
            } else {
                console.error(`❌ The points did not decrease correctly after the chat. Expected decrease: ${expectedDecrease}, Actual points left: ${pointAfterChat}`);
            }
    
            return pointAfterChat; 
        } catch (error) {
            console.error('❌ Error checking points after chat:', error);
            throw error; 
        }
    }
    
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////                 TEST CASE                ////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async performFirstChat() {
        const pointBeforeChat = await this.checkPointsBeforeChat();
        for (let i = 0; i < 1; i++) {
            await this.page.getByText('AskContactChatFeedAssist').first().click();
            await this.page.getByRole('link', { name: 'Ask' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('link', { name: 'AI Chat GPT Start new chat' }).click();
            await this.page.getByText('AI Chat GPTNew chat').click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('link', { name: 'New chat' }).click();
    
            await this.page.getByPlaceholder('Type something...').fill(config.message1);
            console.log('📝 Typed message: ', config.message1);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(2000);

                try {
                    const isMessageVisible = await this.page.getByText(config.expect_message1).isVisible();
                    if (isMessageVisible) {
                        console.log('✅ Expected message is visible');
                    } else {
                        console.log('❌ Expected message is NOT visible');
                    }
                } catch (error) {
                    console.error('❌ Error while checking expected message:', error);
                }
        }
        await this.checkPointsAfterChat(1, pointBeforeChat); 
    }
    

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async performSecondChat() {
        const pointBeforeChat = await this.checkPointsBeforeChat();
        for (let i = 0; i < 1; i++) {
            await this.page.getByRole('link', { name: 'New chat' }).click();
            await this.page.getByRole('switch', { name: 'Speed Intelligent' }).click();
            console.log('🖱️ Clicked "Speed Intelligent" switch');

            await this.page.getByPlaceholder('Type something...').fill(config.message2);
            console.log('📝 Typed message: ', config.message2);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(2000);
    
                try {
                    const isMessageVisible = await this.page.getByText(config.expect_message2).isVisible();
                    if (isMessageVisible) {
                        console.log('✅ Expected message is visible');
                    } else {
                        console.log('❌ Expected message is NOT visible');
                    }
                } catch (error) {
                    console.error('❌ Error while checking expected message:', error);
                }
        }
        await this.checkPointsAfterChat(1, pointBeforeChat); 
        await this.page.waitForTimeout(2000);
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async generateImage_1() {
        const pointBeforeChat = await this.checkPointsBeforeChat();
    
        for (let i = 0; i < 1; i++) {
            await this.page.getByRole('link', { name: 'Chat', exact: true }).click();
            await this.page.getByRole('link', { name: 'Ask' }).click();

            await this.page.getByRole('link', { name: 'AI Generate Image Create new' }).click();
            await this.page.getByPlaceholder('Describe your image...').fill('Tạo ảnh 1 con mèo dễ thương');
            await this.page.getByRole('button', { name: 'Generate' }).click();
            console.log('🚀 Generating image...');
            await this.page.waitForTimeout(2000); 

                const generatedImage = this.page.getByRole('img', { name: 'Generated Image' }).nth(1);
                try {
                    await expect(generatedImage).toBeVisible({ timeout: 60000 });
                    console.log('✅ Expected image is visible');
                } catch (error) {
                    console.error('❌ The expected image is not visible:', error);
                }
        } 
        await this.checkPointsAfterChat(5, pointBeforeChat); 
        await this.page.waitForTimeout(2000);
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async generateImage_2() {
        const pointBeforeChat = await this.checkPointsBeforeChat();
        for (let i = 0; i < 1; i++) {
                await this.page.getByRole('link', { name: 'Chat', exact: true }).click();
                await this.page.getByRole('link', { name: 'Ask' }).click();
                await this.page.getByRole('link', { name: 'AI Generate Image Create new' }).click();
                await this.page.getByRole('button', { name: 'Pro •' }).click();
                
                await this.page.getByPlaceholder('Describe your image...').fill('Tao ảnh con mèo');
                await this.page.getByRole('button', { name: 'Generate' }).click();
                console.log('🚀 Generating image...');
    
                    const generatedImage = this.page.getByRole('img', { name: 'Generated Image' }).nth(2);
                    try {
                        await expect(generatedImage).toBeVisible({ timeout: 60000 });
                        console.log('✅ Expected image is visible');
                    } catch (error) {
                        console.error('❌ The expected image is not visible:', error);
                    }
        }
        await this.checkPointsAfterChat(25, pointBeforeChat); 
        await this.page.waitForTimeout(2000); 
    }
    

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async performOtherActions() {
        await this.page.getByText('AskContactChatFeedAssist').first().click();
        await this.page.getByRole('link', { name: 'Ask' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('link', { name: 'AI Generate Image Create new' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'Standard •' }).click();
        await this.page.getByPlaceholder('Describe your image...').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'Pro •' }).click();
        await this.page.getByPlaceholder('Describe your image...').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('link', { name: 'Contact' }).click();
        await this.page.locator('div').filter({ hasText: /^Contact$/ }).getByRole('img').nth(1).click();
        await this.page.locator('div').filter({ hasText: /^Huy ThienAdd$/ }).getByRole('button').click();
        await this.page.getByRole('button', { name: 'Revoke' }).click();
        await this.page.locator('div').filter({ hasText: /^Add Friend$/ }).getByRole('img').click();
        await this.page.getByRole('link', { name: 'Chat' }).click();
        await this.page.getByRole('link', { name: 'Feed' }).click();
        await this.page.getByRole('button', { name: 'Community' }).click();
        await this.page.getByRole('option', { name: 'My feeds' }).click();
        await this.page.getByRole('button', { name: 'My feeds' }).click();
        await this.page.getByRole('option', { name: 'Community' }).click();
        await this.page.getByRole('link', { name: 'Assist' }).click();
        await this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .pdf)' }).locator('div').first().waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator('text=Audio').waitFor({ state: 'visible', timeout: 10000 });
        await this.page.getByText('Audio').click();
        await this.page.locator('div').filter({ hasText: /^Upload File \(Max 5MB \.mp3\) Small or poor-quality sound may limit summarization\.$/ }).nth(1).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator('text=Image').waitFor({ state: 'visible', timeout: 10000 });
        await this.page.getByText('Image').click();
        await this.page.locator('label:has-text("Upload File (Max 5MB .png | .")').waitFor({ state: 'visible', timeout: 10000 });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async generateDoc() {
        const pointBeforeChat = await this.checkPointsBeforeChat();
        for (let i = 0; i < 1; i++) {
            await this.page.getByRole('link', { name: 'Assist' }).click();
            
            const uploadLocator = this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .pdf)' }).locator('div').first();
            await uploadLocator.waitFor({ state: 'visible', timeout: 10000 });
            await uploadLocator.click();
            const filePath = config.path_generateDocs;
            await this.page.setInputFiles('input[type="file"]', filePath);
            console.log('📂 File uploaded');
            await this.page.getByRole('button', { name: 'Start Summary' }).click();

            try {
                console.log('🔍 Verifying generated docs...');
                await expect(this.page.getByText(config.expect_text_Docs)).toBeVisible({ timeout: 30000 });
                console.log('✅ Message is visible:', config.expect_text_Docs);
            } catch (error) {
                console.error('❌ Failed to verify generate docs:', error);
            }
        }
        await this.checkPointsAfterChat(5, pointBeforeChat); 
        await this.page.waitForTimeout(2000); 
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async deleteGenerateDocs() { 
        await this.page.getByRole('link', { name: 'Ask' }).click();
        await this.page.getByRole('link', { name: 'Assist' }).click();
        await this.page.locator('#scrollableDiv').getByRole('img').nth(1).click();
        await this.page.getByRole('button', { name: 'Confirm' }).click();
        console.log('✅ Delete Docs');
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async generateAudio() {
        const pointBeforeChat = await this.checkPointsBeforeChat();
        for (let i = 0; i < 1; i++) {
            await this.page.getByRole('link', { name: 'Assist' }).click();
            await this.page.getByText('Audio').click();
            await this.page.locator('div').filter({ hasText: /^Upload File \(Max 5MB \.mp3\) Small or poor-quality sound may limit summarization\.$/ }).nth(1).waitFor({ state: 'visible', timeout: 10000 });
            await this.page.locator('div').filter({ hasText: /^Upload File \(Max 5MB \.mp3\) Small or poor-quality sound may limit summarization\.$/ }).nth(1).click();

            const filePath = config.path_generateAudio;
            await this.page.setInputFiles('input[type="file"]', filePath);
            console.log('📂 File uploaded');
            await this.page.getByRole('button', { name: 'Start Summary' }).click();

            try {
                await expect(this.page.getByText(config.expect_text_Audio)).toBeVisible({ timeout: 30000 });
                console.log('✅ Message is visible:', config.expect_text_Audio);
            } catch (error) {
                console.error('❌ Failed to verify generate:', error);
            }
        }
        await this.checkPointsAfterChat(5, pointBeforeChat); 
        await this.page.waitForTimeout(2000); 
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async deleteGenerateAudio() {
        try {
            await this.page.getByRole('link', { name: 'Ask' }).click();
            await this.page.getByRole('link', { name: 'Assist' }).click();
            await this.page.getByText('Audio').click();
            await this.page.locator('#scrollableDiv').getByRole('img').click();
            await this.page.getByRole('button', { name: 'Confirm' }).click();
            console.log('✅ Delete Audio');
    
        } catch (error) {
            console.error('❌ Failed to delete audio:', error);
        }
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async generateImage_Summary() {
        const pointBeforeChat = await this.checkPointsBeforeChat();
        for (let i = 0; i < 1; i++) {
            try {
                await this.page.getByRole('link', { name: 'Assist' }).click();
                await this.page.getByText('Image', { exact: true }).click();
                await expect(this.page.getByText('New features release')).toBeVisible();
        
                const uploadLocator = await this.page.locator('label:has-text("Upload File (Max 5MB .png | .")');
                await uploadLocator.waitFor({ state: 'visible', timeout: 10000 });
                await uploadLocator.click();
                const fileInput = this.page.locator('input[type="file"]');
                await fileInput.setInputFiles(config.path_generateImage_Summary);
                console.log('📂 File uploaded');
                await this.page.locator('div').filter({ hasText: /^Summary$/ }).getByRole('button').click();    
                await this.page.getByRole('button', { name: 'Let\'s start' }).click();
                console.log('🚀 Clicked Start');
        
                await expect(this.page.locator('div').filter({ hasText: /^Image_4KB\.png$/ }).nth(1)).toBeVisible();
                console.log('🔍 Verify generate image on this page');
                await expect(this.page.getByRole('img', { name: 'avt' })).toBeVisible({ timeout: 30000 });
                console.log('✅ Answer done');
            } catch (error) {
                console.error('❌ An error occurred during the generate image summary operation:', error);
            }
        }
        await this.checkPointsAfterChat(5, pointBeforeChat); 
        await this.page.waitForTimeout(2000); 
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async deleteGenerateImage_Summary() {
        try {
            await this.page.getByRole('link', { name: 'Ask' }).click();
            await this.page.getByRole('link', { name: 'Assist' }).click();
            await this.page.getByText('Image', { exact: true }).click();
            await this.page.locator('#scrollableDiv').getByRole('img').click();
            await this.page.getByRole('button', { name: 'Confirm' }).click();
            console.log('✅ Delete Image');
    
        } catch (error) {
            console.error('❌ Failed to delete image:', error);
        }
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async generateImage_Text() {
        const pointBeforeChat = await this.checkPointsBeforeChat();
        for (let i = 0; i < 1; i++) {
            try {
                await this.page.getByRole('link', { name: 'Assist' }).click();
                await this.page.getByText('Image', { exact: true }).click();
                await expect(this.page.getByText('New features release')).toBeVisible();
                await this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .png | .' }).locator('div').first().click(); 
                const filePath = config.path_generateImage_RemoveText;
                await this.page.setInputFiles('input[type="file"]', filePath);
                console.log('📂 File uploaded');
        
                await this.page.locator('div').filter({ hasText: /^Remove text$/ }).getByRole('button').click();
                await this.page.getByRole('button', { name: 'Let\'s start' }).click();
                console.log('🚀 Started Remove');

                const downloadPromise = this.page.waitForEvent('download');
                await this.page.getByRole('button', { name: 'Download image' }).click();
                const download = await downloadPromise;
                console.log('📥 Download Successfully');
            } catch (error) {
                console.error('❌ Failed to generate image with remove text:', error);
            }
    
            try {
                await expect(this.page.getByRole('img', { name: 'Image result' })).toBeVisible({ timeout: 30000 });
                console.log('✅ Answer done');
            } catch (error) {
                console.error('❌ Failed to verify image visibility:', error);
            }
        }   
        await this.checkPointsAfterChat(15, pointBeforeChat); 
        await this.page.waitForTimeout(2000); 
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async deleteGenerateImage_Text() {
        try {
            await this.page.getByRole('link', { name: 'Ask' }).click();
            await this.page.getByRole('link', { name: 'Assist' }).click();
            await this.page.getByText('Image', { exact: true }).click();
            await this.page.locator('#scrollableDiv').getByRole('img').click();
            await this.page.getByRole('button', { name: 'Confirm' }).click();
            console.log('✅ Delete Image');
    
        } catch (error) {
            console.error('❌ Failed to delete image:', error);
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async generateImage_Object() {
        const pointBeforeChat = await this.checkPointsBeforeChat();
        for (let i = 0; i < 1; i++) {
            try {
                await this.page.getByRole('link', { name: 'Assist' }).click();
                await this.page.getByText('Image', { exact: true }).click();
                await expect(this.page.getByText('New features release')).toBeVisible();
        
                await this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .png | .' }).locator('div').first().click();
                const filePath = config.path_generateImage_RemoveObject;
                await this.page.setInputFiles('input[type="file"]', filePath);
                console.log('📂 File uploaded');

                await this.page.locator('div').filter({ hasText: /^Remove object$/ }).getByRole('button').click();
                await this.page.getByRole('button', { name: 'Let\'s start' }).click();
                console.log('🚀 Started Remove');

                await this.page.getByRole('slider').fill('100');
                await this.page.locator('canvas').nth(1).click({ position: { x: 186, y: 83 } });
                await this.page.locator('canvas').nth(1).click({ position: { x: 432, y: 90 } });
                await this.page.getByRole('main').getByRole('button').first().click();
                await this.page.getByRole('main').getByRole('button').nth(1).click();
                await expect(this.page.locator('canvas').nth(1)).toBeVisible({ position: { x: 432, y: 90 } });
                await this.page.getByRole('main').getByRole('button').nth(2).click();
                await this.page.locator('canvas').nth(1).click({ position: { x: 185, y: 89 } });
                await this.page.getByRole('button', { name: 'Clean •' }).click();
                console.log('🧹 Clean action executed');

                const downloadPromise = this.page.waitForEvent('download');
                await this.page.getByRole('button', { name: 'Download image' }).click();
                const download = await downloadPromise;
                console.log('📥 Download successfully initiated');

                await expect(this.page.getByRole('img', { name: 'Image result' })).toBeVisible({ timeout: 30000 });
                console.log('✅ Answer done');

            } catch (error) {
                console.error('❌ Failed to generate image with remove object:', error);
            }
        }   
        await this.checkPointsAfterChat(15, pointBeforeChat); 
        await this.page.waitForTimeout(2000); 
    }



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async deleteGenerateImage_Object() {
        try {
            await this.page.getByRole('link', { name: 'Ask' }).click();
            await this.page.getByRole('link', { name: 'Assist' }).click();
            await this.page.getByText('Image', { exact: true }).click();
            await this.page.locator('#scrollableDiv').getByRole('img').click();
            await this.page.getByRole('button', { name: 'Confirm' }).click();
            console.log('✅ Delete Image');
    
        } catch (error) {
            console.error('❌ Failed to delete image:', error);
        }
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

}
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
