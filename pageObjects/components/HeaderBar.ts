import { expect, Page } from "@playwright/test";

export class HeaderBar {
  readonly logInLink = this.page.locator(".ico-login", { hasText: "Log in" });
  readonly logOutLink = this.page.locator(".ico-logout", {
    hasText: "Log out",
  });
  readonly registerLink = this.page.locator(".ico-register", {
    hasText: "Register",
  });
  readonly shoppingCartLink = this.page.locator("a.ico-cart > .cart-label", {
    hasText: "Shopping cart",
  });
  readonly categories = this.page.locator(
    ".block-category-navigation .list li"
  );
  readonly accountLink = this.page.locator(
    "div[class='header-links'] a[class='account']"
  );

  constructor(public readonly page: Page) {}

  async proceedToLogin(): Promise<void> {
    await this.logInLink.click();
  }

  async logOut(): Promise<void> {
    await this.logOutLink.click();
  }

  async proceedToRegister(): Promise<void> {
    await this.registerLink.click();
  }

  async proceedToShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async selectCategory(categoryName: string): Promise<void> {
    await this.categories.filter({ hasText: categoryName }).click();
  }

  async verifyLoggedUser(email: string): Promise<void> {
    await expect(this.accountLink).toHaveText(email);
  }
}
