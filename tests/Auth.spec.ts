import test, { expect } from "@playwright/test";
import testData from "../helpers/testData.json";
import { HomePage } from "../pom/pages/HomePage";

let homePage: HomePage;

test.beforeEach(async({page})=>{
    homePage = new HomePage(page);
    await homePage.openPage();

})

test('Authorization success', async () =>{
    await homePage.login(testData.phoneNumber,testData.validOtp);
    await expect(homePage.snackbar).toBeVisible();
});