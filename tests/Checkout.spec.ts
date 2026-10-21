import { test, expect } from '../fixtures/pages';
import testData from '../helpers/testData.json';
import { AUTH_USER_PATH_STORAGE_STATE } from '../config/auth';

test.beforeEach(async ({ app }) => {
  await app.homePage.openPage();
  await app.homePage.addToCartFirstBook();
  await app.header.iconCart.click();
  await app.homePage.buttonGoToCheckout.click();
});

test.describe('Checkout: guest', () => {
  test('PaymentCartWithoutAuth', async ({ app }) => {
    await app.checkout.fillContactForm(
      testData.phoneNumber,
      testData.email,
      testData.contactFirstName,
      testData.contactLastName,
    );
    await expect(app.checkout.inputPhoneNumber).toHaveValue(`+380${testData.phoneNumber}`);
    await app.checkout.selectedDeliveryMethodWarehouse.scrollIntoViewIfNeeded();
    await app.checkout.selectedDeliveryMethodWarehouse.click();
    await app.checkout.inputCity.click();
    await app.checkout.searchCitylist.pressSequentially(testData.DeliveryCity);
    await expect(app.checkout.searchCitylist).toHaveValue(testData.DeliveryCity);
    await app.checkout.selectFirstCityInCityList.click();
    await app.checkout.inputWarehouseOrPostomat.click();
    await app.checkout.inputWarehouse.fill(testData.Warehouse);
    await expect(app.checkout.inputWarehouse).toHaveValue(testData.Warehouse);
    await app.checkout.selectFirstWarehouseInWarehouseList.click();
    await app.checkout.paymentMethodCard.click();
    await expect(app.checkout.paymentMethodCard).toBeChecked();
    await app.checkout.buttonCreatedOrder.click();
    await expect(app.page).toHaveURL(/^https:\/\/www\.liqpay\.ua\/uk\/checkout\/card\/checkout_/);
  });
});

test.describe('Checkout: authorized user', () => {
  test.use({ storageState: AUTH_USER_PATH_STORAGE_STATE });

  test('PaymentCartWithAuth', async ({ app }) => {
    await app.checkout.selectedDeliveryMethodWarehouse.scrollIntoViewIfNeeded();
    await app.checkout.selectedDeliveryMethodWarehouse.click();
    await app.checkout.inputCity.click();
    await app.checkout.searchCitylist.pressSequentially(testData.DeliveryCity);
    await expect(app.checkout.searchCitylist).toHaveValue(testData.DeliveryCity);
    await app.checkout.selectFirstCityInCityList.click();
    await app.checkout.inputWarehouseOrPostomat.click();
    await app.checkout.inputWarehouse.fill(testData.Warehouse);
    await expect(app.checkout.inputWarehouse).toHaveValue(testData.Warehouse);
    await app.checkout.selectFirstWarehouseInWarehouseList.click();
    await app.checkout.paymentMethodCard.click();
    await expect(app.checkout.paymentMethodCard).toBeChecked();
    await app.checkout.buttonCreatedOrder.click();
    await expect(app.page).toHaveURL(/^https:\/\/www\.liqpay\.ua\/uk\/checkout\/card\/checkout_/);
  });
});
