import {Page, Locator} from "@playwright/test"

export class AuthModal{
    public buttonSignIn: Locator;
    public inputPhoneNumber: Locator;
    public buttonGetOtpCode: Locator;
    public inputOtpCode: Locator;
    public buttonConfirm: Locator;

    constructor(page: Page){
        this.buttonSignIn = page.getByRole('button',{name:"Увійти"});
        this.inputPhoneNumber = page.locator('input[type="tel"]');
        this.buttonGetOtpCode = page.getByRole('button',{name:'Отримати код'});
        this.inputOtpCode = page.getByPlaceholder('* * * *');
        this.buttonConfirm = page.getByRole('button',{name:"Підтвердити"});
    }


    async login(phoneNumber:string, otp:string){
        await this.requestOtp(phoneNumber);
        await this.enterOtp(otp);
    }

    async requestOtp(phoneNumber: string){
        await this.buttonSignIn.click();
        await this.inputPhoneNumber.fill(phoneNumber);
        await this.buttonGetOtpCode.click();
}

    async enterOtp(otp: string){
        await this.inputOtpCode.pressSequentially(otp, {delay: 300});
        await this.buttonConfirm.click();
}

}