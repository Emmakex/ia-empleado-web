import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/phase8g-iphone-webkit-emulation.spec.ts"],
  timeout: 60_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI
    ? [["line"], ["html", { outputFolder: "playwright-phase8g-iphone-report", open: "never" }]]
    : [["list"], ["html", { outputFolder: "playwright-phase8g-iphone-report", open: "never" }]],
  use: {
    ...devices["iPhone 13"],
    baseURL: "http://127.0.0.1:3100",
    colorScheme: "light",
    locale: "es-ES",
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "off",
  },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
