import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 1,
  workers: 1,
  reporter: [["line"], ["html", { outputFolder: "playwright-production-report", open: "never" }]],
  use: {
    baseURL: process.env.PRODUCTION_BASE_URL ?? "https://iaempleado.com",
    browserName: "chromium",
    colorScheme: "light",
    locale: "es-ES",
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "off",
  },
});
