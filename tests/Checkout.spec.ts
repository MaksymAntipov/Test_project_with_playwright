import { test, expect } from '../fixtures/pages';
import testData from '../helpers/testData.json';
import { AUTH_USER_PATH_STORAGE_STATE } from '../config/auth';

test.beforeEach(async ({ app }) => {
  await app.homePage.openPage();
});

test.describe('Checkout: guest', () => {
  test('PaymentCartWithoutAuth', async ({ app }) => {
    const priceItemInHomePage = await app.homePage.firstBookCardPrice.innerText();
    await app.goToCheckoutWithFirstItem();
    await app.checkout.fillContactForm(
      testData.phoneNumber,
      testData.email,
      testData.contactFirstName,
      testData.contactLastName,
    );
    await expect(app.checkout.itemPrice).toHaveText(priceItemInHomePage); //сравнение цены с главной с ценой в блоке "Твоє замовлення"
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
    const checkoutDeliveruPrice = parseInt(await app.checkout.deliveruPrice.innerText());
    const checkoutTotalOrderPrice = parseInt(await app.checkout.totalOrderPrice.innerText());
    await expect(app.checkout.totalItemsPrice).toHaveText(priceItemInHomePage); //сравнение цены с главной с ценой в блоке "Разом"
    const checkoutTotalItemsPrice = parseInt(await app.checkout.totalItemsPrice.innerText());
    expect(checkoutTotalItemsPrice + checkoutDeliveruPrice).toBe(checkoutTotalOrderPrice);
    await app.checkout.buttonCreatedOrder.click();
    await expect(app.page).toHaveURL(/^https:\/\/www\.liqpay\.ua\/uk\/checkout\/card\/checkout_/);
    const liqpayTotalPrice = parseInt(await app.liqpay.liqpayTotalPrice.innerText());
    expect(checkoutTotalOrderPrice).toBe(liqpayTotalPrice);
    console.log(`Checkout total price: ${checkoutTotalOrderPrice}, Liqpay total price: ${liqpayTotalPrice}`);
  });
});

test.describe('Checkout: authorized user', () => {
  test.use({ storageState: AUTH_USER_PATH_STORAGE_STATE });

  test('PaymentCartWithAuth', async ({ app }) => {
    const priceItemInHomePage = await app.homePage.firstBookCardPrice.innerText();
    await app.goToCheckoutWithFirstItem();
    await app.checkout.selectedDeliveryMethodWarehouse.scrollIntoViewIfNeeded();
    await app.checkout.selectedDeliveryMethodWarehouse.click();
    await app.checkout.paymentMethodCard.click();
    await expect(app.checkout.paymentMethodCard).toBeChecked();
    await app.checkout.buttonCreatedOrder.click();
    const checkoutDeliveruPrice = parseInt(await app.checkout.deliveruPrice.innerText());
    const checkoutTotalOrderPrice = parseInt(await app.checkout.totalOrderPrice.innerText());
    await expect(app.checkout.totalItemsPrice).toHaveText(priceItemInHomePage); //сравнение цены с главной с ценой в блоке "Разом"
    const checkoutTotalItemsPrice = parseInt(await app.checkout.totalItemsPrice.innerText());
    expect(checkoutTotalItemsPrice + checkoutDeliveruPrice).toBe(checkoutTotalOrderPrice);
    await app.checkout.buttonCreatedOrder.click();
    await expect(app.page).toHaveURL(/^https:\/\/www\.liqpay\.ua\/uk\/checkout\/card\/checkout_/);
    const liqpayTotalPrice = parseInt(await app.checkout.liqpayTotalPrice.innerText());
    expect(checkoutTotalOrderPrice).toBe(liqpayTotalPrice);
    console.log(`Checkout total price: ${checkoutTotalOrderPrice}, Liqpay total price: ${liqpayTotalPrice}`);
  });
});
