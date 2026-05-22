import { test, expect } from "@playwright/test";

const staticRoutes = [
  "/privacy",
  "/terms",
  "/security",
  "/status",
  "/integrations",
  "/docs",
  "/changelog",
  "/cookies",
];

test.describe.parallel("static routes", () => {
  for (const route of staticRoutes) {
    test(`${route} responds 200 and renders a heading`, async ({ page }) => {
      const res = await page.goto(route);
      expect(res, `no response for ${route}`).not.toBeNull();
      expect(res!.status(), `${route} status`).toBe(200);
      const heading = page.locator("h1, h2").first();
      await expect(heading).toBeVisible();
    });
  }

  test("/this-does-not-exist returns 404 with a heading", async ({ page }) => {
    const res = await page.goto("/this-does-not-exist");
    expect(res).not.toBeNull();
    expect(res!.status()).toBe(404);
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });
});
