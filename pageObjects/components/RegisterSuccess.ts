import { expect, Locator, Page } from '@playwright/test';

export class RegisterSuccess {
  readonly registerNotification: Locator = this.page.locator('.result');

  constructor(public readonly page: Page) {}

  async verifyRegistrationCompletion(newEmail: string): Promise<void> {
    await expect(this.registerNotification).toHaveText('Your registration completed');
  }
}
