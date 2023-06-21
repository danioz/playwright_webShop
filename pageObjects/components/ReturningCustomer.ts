import { expect, Locator, Page } from "@playwright/test";

export class ReturningCustomer {
    readonly emailTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.emailTextBox = page.locator("#Email");
        this.passwordTextBox = page.locator("#Password");
        this.loginButton = page.locator(".login-button");
    }

    async logInToApplication(login: string, password: string): Promise<void> {
        await this.emailTextBox.waitFor({ state: "visible" });
        await this.emailTextBox.fill(login);
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
    }
}
