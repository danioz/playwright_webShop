import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Register } from "./components/Register";
import {RegisterSuccess} from "./components/RegisterSuccess";

export class RegisterPage extends BasePage {
  readonly register: Register;
  readonly registerSuccess: RegisterSuccess;

  constructor(page: Page) {
    super(page);
    this.register = new Register(page)
    this.registerSuccess = new RegisterSuccess(page);
  }
}
