import { test as base } from '@playwright/test';
import { HomePage } from '../pom/pages/HomePage';
import { Header } from '../pom/pages/Header';
import { AuthModal } from '../pom/forms/AuthModal';

type PageFixtures = {
  homePage: HomePage;
  header: Header;
  authModal: AuthModal;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  header: async ({ page }, use) => {
    const header = new Header(page);
    await use(header);
  },
  authModal: async ({ page }, use) => {
    const authModal = new AuthModal(page);
    await use(authModal);
  },
});

export { expect } from '@playwright/test';
