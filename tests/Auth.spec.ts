import test, { expect } from "@playwright/test";
import testData from "../helpers/testData.json";
import { HomePage } from "../pom/pages/HomePage";

let homePage: HomePage;

test.beforeEach(async({page})=>{
    homePage = new HomePage(page)
    await homePage.openPage()
    await homePage.iconUserProfile.click()
    await expect(homePage.buttonSignIn).toBeVisible()
    await homePage.buttonSignIn.click()
    await homePage.inputPhoneNumber.fill(testData.phoneNumber);
})

test ('Authorization success', async ({page}) =>{


    await expect(homePage.inputPhoneNumber).toHaveValue(`+380${testData.phoneNumber}`)
    await homePage.buttonGetOtpCode.click();
    await homePage.inputOtpCode.pressSequentially(testData.validOtp, {delay: 300})
    await homePage.buttonConfirm.click()
    await expect(homePage.snackbar).toBeVisible()

})









test ('Authorization wrong OTP', async ({page}) =>{

    await expect(page.locator('.Input-module__HswzOW__input')).toHaveValue(`+380${testData.phoneNumber}`)
    await page.getByRole('button',{name:'Отримати код'}).click();

    await page.getByPlaceholder('* * * *').pressSequentially(testData.no_valid_otp, {delay: 300})
    await page.getByRole('button',{name:"Підтвердити"}).click()
    await expect(page.getByRole('button',{name:"Підтвердити"})).not.toBeVisible()

    await expect(page.locator("//span[@class = 'inline-block Input-module__HswzOW__helperText Input-module__HswzOW__helperText--lg']")).toHaveText('Щось неправильно, перевір')

})


test ('Authorization resend OTP', async ({page}) =>{
    test.setTimeout(120000)

    await expect(page.locator('.Input-module__HswzOW__input')).toHaveValue(`+380${testData.phoneNumber}`)
    await page.getByRole('button',{name:'Отримати код'}).click();
    
    const buttonResent =  page.getByRole('button', {name: 'Повторно отримати код'});
    await expect(buttonResent).toBeEnabled({timeout:61000});
    await buttonResent.click()

    await expect(page.locator("//p[@class = 'mt-6 text-labelLarge text-[--sysOnSurfaceVariant] opacity-70']")).toHaveText(/Ми відправили код на номер|Попередній код ще діє, шукай в останньому повідомленні на номер/)

})