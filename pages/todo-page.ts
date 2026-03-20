import { Page,Locator,expect } from "@playwright/test";

export class TodoPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc/');
  }

  async addTodo(todo: string) {
    const input = this.page.getByPlaceholder('What needs to be done?');
    await input.fill(todo);
    await input.press('Enter');
  }

  async markAsCompleted(todo: string) {
    await this.page.getByRole('listitem').filter({ hasText: todo }).getByRole('checkbox').check();
  }

  async deleteTodo(todo: string) {
    const item = this.page.getByRole('listitem').filter({ hasText: todo });
    await item.hover(); // ต้อง Hover ก่อนปุ่ม Delete ถึงจะขึ้น
    await item.getByRole('button', { name: 'Delete' }).click();
  }
}
