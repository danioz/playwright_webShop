import { Locator, Page } from "@playwright/test";
import { UserInformation } from "../../model/user";

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

  async registerNewUser(userInformation: UserInformation): Promise<void> {
    switch (userInformation.gender) {
      case "male":
        await this.maleRadioButton.click();
        break;
      case "female":
        await this.femaleRadioButton.click();
        break;
      default:
        throw new Error("Gender field value is invalid.");
    }
    await this.firstNameTextBox.fill(userInformation.firstName);
    await this.lastNameTextBox.fill(userInformation.lastName);
    await this.emailTextBox.fill(userInformation.emailAddress);
    await this.passwordTextBox.fill(userInformation.password);
    await this.confirmPasswordTextBox.fill(userInformation.password);
    await this.registerButton.click();
  }
}
