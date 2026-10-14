import test, { expect } from "@playwright/test";
import testData from "../helpers/testData.json";
import { HomePage } from "../pom/pages/HomePage";
import { Header } from "../pom/pages/Header";

let homePage: HomePage;
let header: Header; 

test.beforeEach(async({page})=>{
    homePage = new HomePage(page);
    await homePage.openPage();
    header = new Header(page);

})

test('Authorization success', async () =>{
    await homePage.login(testData.phoneNumber,testData.validOtp);
    await expect(header.userAvatar).toBeVisible();
});