import { Page, Locator } from '@playwright/test';

export class Header {
  readonly iconUserProfile: Locator;
  readonly iconCart: Locator;
  readonly userAvatar: Locator;

  constructor(page: Page) {
    this.iconUserProfile = page.locator('//button[@aria-label="User profile"]');
    this.userAvatar = page.locator('//button[@data-cy="user-avatar-btn"]');
    this.iconCart = page.locator('//button[@aria-label="Cart"]');
  }
}
