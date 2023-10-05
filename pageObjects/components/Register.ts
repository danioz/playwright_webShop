import { Locator, Page } from "@playwright/test";

export class Register {
  readonly maleRadioButton: Locator = this.page.locator("#gender-male");
  readonly femaleRadioButton: Locator = this.page.locator("#gender-female");
  readonly firstNameTextBox: Locator = this.page.locator("#FirstName");
  readonly lastNameTextBox: Locator = this.page.locator("#LastName");
  readonly emailTextBox: Locator = this.page.locator("#Email");
  readonly passwordTextBox: Locator = this.page.locator("#Password");
  readonly confirmPasswordTextBox: Locator = this.page.locator("#ConfirmPassword");
  readonly registerButton: Locator = this.page.locator("#register-button");

  constructor(public readonly page: Page) {}

  async registerNewUser(
    gender: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<void> {
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
}
