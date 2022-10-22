import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
  readonly maleRadioButton: Locator;
  readonly femaleRadioButton: Locator;
  readonly firstNameTextBox: Locator;
  readonly lastNameTextBox: Locator;
  readonly emailTextBox: Locator;
  readonly passwordTextBox: Locator;
  readonly confirmPasswordTextBox: Locator;
  readonly registerButton: Locator;
  readonly registerNotification: Locator;
  readonly accountLink: Locator;

  constructor(page: Page) {
    super(page);
    this.maleRadioButton = page.locator("#gender-male");
    this.femaleRadioButton = page.locator("#gender-female");
    this.firstNameTextBox = page.locator("#FirstName");
    this.lastNameTextBox = page.locator("#LastName");
    this.emailTextBox = page.locator("#Email");
    this.passwordTextBox = page.locator("#Password");
    this.confirmPasswordTextBox = page.locator("#ConfirmPassword");
    this.registerButton = page.locator("#register-button");
    this.registerNotification = page.locator(".result");
    this.accountLink = page.locator(
      "div[class='header-links'] a[class='account']"
    );
  }

  async registerNewUser(
    gender: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    switch (gender) {
      case "M":
        await this.maleRadioButton.click();
        break;
      case "F":
        await this.femaleRadioButton.click();
        break;
      default:
        throw new Error("Gender field value is invalid.");
    }
    await this.firstNameTextBox.fill(firstName);
    await this.lastNameTextBox.fill(lastName);
    await this.emailTextBox.fill(email);
    await this.passwordTextBox.fill(password);
    await this.confirmPasswordTextBox.fill(confirmPassword);
    await this.registerButton.click();
  }

  async verifyRegistrationCompletion(newEmail: string) {
    await expect(this.registerNotification).toHaveText(
      "Your registration completed"
    );
    await expect(this.accountLink).toHaveText(newEmail);
  }
}
