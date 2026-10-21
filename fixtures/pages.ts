import { test as base } from '@playwright/test';
import { App } from '../pom/App';

type PageFixtures = {
  app: App;
};

export const test = base.extend<PageFixtures>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },
});

export { expect } from '@playwright/test';
