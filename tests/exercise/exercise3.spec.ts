import { test, expect } from '@playwright/test';

test('แบบฝึกหัดที่ 3 - ฝึก Assertion หลากหลายรูปแบบ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    //Login ด้วย password ผิด — Assert ว่า Error message toBeVisible()
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();

    //Assert ว่า Error message toContainText('do not match')
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');

    //Assert ว่า Username field มี CSS class error (ตรวจว่ากรอบแดงขึ้น)
    await expect(page.getByPlaceholder('Username')).toHaveClass(/error/);

    //กดปุ่ม X ปิด error — Assert ว่า Error message not.toBeVisible()
    await page.locator('.error-button').click();
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();
});

//npx playwright test tests/exercise3.spec.ts --headed
