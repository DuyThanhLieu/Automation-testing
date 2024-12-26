// /Pages/Friendify/FD_Actions.js
import { config } from '../../Utils/FD_config';
import { expect } from '@playwright/test';

export class ActionsPage {
  constructor(page) {
    this.page = page;
    this.chatPointSelector = config.chatPointSelector;
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////                  FUNCTION                //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async loginWithAccount() {
    await this.page.goto(config.url);
    await this.page.getByText('Login').click();
    await this.page.getByPlaceholder('Email...').fill(config.email);
    await this.page.getByPlaceholder('Password...').fill(config.password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await expect(this.page).toHaveTitle('Friendify GPT - Your AI Personal Assistant');
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////                 TEST CASE                //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async performFirstChat() {
    const pointBeforeFirstChat = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
    console.log('Point before first chat: ', pointBeforeFirstChat);

    await this.page.getByText('AskContactChatFeedAssist').first().click();
    await this.page.getByRole('link', { name: 'Ask' }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: 'AI Chat GPT Start new chat' }).click();
    await this.page.getByText('AI Chat GPTNew chat').click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: 'New chat' }).click();
    await this.page.getByPlaceholder('Type something...').fill(config.message_chat1);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(2000);

    await expect(this.page.getByText(config.expect_message1)).toBeVisible();

    const pointAfterFirstChat = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
    console.log('Point of Speed after first chat: ', pointAfterFirstChat);

    const totalPointUsedFirstChat = pointBeforeFirstChat - pointAfterFirstChat;
    console.log('Total of Speed points used after first chat: ', totalPointUsedFirstChat);

    if (totalPointUsedFirstChat === 1) {
      console.log('The points decreased correctly by 1 after the first chat.');
    } else {
      console.log('The points did not decrease correctly after the first chat.');
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async performSecondChat() {
    const pointBeforeSecondChat = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
    console.log('Point before second chat: ', pointBeforeSecondChat);

    await this.page.getByRole('link', { name: 'New chat' }).click();
    await this.page.getByRole('switch', { name: 'Speed Intelligent' }).click();
    await this.page.getByPlaceholder('Type something...').fill(config.message_chat2);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(2000);

    await expect(this.page.getByText(config.expect_message2)).toBeVisible();

    const pointAfterSecondChat = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
    console.log('Point of Intelligent after second chat: ', pointAfterSecondChat);

    const totalPointUsedSecondChat = pointBeforeSecondChat - pointAfterSecondChat;
    console.log('Total of Intelligent points used after second chat: ', totalPointUsedSecondChat);

    if (totalPointUsedSecondChat === 1) {
      console.log('The points decreased correctly by 1 after the second chat.');
    } else {
      console.log('The points did not decrease correctly after the second chat.');
    }
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
}
