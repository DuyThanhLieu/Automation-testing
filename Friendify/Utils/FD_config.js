
export const config = {
  //URL
  signupUrl: 'https://app.friendify.ai/auth/signup',
  loginUrl: 'https://app.friendify.ai/auth/login',
  url: 'https://friendify.ai/',

  //Login
  email: 'khauntc@gmail.com',
  password: 'Chaukhau2000!',
  googleEmail: 'chaukhau2000@playgroundvina.com',
  googlePassword: 'Khautester111222!',
  
  //Register
  defaultPassword: 'Tester25082024',
  referralCode: 'FSPEZTEF',

  //Cookies
  cookiesDir: './Cookies',
  cookiesFile: 'cookies_friendify.json',

  //Lop for
  numberOfIterations: 1, 
  chatPointSelector: 'button p', 
  
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
  
};
