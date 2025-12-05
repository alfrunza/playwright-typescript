import { chromium, selectors, FullConfig } from "@playwright/test";
import LoginPage from "../page-objects/loginPage";

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  selectors.setTestIdAttribute("data-test");
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  //   await page.goto(baseURL!);
  const loginPage = new LoginPage(page);
  console.log("In global setup");
  await loginPage.goto();

  await loginPage.login(
    process.env.VALID_USERNAME!,
    process.env.VALID_PASSWORD!
  );

  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
