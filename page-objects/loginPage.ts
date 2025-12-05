import { Locator, Page } from "@playwright/test";

class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly logo: Locator;
  private readonly credentialsSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.locator("//*[@id='login-button']");
    this.errorMessage = page.getByTestId("error");
    this.logo = page.locator("//div[@class='login_logo']");
    this.credentialsSection = page.getByTestId("login-credentials");
  }

  async goto() {
    await this.page.goto("/");
  }

  async fillUsername(username: string) {
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async getErrorMessageLocator() {
    return this.errorMessage;
  }

  async isLogoVisible() {
    return this.logo.isVisible();
  }

  async isCredentialsSectionVisible() {
    return this.credentialsSection.isVisible();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}

export default LoginPage;
