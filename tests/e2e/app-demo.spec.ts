import { test, expect } from "@playwright/test";

test.describe("/app demo flow", () => {
  test("redirects to welcome, enters demo, navigates to menu and orders", async ({
    page,
  }) => {
    // 1. Visiting /app without the demo cookie should redirect to /app/welcome.
    const response = await page.goto("/app");
    expect(response).toBeTruthy();
    await expect(page).toHaveURL(/\/app\/welcome$/);
    await expect(
      page.getByRole("heading", { name: /working slice of the mise back office/i }),
    ).toBeVisible();

    // 2. Click "Enter demo" to set the cookie and land on /app/today.
    await page.getByRole("button", { name: /enter demo/i }).click();
    await expect(page).toHaveURL(/\/app\/today$/);
    await expect(
      page.getByRole("heading", { name: /^today$/i }),
    ).toBeVisible();

    // Today page shows the stat cards.
    await expect(page.getByText(/today's revenue/i)).toBeVisible();
    await expect(page.getByText(/channel mix/i)).toBeVisible();

    // 3. Navigate to /app/menu and verify at least 5 seeded items.
    await page.getByRole("link", { name: /menu/i }).click();
    await expect(page).toHaveURL(/\/app\/menu$/);
    await expect(page.getByText("Cappuccino")).toBeVisible();

    // Count items on the menu page (each item row has a price string $X.XX).
    const priceCount = await page
      .locator("text=/\\$\\d+\\.\\d{2}/")
      .count();
    expect(priceCount).toBeGreaterThanOrEqual(5);

    // 4. Add a new menu item via the dialog.
    await page.getByRole("button", { name: /add item/i }).click();
    const nameInput = page.getByLabel(/^name$/i);
    await nameInput.fill("Test Espresso");
    await page.getByLabel(/^category$/i).fill("Coffee & Beverages");
    await page.getByLabel(/price/i).fill("3.25");
    await page.getByLabel(/^stock$/i).fill("50");
    await page
      .locator('div[role="dialog"], .fixed >> button[type="submit"]')
      .first()
      .click()
      .catch(async () => {
        // Fallback selector: any submit button in the open modal.
        await page.getByRole("button", { name: /^add item$/i }).last().click();
      });
    await expect(page.getByText("Test Espresso")).toBeVisible({
      timeout: 5000,
    });

    // 5. Navigate to /app/orders and simulate an order.
    await page.getByRole("link", { name: /orders/i }).click();
    await expect(page).toHaveURL(/\/app\/orders$/);

    const beforeCards = await page.locator("article").count();
    await page.getByRole("button", { name: /simulate order/i }).click();

    await expect
      .poll(async () => page.locator("article").count(), { timeout: 5000 })
      .toBeGreaterThan(beforeCards);

    // The newest card should display "open" status.
    await expect(
      page.locator("article").first().getByText(/open/i),
    ).toBeVisible();
  });
});
