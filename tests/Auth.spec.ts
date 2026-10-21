import { test, expect } from '../fixtures/pages';
import testData from '../helpers/testData.json';

test.beforeEach(async ({ app }) => {
  await app.homePage.openPage();
});

test('Authorization success', async ({ app }) => {
  await app.login(testData.phoneNumber, testData.validOtp);
  await expect(app.header.userAvatar).toBeVisible();
});

test('Authorization fail - wrong otp', async ({ app }) => {
  await app.login(testData.phoneNumber, testData.noValidOtp);
  await expect(app.authModal.errorContainer).toHaveText('Щось неправильно, перевір');
});
