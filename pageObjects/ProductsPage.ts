import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  readonly products: Locator = this.page.locator(".product-item");
  readonly productTitle: Locator = this.page.locator(
    ".product-item>.details>h2.product-title"
  );
  readonly nextButton: Locator = this.page.locator("li[class='next-page'] a");
  readonly quantityInput: Locator = this.page.locator("input.qty-input");
  readonly sizeList: Locator = this.page.locator("select[id^='product_attribute_']");
  readonly addToCartButton: Locator = this.page.locator(
    "input[id^='add-to-cart-button-']"
  );

  constructor(page: Page) {
    super(page);
  }

  async selectProduct(productName: string): Promise<void> {
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

  async addQuantity(howMany: string): Promise<void> {
    await this.quantityInput.fill("");
    await this.quantityInput.fill(howMany);
  }

  async selectSize(sizeName: string): Promise<void> {
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

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async isProductNameVisible(productName: string): Promise<boolean> {
    return await this.productTitle.filter({ hasText: productName }).isVisible();
  }
}
