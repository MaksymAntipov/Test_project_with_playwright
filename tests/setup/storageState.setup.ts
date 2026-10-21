import { test, expect } from '../../fixtures/pages';
import testData from '../../helpers/testData.json';
import { AUTH_USER_PATH_STORAGE_STATE } from '../../config/auth';

test('Auth', async ({ page, app }) => {
  await app.homePage.openPage();
  await app.login(testData.phoneNumber, testData.validOtp);
  await expect(app.header.userAvatar).toBeVisible();
  await page.context().storageState({ path: AUTH_USER_PATH_STORAGE_STATE });
});
