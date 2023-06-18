import { Page } from "@playwright/test";
import { HeaderBar } from "./components/HeaderBar";

export class BasePage {
  readonly page: Page;
  readonly headerBar: HeaderBar;

  readonly url = "https://demowebshop.tricentis.com/";

  constructor(page: Page) {
    this.page = page;
    this.headerBar = new HeaderBar(page);
  }

  async navigate(path: string) {
    await this.page.goto(path);
  }

  async openUrl() {
    await this.page.goto("");
  }
}
