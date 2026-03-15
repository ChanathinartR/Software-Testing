import { test, expect } from '@playwright/test';

test('แบบฝึกหัดที่ 1 — Locators & Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  //กรอก username และ password แล้วกด Login
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  // Assert ว่า URL เปลี่ยนไปที่ /inventory.html
  await expect(page).toHaveURL(/.*inventory.html/);

  //Assert ว่าหน้ามี heading ที่มีข้อความ "Products"
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');

  //Assert ว่ามีสินค้าแสดงอยู่ 6 รายการ
  await expect(page.locator('[data-test="inventory-item-description"]')).toHaveCount(6);    
});

//npx playwright test tests/exercise1.spec.ts --headed