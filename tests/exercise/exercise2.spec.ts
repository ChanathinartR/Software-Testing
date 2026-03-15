import { test, expect } from '@playwright/test';

test('แบบฝึกหัดที่ 2 — Filter & Cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  //Login เข้าสู่ระบบก่อน
  
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');;
  await page.getByRole('button', { name: 'Login' }).click();
  
  //Add Sauce Labs Backpack ลงตะกร้า — ใช้ filter() ไม่ใช่ first()
  await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' })
  .getByRole('button', { name: 'Add to cart' }).click();

  //Assert ว่า Cart badge แสดงเลข 1
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  //Add Sauce Labs Bike Light ด้วย
  await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' })
  .getByRole('button', { name: 'Add to cart' }).click();

  //Assert ว่า Cart badge แสดงเลข 2
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  //กดปุ่ม Remove บน Backpack — Assert ว่า badge กลับเป็น 1
  await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' })
  .getByRole('button', { name: 'Remove' }).click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

//npx playwright test tests/exercise2.spec.ts --headed