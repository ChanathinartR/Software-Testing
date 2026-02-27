import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('heading', { name: 'todos' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('read a book');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByText('This is just a demo of TodoMVC for testing, not the real TodoMVC app. todosMark').click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByText('Mark all as complete').click();
});