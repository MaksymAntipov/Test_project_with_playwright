import {Page} from "@playwright/test";
import { Header } from "../pages/Header";
import { AuthModal } from "../forms/AuthModal";

export class BasePage {
    readonly page: Page;
    readonly header: Header;
    readonly authModal: AuthModal;

    constructor(browserTab: Page){
        this.page = browserTab;
        this.header = new Header(browserTab);
        this.authModal = new AuthModal(browserTab);

    }

    async openPage(){
        await this.page.goto("/");
    }

    async login(phoneNumber:string,otp:string){
        await this.header.iconUserProfile.click();
        await this.authModal.login(phoneNumber,otp);

    }
}