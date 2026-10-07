import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    public snackbar: Locator
    public firstBookCart: Locator
    public buttonGoToCheckout: Locator


    constructor(page:Page){
        super(page);
        this.snackbar = page.getByText('Вдалося, ти переглядаєш сайт зі свого профілю');
        this.firstBookCart = page.locator('[class*="ProductCard-module"]').first();
        this.buttonGoToCheckout = page.getByRole('button',{name:'Перейти до оформлення'})
    }

    async addToCartFirstBook(){
        await this.firstBookCart.hover();
        await this.firstBookCart.getByRole('button',{name:"До кошика"}).click();
             
    }

}
