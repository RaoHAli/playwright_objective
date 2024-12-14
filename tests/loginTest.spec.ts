// loginTest.spec.ts
import { test, expect } from '@playwright/test';
import { loginUrl } from '../config/config';
import LoginPage from '../pageObjects/loginPage';
import loginData from '../config/login.json'; // Assuming you have proper types for JSON

test.beforeEach(async ({ page }) => {
  await page.goto(loginUrl); // Navigate using the URL from config
});

test.describe('Login', () => {
  test('Invalid login', async ({ page }) => {
    const { username, password } = loginData.invalid; // Use invalid credentials
    const loginPage = new LoginPage(page);

    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickLogin();

    await loginPage.isErrorVisible()

  });

  test('Valid login', async ({ page }) => {
    const { username, password } = loginData.valid; // Use valid credentials
    const loginPage = new LoginPage(page);

    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickLogin();

    await loginPage.isCartLinkVisible()

  });
});
