import {test, expect} from "@playwright/test";
import { HomePage } from "../pom/pages/HomePage";
import testData  from "../helpers/testData.json";

test.beforeEach( async({page})=>{
    const homePage = new HomePage(page);
    await homePage.openPage()
    await page.locator('//button[@aria-label="User profile"]').click();
    await expect(page.locator('.Profile-module__vegQKq__dropdownBody')).toBeVisible()
    await page.getByRole('button', {name:'Увійти'}).click();
    await page.getByPlaceholder('Номер телефону').fill(testData.phoneNumber);
    await expect(page.locator('.Input-module__HswzOW__input')).toHaveValue(`+380${testData.phoneNumber}`)
    await page.getByRole('button',{name:'Отримати код'}).click();
    await page.getByPlaceholder('* * * *').pressSequentially(testData.valid_otp, {delay: 300});
    await page.getByRole('button',{name:"Підтвердити"}).click({delay: 300});
    await expect(page.locator('li .flex-grow')).toHaveText('Вдалося, ти переглядаєш сайт зі свого профілю')

})

test('Created privet shelves', async ({page}) =>{
    await page.locator('[data-cy="user-avatar-btn"]').click();
    await page.getByText('Мої полиці').click();
    await page.getByText('Створити свою першу полицю').click();
    await expect (page.getByPlaceholder('Назва полиці (наприклад, «Хочу на ДН»)').fill("My first"));
    await expect (page.getByPlaceholder('Опис (не обов’язково)»)').fill("Wow,wow - stop"));
    await page.getByRole('button',{name:"Створити"}).click();
    await expect(page.locator('li .flex-grow')).toHaveText('Полицю "My first" створено');







})