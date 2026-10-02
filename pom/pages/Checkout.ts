import {Page, Locator} from "@playwright/test"

export class Checkout{
    readonly page: Page;
    public inputPhoneNumber: Locator;
    public inputEmail: Locator;
    public inputContactFirstName: Locator;
    public inputContactLastName: Locator;
    public selectedDeliveryMethodWarehouse: Locator;
    public inputCity: Locator;
    public searchCitylist: Locator;
    public selectFirstCityInCityList: Locator;
    public inputWarehouseOrPostomat: Locator;
    public inputWarehouse: Locator;
    public selectFirstWarehouseInWarehouseList: Locator;
    public paymentMethodCard: Locator;
    public buttonCreatedOrder: Locator;


    constructor(page: Page){
        this.page = page;
        this.inputPhoneNumber = page.locator('//div[@class="relative"]//input[@type="tel"]').first();
        this.inputEmail = page.locator('//div[@class="relative"]//input[@type="email"]').first();
        this.inputContactFirstName = page.locator('//input[@name="contactInfo.firstName"]');
        this.inputContactLastName = page.locator('//input[@name="contactInfo.lastName"]');
        this.selectedDeliveryMethodWarehouse = page.getByText('Відділення або поштомат «Нової пошти»');
        this.inputCity = page.getByRole('button',{name:"Місто"});
        this.searchCitylist = page.getByLabel('Search options');
        this.selectFirstCityInCityList = page.locator('//li[@role="option"]').first();
        this.inputWarehouseOrPostomat = page.getByRole('button',{name:"Відділення або поштомат"})
        this.inputWarehouse = page.getByLabel('Search options');
        this.selectFirstWarehouseInWarehouseList = page.getByRole('option').first();
        this.paymentMethodCard = page.getByLabel('Карткою онлайн');
        this.buttonCreatedOrder = page.getByRole('button',{name:"Оформити замовлення"});










    }
}



