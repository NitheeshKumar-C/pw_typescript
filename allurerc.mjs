import { defineConfig } from "allure";

export default defineConfig({
  name: "Playwright Test Report",
  output: "./allure-report",
  plugins: {
    awesome: {
      options: {
        theme: "light",
        reportLanguage: "en",
      },
    },
  },
});