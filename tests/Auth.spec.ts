import test, { expect } from "@playwright/test";
import testData from "../helpers/testData.json";
import { HomePage } from "../pom/pages/HomePage";
import { Header } from "../pom/pages/Header";
import { AuthModal } from "../pom/forms/AuthModal";

let homePage: HomePage;
let header: Header; 
let authModal: AuthModal;

test.beforeEach(async({page})=>{
    homePage = new HomePage(page);
    await homePage.openPage();
    header = new Header(page);
    authModal = new AuthModal(page);

})

test('Authorization success', async () =>{
    await homePage.login(testData.phoneNumber,testData.validOtp);
    await expect(header.userAvatar).toBeVisible();
});

test('Authorization fail - wrong otp', async ()=>{
    await homePage.login(testData.phoneNumber,testData.noValidOtp);
    await expect(authModal.errorContainer).toHaveText('Щось неправильно, перевір');
})




