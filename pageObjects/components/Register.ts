import { Page } from "@playwright/test";

export class Register {
  readonly maleRadioButton = this.page.locator("#gender-male");
  readonly femaleRadioButton = this.page.locator("#gender-female");
  readonly firstNameTextBox = this.page.locator("#FirstName");
  readonly lastNameTextBox = this.page.locator("#LastName");
  readonly emailTextBox = this.page.locator("#Email");
  readonly passwordTextBox = this.page.locator("#Password");
  readonly confirmPasswordTextBox = this.page.locator("#ConfirmPassword");
  readonly registerButton = this.page.locator("#register-button");

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
