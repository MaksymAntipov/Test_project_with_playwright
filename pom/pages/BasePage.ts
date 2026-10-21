import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(browserTab: Page) {
    this.page = browserTab;
  }

  async openPage() {
    await this.page.goto('/');
  }
}
