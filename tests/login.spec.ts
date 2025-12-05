import { test, expect } from "@playwright/test";
import LoginPage from "../page-objects/loginPage";

test("Successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    process.env.VALID_USERNAME!,
    process.env.VALID_PASSWORD!
  );
  await expect(page).toHaveURL(/.*inventory.html/);
});

test.describe("Invalid login attempts", () => {
  test("Login with invalid password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.VALID_USERNAME!,
      process.env.INVALID_PASSWORD!
    );
    await expect(loginPage.getErrorMessageLocator()).resolves.toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
      { useInnerText: true }
    );
    await expect(loginPage.isLogoVisible()).resolves.toBeTruthy();
  });

  test("Login with invalid username", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.INVALID_USERNAME!,
      process.env.VALID_PASSWORD!
    );
    await expect(loginPage.getErrorMessageLocator()).resolves.toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
      { useInnerText: true }
    );
    await expect(loginPage.isLogoVisible()).resolves.toBeTruthy();
  });

  test("Login with empty credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.clickLogin();
    await expect(loginPage.getErrorMessageLocator()).resolves.toHaveText(
      "Epic sadface: Username is required",
      { useInnerText: true }
    );
    await loginPage.fillUsername(process.env.VALID_USERNAME!);
    await loginPage.clickLogin();
    await expect(loginPage.getErrorMessageLocator()).resolves.toHaveText(
      "Epic sadface: Password is required",
      { useInnerText: true }
    );
    await expect(loginPage.isLogoVisible()).resolves.toBeTruthy();
  });
});

test.describe("Login Page UI Elements", () => {
  test("Check visibility of UI elements", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.isLogoVisible()).resolves.toBeTruthy();
    await expect(loginPage.getErrorMessageLocator()).resolves.toBeHidden();
    await expect(loginPage.isCredentialsSectionVisible()).resolves.toBeTruthy();
    await loginPage.clickLogin();
    await expect(loginPage.getErrorMessageLocator()).resolves.toBeVisible();
  });
});
