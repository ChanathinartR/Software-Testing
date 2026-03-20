import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

test.describe('แบบฝึกหัดที่ 4 — Page Object Model', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    // เพิ่มข้อมูลพื้นฐานสำหรับ Test case ที่ 2 และ 3
    await todoPage.addTodo('reading');
    await todoPage.addTodo('cooking');
    await todoPage.addTodo('eating');
  });

  test('เพิ่ม Todo item ใหม่ 3 รายการ แล้วตรวจสอบว่ามีครบ 3 รายการ', async ({ page }) => {
    // ตรวจสอบจำนวนรายการโดยใช้ locator จากหน้าเว็บโดยตรง
    await expect(page.getByTestId('todo-item')).toHaveCount(3);
  });

  test('Mark Todo item รายการที่ 2 เป็น Completed แล้วตรวจสอบว่ามี class "completed"', async ({ page }) => {
    await todoPage.markAsCompleted('cooking');
    
    // ตรวจสอบว่ารายการ 'cooking' มี class 'completed' หรือไม่
    const secondItem = page.getByRole('listitem').filter({ hasText: 'cooking' });
    await expect(secondItem).toHaveClass(/completed/);
  });

  test('ลบ Todo item รายการแรกแล้วตรวจสอบว่าเหลือ 2 รายการ', async ({ page }) => {
    await todoPage.deleteTodo('reading');
    
    // ตรวจสอบว่าจำนวนรายการลดลงเหลือ 2
    await expect(page.getByTestId('todo-item')).toHaveCount(2);
    // ตรวจสอบให้แน่ใจว่า 'reading' หายไปจริงๆ
    await expect(page.getByText('reading')).not.toBeVisible();
  });
});