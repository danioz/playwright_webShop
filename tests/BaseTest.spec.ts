import { test as base } from "@playwright/test";
import { HomePage } from "../pageObjects/HomePage";
import { RegisterPage } from "../pageObjects/RegisterPage";
import { LoginPage } from "../pageObjects/LoginPage";
import { ProductsPage } from "../pageObjects/ProductsPage";
import { ShoppingCartPage } from "../pageObjects/ShoppingCartPage";
import { CheckoutOrderPage } from "../pageObjects/CheckoutOrderPage";

// Declare the types of your fixtures.
type MyFixtures = {
  homePage: HomePage;
  registerPage: RegisterPage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  shoppingCartPage: ShoppingCartPage;
  checkoutOrderPage: CheckoutOrderPage;
};

// Extend base test by providing pages.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.openUrl();

    await use(homePage);
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },

  checkoutOrderPage: async ({ page }, use) => {
    await use(new CheckoutOrderPage(page));
  },
});

export { expect } from "@playwright/test";
