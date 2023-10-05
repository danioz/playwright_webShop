import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ReturningCustomer } from "./components/ReturningCustomer";

export class LoginPage extends BasePage {
  readonly returningCustomer = new ReturningCustomer(this.page);
  constructor(page: Page) {
    super(page);
  }
}
