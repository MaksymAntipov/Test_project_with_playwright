import { Page } from '@playwright/test';
import { AuthModal } from './forms/AuthModal';
import { Checkout } from './pages/Checkout';
import { Header } from './pages/Header';
import { HomePage } from './pages/HomePage';
import { Snackbar } from './pages/Snackbar';
import { Liqpay } from './pages/LiqPay';

export class App {
  readonly page: Page;
  readonly authModal: AuthModal;
  readonly checkout: Checkout;
  readonly header: Header;
  readonly homePage: HomePage;
  readonly snackbar: Snackbar;
  readonly liqpay: Liqpay;

  constructor(page: Page) {
    this.page = page;
    this.authModal = new AuthModal(page);
    this.checkout = new Checkout(page);
    this.header = new Header(page);
    this.homePage = new HomePage(page);
    this.snackbar = new Snackbar(page);
    this.liqpay = new Liqpay(page);
  }

  async login(phoneNumber: string, otp: string) {
    await this.header.iconUserProfile.click();
    await this.authModal.login(phoneNumber, otp);
  }
  async goToCheckoutWithFirstItem() {
    await this.homePage.addToCartFirstBook();
    await this.header.iconCart.click();
    await this.homePage.buttonGoToCheckout.click();
  }
}
