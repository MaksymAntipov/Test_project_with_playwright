import { test, expect} from "@playwright/test";
import testData from "../helpers/testData.json";
import { Checkout } from "../pom/pages/Checkout";
import { HomePage } from "../pom/pages/HomePage"; 

let checkout: Checkout;
let homePage: HomePage;

test.beforeEach(async ({page})=>{
    checkout = new Checkout(page);
    homePage = new HomePage(page);

   await homePage.openPage()
    await homePage.addToCartFirstBook();
    await homePage.iconCart.click();
    await homePage.buttonGoToCheckout.click();
})

test('PaymentCartWithoutAuth', async ({page})=>{
    await checkout.inputPhoneNumber.fill(testData.phoneNumber);
    await expect(checkout.inputPhoneNumber).toHaveValue(`+380${testData.phoneNumber}`);
    await checkout.inputEmail.fill(testData.email);
    await expect(checkout.inputEmail).toHaveValue(testData.email);
    await checkout.inputContactFirstName.fill(testData.contactFirstName);
    await expect(checkout.inputContactFirstName).toHaveValue(testData.contactFirstName);
    await checkout.inputContactLastName.fill(testData.contactLastName);
    await expect(checkout.inputContactLastName).toHaveValue(testData.contactLastName);
    await checkout.selectedDeliveryMethodWarehouse.scrollIntoViewIfNeeded();
    await checkout.selectedDeliveryMethodWarehouse.click();
    await checkout.inputCity.click();
    await checkout.searchCitylist.pressSequentially(testData.DeliveryCity);
    await expect(checkout.searchCitylist).toHaveValue(testData.DeliveryCity);
    await checkout.selectFirstCityInCityList.click();
    await checkout.inputWarehouseOrPostomat.click();
    await checkout.inputWarehouse.fill(testData.Warehouse);
    await expect(checkout.inputWarehouse).toHaveValue(testData.Warehouse)
    await checkout.selectFirstWarehouseInWarehouseList.click();
    await checkout.paymentMethodCard.click();
    await expect(checkout.paymentMethodCard).toBeChecked();
    await checkout.buttonCreatedOrder.click();
    await expect(page).toHaveURL(/^https:\/\/www\.liqpay\.ua\/uk\/checkout\/card\/checkout_/);

})