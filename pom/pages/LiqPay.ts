import { Page, Locator } from '@playwright/test';

export class Liqpay {
  readonly liqpayTotalPrice: Locator;

  constructor(page: Page) {
    this.liqpayTotalPrice = page.locator('[data-testid="to_pay_amount"] > div:nth-of-type(2) > div:nth-of-type(1)');
  }
}
