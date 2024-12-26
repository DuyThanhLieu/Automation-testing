export const config = {
  //URL
  busaiUrl: 'https://gpt.busai.me/welcome',
  ssoUrl: 'https://sso.busai.me/auth',
  telegramAuthUrl: 'https://oauth.telegram.org/auth?bot_id=7098503440&origin=https%3A%2F%2Fsso.busai.me&request_access=true&return_to=https%3A%2F%2Fsso.busai.me%2Fauth',
  gptUrl: 'https://gpt.busai.me/welcome',

  //User/Pass
  phoneNumber: '339824931',

  //Cookies
  cookiesDir: './Cookies', 
  cookiesFile: 'cookies_busai_gpt.json', 
  cookiesFilePath: './Cookies/cookies_busai_gpt.json',

  //Get element on WEB
  Locator_GetPoint: 'button.bg-\\[\\#BBF229\\] p',

  //Input
  message1: 'Từ "Xin chào" trong tiếng anh có nghĩa là gì?',
  message2: 'Từ "Xin chào" trong tiếng hàn có nghĩa là gì?',

  //Verify
  expect_message1: 'Hello',
  expect_message2: '안녕하세요',
  expect_title_Docs: "/^PDF_1MB\.pdf$/",
  expect_text_Docs: 'The text provides a series of',
  expect_title_Audio: "/^file_example_MP3_700KB\.mp3$/",
  expect_text_Audio: 'The text is written in an',
  expect_title_Image_Summary: '/^Image_4KB\.png$/',
  expect_title_Image_RemoveObject: '/^Image_4KB\.png$/',
  expect_title_Image_RemoveText: '/^Image_2KB\.jpg$/',

  //Path on PC
  path_generateDocs: './Data/PDF_1MB.pdf',
  path_generateAudio: './Data/file_example_MP3_700KB.mp3',
  path_generateImage_Summary: './Data/Image_4KB.png',
  path_generateImage_RemoveObject: './Data/Image_4KB.png',
  path_generateImage_RemoveText: './Data/Image_2KB.jpg',
  

  //N/A
  chatPointSelector: 'span.font-bold.leading-none.text-black',
  
};


