import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Busai Music Actions', () => {
  test('Login with Telegram and Perform Actions', async ({ browser }) => {
    let page;

    await test.step('Login with Telegram', async () => {
      try {
        const cookies = JSON.parse(fs.readFileSync('./Cookies/cookies_busai_music.json', 'utf-8'));
        const context = await browser.newContext();
        await context.addCookies(cookies);
        page = await context.newPage();  
        await page.goto('https://music.busai.me/discover');
        // await page.waitForLoadState('networkidle');
        try {
            await page.getByText('✖').click();
        } catch (error) {
            console.log("No popup found to close.");
        }
        await page.getByRole('img', { name: '.' }).dblclick();
      } catch (error) {
        console.error('Error during login:', error);
      }
    });

    await test.step('Listen to 5 song', async () => {  
        await page.getByRole('link', { name: 'Top Music' }).click();
        await page.getByRole('link', { name: 'Magic Way to the Stars 🌟 (K-' }).click();  
        
        await page.getByRole('link', { name: 'Top Music' }).click();
        await page.getByRole('link', { name: 'I Just Bust A Nut In My Pants' }).click();

        await page.getByRole('link', { name: 'Top Music' }).click();
        await page.getByRole('link', { name: 'Crater Lullaby Panto' }).click();

        await page.getByRole('link', { name: 'Top Music' }).click();
        await page.getByRole('link', { name: 'Analog House dontcallmeBryan' }).click();

        await page.getByRole('link', { name: 'Top Music' }).click();
        await page.getByRole('link', { name: 'Spring Preppy_gurl' }).click();
    });
    
    await test.step('Test commenting and deleting', async () => {
        // // Hàm để comment và xóa
        // async function commentAndDelete(comment) {
        //     // Đảm bảo bạn chọn đúng phần tử textarea (thêm .first() hoặc .nth(index) nếu cần)
        //     const textarea = page.locator('//textarea[@title="Write a comment and press enter"]').first();
        //     await textarea.click();
        //     await textarea.fill(comment);
        //     await textarea.press('Enter');
            
        //     // Đợi phần tử xóa comment hiển thị trước khi click
        //     await page.waitForSelector('[title="Delete comment"]');
        //     await page.getByTitle('Delete comment').click();
        //     await page.getByRole('button', { name: 'Delete' }).click();
        // }
    
        // // Comment và xóa lần 1
        // await page.getByRole('link', { name: 'New Music' }).click();
        // await page.waitForLoadState('networkidle'); // Đợi trang tải xong
        // await page.locator('.cover_art > a').first().click();
        // await commentAndDelete('Comment 1\n\n');
    
        // // Comment và xóa lần 2
        // await page.getByRole('link', { name: 'New Music' }).click();
        // await page.waitForLoadState('networkidle');
        // await page.locator('div:nth-child(2) > .track_list > .track > .cover_art > a').click();
        // await commentAndDelete('Comment 2\n\n');
    
        // // Comment và xóa lần 3
        // await page.getByRole('link', { name: 'New Music' }).click();
        // await page.waitForLoadState('networkidle');
        // await page.locator('div:nth-child(3) > .track_list > .track > .cover_art > a').first().click();
        // await commentAndDelete('Comment 3');

        //  // Comment và xóa lần 4
        //  await page.getByRole('link', { name: 'New Music' }).click();
        //  await page.waitForLoadState('networkidle');
        //  await page.locator('div:nth-child(4) > .track_list > .track > .cover_art > a').first().click();
        //  await commentAndDelete('Comment 4');

        //   // Comment và xóa lần 5
        // await page.getByRole('link', { name: 'New Music' }).click();
        // await page.waitForLoadState('networkidle');
        // await page.locator('div:nth-child(5) > .track_list > .track > .cover_art > a').first().click();
        // await commentAndDelete('Comment 5');
    });
    

    await test.step('Upload a song *', async () => {           
    });

    await test.step('Replying to a comment', async () => {  
    
    });

    await test.step('Like 5 track', async () => { 
        await page.getByRole('link', { name: 'New Music' }).click();
        await page.locator('.cover_art > a').first().click();
        await page.getByRole('button', { name: 'Like', exact: true }).click();
        await page.getByRole('button', { name: 'Liked' }).click();   

        await page.getByRole('link', { name: 'New Music' }).click();
        await page.locator('div:nth-child(2) > .track_list > .track > .cover_art > a').click();
        await page.getByRole('button', { name: 'Like', exact: true }).click();
        await page.getByRole('button', { name: 'Liked' }).click();

        await page.getByRole('link', { name: 'New Music' }).click();
        await page.locator('div:nth-child(3) > .track_list > .track > .cover_art > a').first().click();
        await page.getByRole('button', { name: 'Like', exact: true }).click();
        await page.getByRole('button', { name: 'Liked' }).click();

        await page.getByRole('link', { name: 'New Music' }).click();
        await page.locator('div:nth-child(4) > .track_list > .track > .cover_art > a').first().click();
        await page.getByRole('button', { name: 'Like', exact: true }).click();
        await page.getByRole('button', { name: 'Liked' }).click();

        await page.getByRole('link', { name: 'New Music' }).click();
        await page.locator('div:nth-child(5) > .track_list > .track > .cover_art > a').first().click();
        await page.getByRole('button', { name: 'Like', exact: true }).click();
        await page.getByRole('button', { name: 'Liked' }).click();

    });

    await test.step('Report a comment (admin approves) *', async () => {           
    });

    await test.step('Update your profile cover *', async () => {           
    });

    await test.step('Report a track (admin approves) *', async () => {           
    });

    await test.step('Import a song *', async () => {           
    });

    await test.step('Dislike 5 track', async () => {  
        await page.getByRole('link', { name: 'Top Music' }).click();
        await page.getByRole('link', { name: 'Magic Way to the Stars 🌟 (K-' }).click();
        await page.getByRole('button', { name: 'DisLike' }).click();
        await page.getByRole('button', { name: 'Disliked' }).click();  

        await page.getByRole('link', { name: 'Top Music' }).click();
        await page.getByRole('link', { name: 'I Just Bust A Nut In My Pants' }).click();
        await page.getByRole('button', { name: 'DisLike' }).click();
        await page.getByRole('button', { name: 'Disliked' }).click();

        await page.getByRole('link', { name: 'Top Music' }).click();
        await page.getByRole('link', { name: 'Crater Lullaby Panto' }).click();
        await page.getByRole('button', { name: 'DisLike' }).click();
        await page.getByRole('button', { name: 'Disliked' }).click();

        await page.getByRole('link', { name: 'Top Music' }).click();
        await page.getByRole('link', { name: 'Analog House dontcallmeBryan' }).click();
        await page.getByRole('button', { name: 'DisLike' }).click();
        await page.getByRole('button', { name: 'Disliked' }).click();

        await page.getByRole('link', { name: 'Top Music' }).click();
        await page.getByRole('link', { name: 'Spring Preppy_gurl' }).click();
        await page.getByRole('button', { name: 'DisLike' }).click();
        await page.getByRole('button', { name: 'Disliked' }).click();
        
    });

    await test.step('Like a comment', async () => {           
    });


    await test.step('Re-post a track', async () => {   
        // await page.getByRole('link', { name: 'Top Music' }).click();
        // await page.locator('//li[h4[text()="Nose Dive | Electric No-Lyric"]]')[1].click();
        // await page.getByRole('button', { name: 'Re Post' }).click();
        // await expect(page.getByLabel('Your post has been').locator('path')).toBeVisible();

        // await page.getByRole('link', { name: 'Top Music' }).click();
        // await page.locator('//li[h4[text()="sushi in the Kitchen"]]')[0].click();
        // await page.getByRole('button', { name: 'Re Post' }).click();
        // await expect(page.getByLabel('Your post has been').locator('path')).toBeVisible();

        // await page.getByRole('link', { name: 'Top Music' }).click();
        // await page.locator('//li[h4[text()="Supercalifragilisticexpialidocious"]]')[0].click();
        // await page.getByRole('button', { name: 'Re Post' }).click();
        // await expect(page.getByLabel('Your post has been').locator('path')).toBeVisible();

        // await page.getByRole('link', { name: 'Top Music' }).click();
        // await page.locator('//li[h4[text()="Yogi Music | Pop"]]')[0].click();
        // await page.getByRole('button', { name: 'Re Post' }).click();
        // await expect(page.getByLabel('Your post has been').locator('path')).toBeVisible();

        // await page.getByRole('link', { name: 'Top Music' }).click();
        // await page.locator('//li[h4[text()="Love Dose"]]')[0].click();
        // await page.getByRole('button', { name: 'Re Post' }).click();
        // await expect(page.getByLabel('Your post has been').locator('path')).toBeVisible();

    });

    await test.step('Create new playlist *', async () => {  
                 
    });

    await test.step('Download a track', async () => {    
        // await page.getByRole('link', { name: 'Top Music' }).click();
        // await page.getByRole('link', { name: 'Magic Way to the Stars 🌟 (K-' }).click();
        // const downloadPromise = page.waitForEvent('download');
        // await page.getByRole('link', { name: 'Download' }).click();
        // const download = await downloadPromise;

        // await page.getByRole('link', { name: 'Top Music' }).click();
        // await page.getByRole('link', { name: 'I Just Bust A Nut In My Pants' }).click();
        // const download1Promise = page.waitForEvent('download');
        // await page.getByRole('link', { name: 'Download' }).click();
        // const download1 = await download1Promise;

        // await page.getByRole('link', { name: 'Top Music' }).click();
        // await page.getByRole('link', { name: 'Crater Lullaby Panto' }).click();
        // const download2Promise = page.waitForEvent('download');
        // await page.getByRole('link', { name: 'Download' }).click();
        // const download2 = await download2Promise;

        // await page.getByRole('link', { name: 'Top Music' }).click();
        // await page.getByRole('link', { name: 'Analog House dontcallmeBryan' }).click();
        // const download3Promise = page.waitForEvent('download');
        // await page.getByRole('link', { name: 'Download' }).click();
        // const download3 = await download3Promise;

        // await page.getByRole('link', { name: 'Top Music' }).click();
        // await page.getByRole('link', { name: 'Spring Preppy_gurl' }).click();
        // const download4Promise = page.waitForEvent('download');
        // await page.getByRole('link', { name: 'Download' }).click();
        // const download4 = await download4Promise;       
    });

    await test.step('Add track to a playlist *', async () => {           
    });

  });
});