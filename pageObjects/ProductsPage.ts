import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  readonly products: Locator;
  readonly productTitle: Locator;
  readonly nextButton: Locator;
  readonly quantityInput: Locator;
  readonly sizeList: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.products = page.locator(".product-item");
    this.productTitle = page.locator(".product-item>.details>h2.product-title");
    this.nextButton = page.locator("li[class='next-page'] a");
    this.quantityInput = page.locator("input.qty-input");
    this.sizeList = page.locator("select[id^='product_attribute_']");
    this.addToCartButton = page.locator("input[id^='add-to-cart-button-']");
  }

  async selectProduct(productName: string) {
    do {
      if (await this.isProductNameVisible(productName)) {
        await this.productTitle.filter({ hasText: productName }).click();
        break;
      } else {
        await this.nextButton.click();
      }
    } while (
      (await this.isProductNameVisible(productName)) ||
      (await this.nextButton.isVisible())
    );
  }

  async addQuantity(howMany: string) {
    await this.quantityInput.fill("");
    await this.quantityInput.fill(howMany);
  }

  async selectSize(sizeName: string) {
    switch (sizeName) {
      case "Large":
        await this.sizeList.selectOption("111");
        break;
      case "Small":
        await this.sizeList.selectOption("109");
        break;
      case "Medium":
        await this.sizeList.selectOption("110");
        break;
      default:
        throw new Error("Invalid size.");
    }
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async isProductNameVisible(productName: string) {
    return await this.productTitle.filter({ hasText: productName }).isVisible();
  }
}
