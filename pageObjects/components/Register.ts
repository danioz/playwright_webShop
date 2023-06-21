import { expect, Locator, Page } from "@playwright/test";

export class Register {
    readonly maleRadioButton: Locator;
    readonly femaleRadioButton: Locator;
    readonly firstNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly emailTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly confirmPasswordTextBox: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        this.maleRadioButton = page.locator("#gender-male");
        this.femaleRadioButton = page.locator("#gender-female");
        this.firstNameTextBox = page.locator("#FirstName");
        this.lastNameTextBox = page.locator("#LastName");
        this.emailTextBox = page.locator("#Email");
        this.passwordTextBox = page.locator("#Password");
        this.confirmPasswordTextBox = page.locator("#ConfirmPassword");
        this.registerButton = page.locator("#register-button");
    }

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
