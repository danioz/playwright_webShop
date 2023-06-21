import { expect, Locator, Page } from "@playwright/test";

export class RegisterSuccess {
    readonly registerNotification: Locator;

    constructor(page: Page) {
        this.registerNotification = page.locator(".result");
    }

    async verifyRegistrationCompletion(newEmail: string): Promise<void> {
        await expect(this.registerNotification).toHaveText(
            "Your registration completed"
        );
    }
}
