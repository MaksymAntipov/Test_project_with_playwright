import { Page } from '@playwright/test';
import { AuthModal } from './forms/AuthModal';
import { Checkout } from './pages/Checkout';
import { Header } from './pages/Header';
import { HomePage } from './pages/HomePage';

export class App {
  readonly page: Page;
  readonly authModal: AuthModal;
  readonly checkout: Checkout;
  readonly header: Header;
  readonly homePage: HomePage;

  constructor(browserTab: Page) {
    this.page = browserTab;
    this.authModal = new AuthModal(browserTab);
    this.checkout = new Checkout(browserTab);
    this.header = new Header(browserTab);
    this.homePage = new HomePage(browserTab);
  }

  async login(phoneNumber: string, otp: string) {
    await this.header.iconUserProfile.click();
    await this.authModal.login(phoneNumber, otp);
  }
}
