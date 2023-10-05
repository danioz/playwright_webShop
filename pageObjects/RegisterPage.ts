import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Register } from "./components/Register";
import { RegisterSuccess } from "./components/RegisterSuccess";

export class RegisterPage extends BasePage {
  readonly register: Register = new Register(this.page);
  readonly registerSuccess: RegisterSuccess = new RegisterSuccess(this.page);

  constructor(page: Page) {
    super(page);
  }
}
