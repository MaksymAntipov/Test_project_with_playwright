import { Page, Locator } from "@playwright/test";

export class HomePage {

    readonly page: Page;
    public iconUserProfile: Locator;
    public iconCart: Locator;
    public buttonSignIn: Locator;
    public inputPhoneNumber: Locator;
    public buttonGetOtpCode: Locator;
    public inputOtpCode: Locator;
    public buttonConfirm: Locator
    public snackbar: Locator
    public firstBookCart: Locator
    public buttonGoToCheckout: Locator


    constructor(page:Page){
        this.page = page
        this.iconUserProfile = page.locator('//button[@aria-label="User profile"]');
        this.iconCart = page.locator('//button[@aria-label="Cart"]');
        this.buttonSignIn = page.getByRole('button',{name:"Увійти"});
        this.inputPhoneNumber = page.locator('input[type="tel"]');
        this.buttonGetOtpCode = page.getByRole('button',{name:'Отримати код'});
        this.inputOtpCode = page.getByPlaceholder('* * * *');
        this.buttonConfirm = page.getByRole('button',{name:"Підтвердити"});
        this.snackbar = page.getByText('Вдалося, ти переглядаєш сайт зі свого профілю');
        this.firstBookCart = page.locator('[class*="ProductCard-module"]').first();
        this.buttonGoToCheckout = page.getByRole('button',{name:'Перейти до оформлення'})


    }

    async openPage(){
        await this.page.goto("/");
    }

    async addToCartFirstBook(){
        await this.firstBookCart.hover();
        await this.firstBookCart.getByRole('button',{name:"До кошика"}).click();
             
    }
}
