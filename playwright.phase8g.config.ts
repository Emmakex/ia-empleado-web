import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "phase8g-cross-browser.spec.ts",
  timeout: 45_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: process.env.CI
    ? [["line"], ["html", { outputFolder: "playwright-phase8g-report", open: "never" }]]
    : [["list"], ["html", { outputFolder: "playwright-phase8g-report", open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3100",
    colorScheme: "light",
    locale: "es-ES",
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "off",
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], browserName: "chromium" },
    },
    {
      name: "firefox-desktop",
      use: { ...devices["Desktop Firefox"], browserName: "firefox" },
    },
    {
      name: "webkit-desktop",
      use: { ...devices["Desktop Safari"], browserName: "webkit" },
    },
    {
      name: "android-chromium-profile",
      use: { ...devices["Pixel 5"], browserName: "chromium" },
    },
    {
      name: "ios-webkit-profile",
      use: { ...devices["iPhone 13"], browserName: "webkit" },
    },
  ],
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
