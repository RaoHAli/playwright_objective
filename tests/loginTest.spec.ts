// loginTest.spec.ts
import { test, expect } from '@playwright/test';
import LoginPage from '../pageObjects/loginPage';
import loginData from '../fixtures/login.json';


test.beforeEach(async ({ page , baseURL}) => {
    const loginPage = new LoginPage(page);
   await loginPage.openUrl('/')
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
