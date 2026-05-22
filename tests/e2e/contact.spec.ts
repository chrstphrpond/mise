import { test, expect } from "@playwright/test";

test.describe("contact form", () => {
  test("submits successfully and clears the form", async ({ page }) => {
    await page.goto("/contact");

    const firstName = page.getByLabel("First Name");
    const lastName = page.getByLabel("Business Name");
    const email = page.getByLabel("Email Address");
    const phone = page.getByLabel("Phone Number");
    const message = page.getByLabel("Message");
    const businessType = page.getByLabel("Business Type");
    const locations = page.getByLabel("Number of Locations");

    await firstName.fill("Test User");
    await lastName.fill("Acme Cafe");
    await email.fill("playwright@example.com");
    await phone.fill("0400000000");
    await message.fill("This is an automated Playwright smoke test.");
    await businessType.selectOption({ label: "Restaurant" });
    await locations.selectOption({ label: "2-5" });

    await page.getByRole("button", { name: /send message/i }).click();

    // Success copy from ContactForm.tsx:
    // "Got it — Maria from the team will reply within 4 business hours."
    // Scope to the aria-live status region so we don't collide with marketing
    // copy that also mentions "within 4 business hours".
    const status = page.locator('[aria-live="polite"]');
    await expect(status).toContainText(/Got it/i, { timeout: 5_000 });

    // Form fields should clear after success.
    await expect(firstName).toHaveValue("");
    await expect(lastName).toHaveValue("");
    await expect(email).toHaveValue("");
    await expect(phone).toHaveValue("");
    await expect(message).toHaveValue("");
  });
});
