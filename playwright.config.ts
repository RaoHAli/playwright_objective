import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  
 // fullyParallel: true, //Run tests in files in parallel

  forbidOnly: !!process.env.CI,
 
  retries: process.env.CI ? 2 : 0, //Retry on CI only

  workers: process.env.CI ? 1 : undefined, //Opt out of parallel tests on CI.
 
  use: {
    baseURL: 'https://www.saucedemo.com/',

    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

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

    //Test against branded browsers. 
    //  {
    //    name: 'Microsoft Edge',
    //    use: { ...devices['Desktop Edge'], channel: 'msedge' },
    //  },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],


});
