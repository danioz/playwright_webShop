import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import {ReturningCustomer} from "./components/ReturningCustomer";

export class LoginPage extends BasePage {

  readonly returningCustomer: ReturningCustomer;
  constructor(page: Page) {
    super(page);
    this.returningCustomer = new ReturningCustomer(page);
  }
}
