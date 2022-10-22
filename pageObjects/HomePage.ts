import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly logInLink: Locator;
  readonly logOutLink: Locator;
  readonly registerLink: Locator;
  readonly shoppingCartLink: Locator;
  readonly categories: Locator;
  readonly accountLink: Locator;

  constructor(page: Page) {
    super(page);
    this.logInLink = page.locator(".ico-login", { hasText: "Log in" });
    this.logOutLink = page.locator(".ico-logout", { hasText: "Log out" });
    this.registerLink = page.locator(".ico-register", { hasText: "Register" });
    this.shoppingCartLink = page.locator("a.ico-cart > .cart-label", {
      hasText: "Shopping cart",
    });
    this.categories = page.locator(".block-category-navigation .list li");
    this.accountLink = page.locator(
      "div[class='header-links'] a[class='account']"
    );
  }

  async proceedToLogin() {
    await this.logInLink.click();
  }

  async logOUt() {
    await this.logOutLink.click();
  }

  async proceedToRegister() {
    await this.registerLink.click();
  }

  async proceedToShoppingCart() {
    await this.shoppingCartLink.click();
  }

  async selectCategory(categoryName: string) {
    await this.categories.filter({ hasText: categoryName }).click();
  }

  async verifyLoggedUser(email: string) {
    await expect(this.accountLink).toHaveText(email);
  }
}
