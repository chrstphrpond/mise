import { test, expect } from "@playwright/test";

test.describe.parallel("home page", () => {
  test("page title contains Mise", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Mise/i);
  });

  test("hero H1 contains 'Smarter F&B Operations'", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Smarter F&B Operations");
  });

  test("navbar Solution link is visible", async ({ page }) => {
    await page.goto("/");
    // Target the navbar specifically — there can be matching footer text.
    const nav = page.locator("nav, header").first();
    await expect(
      nav.getByRole("link", { name: /^Solution$/ }).first(),
    ).toBeVisible();
  });

  test("clicking Pricing in navbar updates URL to #pricing", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.locator("nav, header").first();
    await nav
      .getByRole("link", { name: /^Pricing$/ })
      .first()
      .click();
    await expect(page).toHaveURL(/#pricing/);
  });

  test("pricing section renders Starter, Growth, Enterprise", async ({
    page,
  }) => {
    await page.goto("/#pricing");
    for (const plan of ["Starter", "Growth", "Enterprise"]) {
      await expect(
        page.getByRole("heading", { name: new RegExp(`^${plan}$`, "i") }).first(),
      ).toBeVisible();
    }
  });
});
