import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOrderPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
