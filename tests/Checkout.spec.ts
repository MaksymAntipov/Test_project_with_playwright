import { test, expect } from '@playwright/test';
import testData from '../helpers/testData.json';
import { Checkout } from '../pom/pages/Checkout';
import { HomePage } from '../pom/pages/HomePage';
import { AUTH_USER_PATH_STORAGE_STATE } from '../config/auth';

let checkout: Checkout;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  checkout = new Checkout(page);
  homePage = new HomePage(page);

  await homePage.openPage();
  await homePage.addToCartFirstBook();
  await homePage.header.iconCart.click();
  await homePage.buttonGoToCheckout.click();
});
test.describe('Checkout: guest', () => {
  test('PaymentCartWithoutAuth', async ({ page }) => {
    await checkout.fillContactForm(
      testData.phoneNumber,
      testData.email,
      testData.contactFirstName,
      testData.contactLastName,
    );
    await expect(checkout.inputPhoneNumber).toHaveValue(`+380${testData.phoneNumber}`);

    await checkout.selectedDeliveryMethodWarehouse.scrollIntoViewIfNeeded();
    await checkout.selectedDeliveryMethodWarehouse.click();
    await checkout.inputCity.click();
    await checkout.searchCitylist.pressSequentially(testData.DeliveryCity);
    await expect(checkout.searchCitylist).toHaveValue(testData.DeliveryCity);
    await checkout.selectFirstCityInCityList.click();
    await checkout.inputWarehouseOrPostomat.click();
    await checkout.inputWarehouse.fill(testData.Warehouse);
    await expect(checkout.inputWarehouse).toHaveValue(testData.Warehouse);
    await checkout.selectFirstWarehouseInWarehouseList.click();
    await checkout.paymentMethodCard.click();
    await expect(checkout.paymentMethodCard).toBeChecked();
    await checkout.buttonCreatedOrder.click();
    await expect(page).toHaveURL(/^https:\/\/www\.liqpay\.ua\/uk\/checkout\/card\/checkout_/);
    await expect(page).toHaveURL(/^https:\/\/www\.liqpay\.ua\/uk\/checkout\/card\/checkout_/);
  });
});

test.describe('Checkout: authorized user', () => {
  test.use({ storageState: AUTH_USER_PATH_STORAGE_STATE });

  test('PaymentCartWithAuth', async ({ page }) => {
    await checkout.selectedDeliveryMethodWarehouse.scrollIntoViewIfNeeded();
    await checkout.selectedDeliveryMethodWarehouse.click();
    await checkout.inputCity.click();
    await checkout.searchCitylist.pressSequentially(testData.DeliveryCity);
    await expect(checkout.searchCitylist).toHaveValue(testData.DeliveryCity);
    await checkout.selectFirstCityInCityList.click();
    await checkout.inputWarehouseOrPostomat.click();
    await checkout.inputWarehouse.fill(testData.Warehouse);
    await expect(checkout.inputWarehouse).toHaveValue(testData.Warehouse);
    await checkout.selectFirstWarehouseInWarehouseList.click();
    await checkout.paymentMethodCard.click();
    await expect(checkout.paymentMethodCard).toBeChecked();
    await checkout.buttonCreatedOrder.click();
    await expect(page).toHaveURL(/^https:\/\/www\.liqpay\.ua\/uk\/checkout\/card\/checkout_/);
  });
});
