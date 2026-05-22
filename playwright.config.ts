import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";
const isDefaultBase = !process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./tests/e2e",
  reporter: [["list"]],
  use: {
    baseURL,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  ...(isDefaultBase
    ? {
        webServer: {
          command: "pnpm dev",
          url: baseURL,
          timeout: 60_000,
          reuseExistingServer: !process.env.CI,
        },
      }
    : {}),
});
