import { Page, Locator } from '@playwright/test';

export class Snackbar {
  readonly successAut: Locator;

  constructor(page: Page) {
    this.successAut = page.getByText('Вдалося, ти переглядаєш сайт зі свого профілю');
  }
}
