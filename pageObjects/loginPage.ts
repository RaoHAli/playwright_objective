// loginPage.ts
import { Page } from '@playwright/test';
import assertions from '../utils/assertions'

export default class LoginPage {
  private page: Page;
  private usernameField: string = '#user-name';
  private passwordField: string = '#password';
  private loginButton: string = '#login-button';
  private errorButton: string = '.error-button';
  private cartLink: string = '.shopping_cart_link';

  constructor(page: Page) {
    this.page = page;
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.locator(this.usernameField).fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.locator(this.passwordField).fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.page.locator(this.loginButton).click();
  }

  async isErrorVisible() {
    await assertions.verifyElementIsVisible(this.page, this.errorButton);
  }

  async isCartLinkVisible() {
    await assertions.verifyElementIsVisible(this.page, this.cartLink);
  }
}
