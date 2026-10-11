import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["html", {
      outputFolder: "playwright-report",
      open: "never",
    }],
  ],

  outputDir: "test-results",

  projects: [
    {
      name: "api",
      testMatch: "**/restful_booker/**/*.spec.ts",
      use: {
        baseURL: "https://restful-booker.herokuapp.com",
        trace: "retain-on-failure",
      },
    },

    {
      name: "saucedemo",
      testMatch: "**/sauce_demo/**/*.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://www.saucedemo.com/",
        trace: "retain-on-failure",
      },
    },
  ],
});