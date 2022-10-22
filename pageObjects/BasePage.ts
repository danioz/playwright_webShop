import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly url = "https://demowebshop.tricentis.com/";

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async openUrl() {
    await this.page.goto(this.url);
  }
}
