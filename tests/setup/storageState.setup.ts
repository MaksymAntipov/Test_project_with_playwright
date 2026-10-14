import test, { expect } from '@playwright/test';
import { HomePage } from '../../pom/pages/HomePage';
import testData from '../../helpers/testData.json';
import { Header } from '../../pom/pages/Header';
import { AUTH_USER_PATH_STORAGE_STATE } from '../../config/auth';

let homePage: HomePage;
let header: Header;

test('Auth', async ({ page }) => {
  homePage = new HomePage(page);
  header = new Header(page);
  await homePage.openPage();
  await homePage.login(testData.phoneNumber, testData.validOtp);
  await expect(header.userAvatar).toBeVisible();
  await page.context().storageState({ path: AUTH_USER_PATH_STORAGE_STATE });
});
