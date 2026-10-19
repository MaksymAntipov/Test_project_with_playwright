import { test, expect } from '../fixtures/pages';
import testData from '../helpers/testData.json';

test.beforeEach(async ({ homePage }) => {
  await homePage.openPage();
});

test('Authorization success', async ({ homePage, header }) => {
  await homePage.login(testData.phoneNumber, testData.validOtp);
  await expect(header.userAvatar).toBeVisible();
});

test('Authorization fail - wrong otp', async ({ homePage, authModal }) => {
  await homePage.login(testData.phoneNumber, testData.noValidOtp);
  await expect(authModal.errorContainer).toHaveText('Щось неправильно, перевір');
});
