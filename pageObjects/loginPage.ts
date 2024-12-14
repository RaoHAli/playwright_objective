// loginPage.ts
import { Page } from '@playwright/test';
import assertions from '../utils/assertions'
import {CommonFunctions} from '../utils/commonFunctions'

let commonFunctions: CommonFunctions;

export default class LoginPage {
  private page: Page;
  private usernameField: string = '#user-name';
  private passwordField: string = '#password';
  private loginButton: string = '#login-button';
  private errorButton: string = '.error-button';
  private cartLink: string = '.shopping_cart_link';

  

  constructor(page: Page) {
    this.page = page;
    commonFunctions = new CommonFunctions(this.page);

  }


  public async openUrl(url: string) {
    await commonFunctions.navigateToURL(url)
  }

  public async enterUsername(username: string) {

    await commonFunctions.enterText(this.usernameField, username)
  }

  public async enterPassword(password: string) {
    await commonFunctions.enterText(this.passwordField, password)
  }

  public async clickLogin() {
    await commonFunctions.clickElement(this.loginButton);
  }

  public async isErrorVisible() {
    await assertions.verifyElementIsVisible(this.page, this.errorButton);
  }

  public async isCartLinkVisible() {
    await assertions.verifyElementIsVisible(this.page, this.cartLink);
  }
}
