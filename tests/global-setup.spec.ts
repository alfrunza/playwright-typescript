import test, { chromium, selectors, FullConfig } from "@playwright/test";
import LoginPage from "../page-objects/loginPage";

test("global setup", async ({ page }) => {
  selectors.setTestIdAttribute("data-test");
  const browser = await chromium.launch({ headless: false });
  //   await page.goto(baseURL!);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  console.log("In global setup");

  await loginPage.login(
    process.env.VALID_USERNAME!,
    process.env.VALID_PASSWORD!
  );

  await page.context().storageState({ path: "state.json" });
  await browser.close();
});
