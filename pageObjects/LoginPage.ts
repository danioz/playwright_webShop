import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly emailTextBox: Locator;
  readonly passwordTextBox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailTextBox = page.locator("#Email");
    this.passwordTextBox = page.locator("#Password");
    this.loginButton = page.locator(".login-button");
  }

  async logInToApplication(login: string, password: string) {
    await this.emailTextBox.waitFor({ state: "visible" });
    await this.emailTextBox.fill(login);
    await this.passwordTextBox.fill(password);
    await this.loginButton.click();
  }
}
