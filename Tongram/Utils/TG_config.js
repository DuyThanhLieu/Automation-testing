// /Utils/TG_config.js
export const config = {
  //URL
  tongramUrl: 'https://tongram.app/en',
  CMSUrl: 'https://admin.tongram.app/admin/login',
  telegramAuthUrl: 'https://oauth.telegram.org/auth?bot_id=7241997507&origin=https%3A%2F%2Ftongram.app&request_access=true&return_to=https%3A%2F%2Ftongram.app%2Fen',
  
  //ACCOUNT
  phoneNumber: '339824931',
  cookiesDir: './Cookies',
  cookiesFile: 'cookies_tongram.json',
  point_Home: 'span.font-semibold.whitespace-nowrap',
  chatPointSelector: 'span.font-bold.leading-none.text-black',
  CMSUser: 'khauntc2000@gmail.com',
  CMSPassword: 'khauntc2000@gmail.com',

  //CSS HTML Current
  Point_1: "(//span[@class='whitespace-nowrap font-semibold'])[1]",
  Point_2: "(//p[@class='text-[28px] font-bold text-[#111111] md:text-3xl'])",
  Point_3: "//span[contains(text(), 'TOTAL EARNED')]",
  Earn_DailyLogin: "//div[contains(@class, 'flex flex-row items-center justify-between rounded-[20px]')]",

  Stars_5: 'body > main > section.mt-8.flex.flex-col.gap-y-6.pt-6 > div.flex.flex-col.gap-y-4 > div:nth-child(1) > div > div > div > svg:nth-child(5)',

  Claim_Xpath: 'button:has-text("Claim")',
  Complete_Xpath: 'img[alt="Complete"]',
  

  //Data Input
  Search_Query_1: 'PISTON',
  Search_Query_Data_1: 'PISTON Hub PISTON Hub PISTON',
  Verify_Search_Query_1: 'PISTON Hub',

  Search_Query_2: 'Hamster',
  Search_Query_Data_2: 'Hamster Hamster Hello!',
  Verify_Search_Query_2: 'PISTON Hub',

  Search_Query_3: 'Pizza',
  Search_Query_Data_3: 'PizzaTon PizzaTon PizzaTon',
  Verify_Search_Query_3: 'PizzaTon',

  Search_Query_4: 'Watchlist Topup',
  Search_Query_Data_4: 'Watchlist Topup Watchlist',
  Verify_Search_Query_4: 'Watchlist Topup',

  Search_Query_5: 'TapTap',
  Search_Query_Data_5: 'TapTap TapTap Backed by iMe,',
  Verify_Search_Query_5: 'TapTap',
  
  Search_Query_6: 'Farm',
  Search_Query_Data_6: 'PISTON Farm PISTON Farm Tap',
  Verify_Search_Query_6: 'PISTON Farm',
  Click_Open_Game_6: 'PISTON FarmGrow your super',
  Click_Share_Game_6: 'PISTON Farm PISTON Farm Tap',
  Comment_Game_6: 'PISTON Farm PISTON Farm Tap',

  Content_Comment_Game: 'I see it verry good for me, so i will play everyday',

};
