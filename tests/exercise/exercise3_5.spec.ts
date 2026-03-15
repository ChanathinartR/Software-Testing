import {test, expect} from '@playwright/test';

test('แบบฝึกหัดที่ 3 - ฝึก Assertion หลากหลายรูปแบบ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');;
    await page.getByRole('button', { name: 'Login' }).click();

     //Sort สินค้าแบบ Price Low to High — Assert ว่าสินค้าแรกมีราคา $7.99
     await page.getByRole('combobox').selectOption('lohi');
     await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');

});

//npx playwright test tests/exercise3_5.spec.ts --headed