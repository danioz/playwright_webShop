import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ShoppingCartPage extends BasePage {
  readonly firstProductUnitPrice = this.page.locator(
    "tr.cart-item-row:first-child span.product-unit-price"
  );
  readonly firstProductQuantity = this.page.locator(
    "tr.cart-item-row:first-child input[class='qty-input']"
  );
  readonly termOfServiceCheckbox = this.page.locator("#termsofservice");
  readonly checkoutButton = this.page.locator("#checkout");
  readonly subTotalPrice = this.page.locator(
    "//span[.='Sub-Total:']/ancestor::tr//span[@class='product-price']"
  );
  readonly removeFromCartFirstCheckbox = this.page.locator(
    "tr.cart-item-row:first-child input[name='removefromcart']"
  );
  readonly updateShoppingCartButton = this.page.locator(
    "input[value='Update shopping cart']"
  );
  readonly firstCartItemRow = this.page.locator("tr.cart-item-row:first-child");
  readonly cartItems = this.page.locator("tr.cart-item-row");

  constructor(page: Page) {
    super(page);
  }

  async verifySubTotalPrice(): Promise<void> {
    const unitPrice = Number(await this.firstProductUnitPrice.innerText());
    const quantity = Number(
      await this.firstProductQuantity.getAttribute("value")
    );
    const expectedSubTotal = unitPrice * quantity;
    const actualSubTotal = Number(await this.subTotalPrice.innerText());

    expect(actualSubTotal).toEqual(expectedSubTotal);
  }

  async startCheckout(): Promise<void> {
    await this.termOfServiceCheckbox.click();
    await this.checkoutButton.click();
  }

  async verifyShoppingCartIsEmpty(): Promise<void> {
    await expect(this.cartItems).not.toBeVisible();
  }

  async removeFirstProduct(): Promise<void> {
    await this.removeFromCartFirstCheckbox.click();
    await this.updateShoppingCartButton.click();
  }
}
