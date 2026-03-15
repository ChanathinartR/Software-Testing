import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';

test.describe('🛒 Shopping & Checkout Flow', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        // Login ก่อนทุก Test ใน describe block นี้
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.expectOnInventoryPage();
    });

    //✅ Positive: Happy Path Checkout (End-to-End)
    test('TC-S-08 | Checkout สำเร็จ — แสดงหน้า Order Complete', async () => {

        // 1. เพิ่มสินค้า
        await inventoryPage.addToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();

        // 2. เริ่ม Checkout
        await cartPage.clickCheckout();

        // 3. กรอกข้อมูล Shipping
        await checkoutPage.fillShippingInfo('สมชาย', 'ใจดี', '10110');

        // 4. ยืนยัน Order
        await checkoutPage.clickFinish();

        // ✅ ตรวจสอบผลลัพธ์ปลายทาง
        await checkoutPage.expectOnComplete();
    });

    //❌ Negative: Checkout Form Validation
    test('TC-S-13 | Checkout โดยไม่ใส่ First Name', async () => {
        await inventoryPage.addToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
        // กด Continue โดยไม่กรอกอะไรเลย
        await checkoutPage.clickContinue();
        await checkoutPage.expectErrorMessage('First Name is required');
    });
    test('TC-S-14 | Checkout โดยไม่ใส่ Last Name', async () => {
        await inventoryPage.addToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.fillShippingInfo('สมชาย','','');
        await checkoutPage.clickContinue();
        await checkoutPage.expectErrorMessage('Last Name is required');
    });
    test('TC-S-15 | ใส่ First + Last แต่ไม่ใส่ Zip Code', async () => {
        await inventoryPage.addToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.fillShippingInfo('สมชาย','ใจดี','');
        await checkoutPage.clickContinue();
        await checkoutPage.expectErrorMessage('Postal Code is required');
    });

    test('TC-S-16 | Checkout ด้วย Cart ว่าง', async () => {
        //Step 2 ไม่มี cart_item
        await inventoryPage.goToCart();
        await cartPage.expectCartEmpty;
        await cartPage.clickCheckout();
    });

    test('TC-S-17|Cancel ใน Step 2', async({page})=>{
        await inventoryPage.goToCart();
        await cartPage.expectCartEmpty();
        await cartPage.clickCheckout();
        await checkoutPage.clickCancel();
        await expect(page).toHaveURL('/cart.html');
    });

    test('TC-S-18 | เข้า /inventory.html โดยไม่ Login', async ({ page }) => {
        // Logout ก่อน แล้วพยายามเข้า Protected Page โดยตรง
        await inventoryPage.logout();
        await page.goto('/inventory.html');
        // ✅ ระบบต้อง Redirect กลับ Login ไม่ใช่ให้เข้าถึงได้
        await expect(page).toHaveURL('/');
    });

    test('TC-S-19|เข้า /cart.html โดยไม่ Login ', async ({ page }) => {
        await inventoryPage.logout();
        await page.goto('/cart.html');
        await expect(page).toHaveURL('/');
    });
});