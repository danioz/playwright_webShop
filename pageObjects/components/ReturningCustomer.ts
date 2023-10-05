import { expect, Locator, Page } from "@playwright/test";

export class ReturningCustomer {
  readonly emailTextBox = this.page.locator("#Email");
  readonly passwordTextBox = this.page.locator("#Password");
  readonly loginButton = this.page.locator(".login-button");

  constructor(public readonly page: Page) {}

  async logInToApplication(login: string, password: string): Promise<void> {
    await this.emailTextBox.waitFor({ state: "visible" });
    await this.emailTextBox.fill(login);
    await this.passwordTextBox.fill(password);
    await this.loginButton.click();
  }
}
