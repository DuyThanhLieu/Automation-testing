// @ts-check
import { defineConfig, devices } from '@playwright/test';
// const fs = require('fs');
// const path = require('path');
// const { defineConfig, devices } = require('@playwright/test');


const COLORS = {
  YELLOW: '\x1b[33m',
  GREEN: '\x1b[32m',
  RED: '\x1b[31m',
  RESET: '\x1b[0m'
};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './Tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0, // 0 trên CI, 2 lần retry khi chạy local
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  reporter: [['html', { outputFolder: 'playwright-report', open: 'always' }]],
  timeout: 500000, // Set default timeout to 60 seconds
 


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    headless: true,
    args: ['--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox'],
    video: 'on', // Đảm bảo video được bật
    trace: 'on',
    screenshot: 'on',
    
    launchOptions: {
      slowMo: 1000, // Giảm tốc độ của trình duyệt
    },
    viewport: { width: 1366, height: 768 },
    pathGenerateDocs: process.env.PATH_GENERATE_DOCS || 'D:/Automation/Playwright/Data/PDF_1MB.pdf',
    pathGenerateAudio: process.env.PATH_GENERATE_AUDIO || 'D:/Automation/Playwright/Data/file_example_MP3_700KB.MP3',
    pathGenerateImageSummary: process.env.PATH_GENERATE_IMAGE_SUMMARY || 'D:/Automation/Playwright/Data/Image_4KB.PNG',
    pathGenerateImageRemoveObject: process.env.PATH_GENERATE_IMAGE_REMOVE_OBJECT || 'D:/Automation/Playwright/Data/Image_4KB.PNG',
    pathGenerateImageRemoveText: process.env.PATH_GENERATE_IMAGE_REMOVE_TEXT || 'D:/Automation/Playwright/Data/Image_2KB.JPG',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on-first-retry',
  },






  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     headless: true,
    //     recordVideo: {
    //       dir: 'Videos/',
    //       size: { width: 800, height: 600 },
    //     },
    //   },
    // },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 } },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

