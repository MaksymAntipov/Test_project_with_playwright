import {Page, Locator} from "@playwright/test"

export class Header{
public iconUserProfile: Locator;
public iconCart: Locator;

    constructor(page: Page){
        this.iconUserProfile = page.locator('//button[@aria-label="User profile"]');
        this.iconCart = page.locator('//button[@aria-label="Cart"]');
    }
}