import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ShoppingCartPage extends BasePage {
  readonly firstProductUnitPrice: Locator;
  readonly firstProductQuantity: Locator;
  readonly termOfServiceCheckbox: Locator;
  readonly checkoutButton: Locator;
  readonly subTotalPrice: Locator;
  readonly removeFromCartFirstCheckbox: Locator;
  readonly updateShoppingCartButton: Locator;
  readonly firstCartItemRow: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.firstProductUnitPrice = page.locator(
      "tr.cart-item-row:first-child span.product-unit-price"
    );
    this.firstProductQuantity = page.locator(
      "tr.cart-item-row:first-child input[class='qty-input']"
    );
    this.termOfServiceCheckbox = page.locator("#termsofservice");
    this.checkoutButton = page.locator("#checkout");
    this.subTotalPrice = page.locator(
      "//span[.='Sub-Total:']/ancestor::tr//span[@class='product-price']"
    );
    this.removeFromCartFirstCheckbox = page.locator(
      "tr.cart-item-row:first-child input[name='removefromcart']"
    );
    this.updateShoppingCartButton = page.locator(
      "input[value='Update shopping cart']"
    );
    this.firstCartItemRow = page.locator("tr.cart-item-row:first-child");
    this.cartItems = page.locator("tr.cart-item-row");
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
