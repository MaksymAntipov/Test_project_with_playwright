import { Page, Locator } from '@playwright/test';

export class Checkout {
  readonly page: Page;
  readonly inputPhoneNumber: Locator;
  readonly inputEmail: Locator;
  readonly inputContactFirstName: Locator;
  readonly inputContactLastName: Locator;
  readonly itemPrice: Locator;
  readonly totalItemsPrice: Locator;
  readonly deliveryPrice: Locator;
  readonly totalOrderPrice: Locator;
  readonly selectedDeliveryMethodWarehouse: Locator;
  readonly inputCity: Locator;
  readonly searchCitylist: Locator;
  readonly selectFirstCityInCityList: Locator;
  readonly inputWarehouseOrPostomat: Locator;
  readonly inputWarehouse: Locator;
  readonly selectFirstWarehouseInWarehouseList: Locator;
  readonly paymentMethodCard: Locator;
  readonly buttonCreatedOrder: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputPhoneNumber = page.locator('//div[@class="relative"]//input[@type="tel"]').first();
    this.inputEmail = page.locator('//div[@class="relative"]//input[@type="email"]').first();
    this.inputContactFirstName = page.locator('//input[@name="contactInfo.firstName"]');
    this.inputContactLastName = page.locator('//input[@name="contactInfo.lastName"]');
    this.itemPrice = page.locator('div.flex > span.text-titleLargeBold');
    this.totalItemsPrice = page.getByText(/на суму/).locator('xpath=following-sibling::span');
    this.deliveryPrice = page.locator('div.mb-4 > span.text-end');
    this.totalOrderPrice = page.locator('span.flex > span.text-nowrap');
    this.selectedDeliveryMethodWarehouse = page.getByText('Відділення або поштомат «Нової пошти»');
    this.inputCity = page.getByRole('button', { name: 'Місто' });
    this.searchCitylist = page.getByLabel('Search options');
    this.selectFirstCityInCityList = page.locator('//li[@role="option"]').first();
    this.inputWarehouseOrPostomat = page.getByRole('button', { name: 'Відділення або поштомат' });
    this.inputWarehouse = page.getByLabel('Search options');
    this.selectFirstWarehouseInWarehouseList = page.getByRole('option').first();
    this.paymentMethodCard = page.getByLabel('Карткою онлайн');
    this.buttonCreatedOrder = page.getByRole('button', { name: 'Оформити замовлення' });
  }

  async fillContactForm(phoneNumber: string, email: string, firstName: string, lastName: string) {
    await this.inputPhoneNumber.fill(phoneNumber);
    await this.inputEmail.fill(email);
    await this.inputContactFirstName.fill(firstName);
    await this.inputContactLastName.fill(lastName);
  }
}
