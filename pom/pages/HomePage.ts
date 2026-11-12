import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly firstBookCard: Locator;
  readonly buttonGoToCheckout: Locator;
  readonly firstBookCardPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.firstBookCard = page.locator('[class*="ProductCard-module"]').first();
    this.firstBookCardPrice = this.firstBookCard.getByTestId('currentPrice').first();
    this.buttonGoToCheckout = page.getByRole('button', { name: 'Перейти до оформлення' });
  }

  async addToCartFirstBook() {
    await this.firstBookCard.hover();
    await this.firstBookCard.getByRole('button', { name: 'До кошика' }).click();
  }
}
