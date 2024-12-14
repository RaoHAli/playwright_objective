import type {  Page } from "@playwright/test";
import { BrowserContext, expect } from "@playwright/test";
import Env from "./environment";
const waitForElement = Env.waitForElement;

export class CommonFunctions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToURL(url: string) {
    await this.page.goto(url);
  }

  async waitForElementAttached(locator: string) {
    await this.page.waitForSelector(locator);
  }

  async clickElement(locator: string) {
    await this.page.waitForSelector(locator);
    await this.page.click(locator);
  }

  async clickElementJS(locator: string) {
    await this.waitForElementAttached(locator);
    await this.page.$eval(locator, (element: HTMLElement) => element.click());
  }


  async enterText(locator: string, text: string) {
    await this.waitForElementAttached(locator);
    console.log(locator);
    await this.page.fill(locator, text);
  }

  async dragAndDrop(dragElementLocator: string, dropElementLocator: string) {
    await this.waitForElementAttached(dragElementLocator);
    await this.waitForElementAttached(dropElementLocator);
    await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
  }

  async keyPress(locator: string, key: string) {
    this.page.press(locator, key);
  }

  async readElementText(locator: string) {
    await this.waitForElementAttached(locator);
    const textValue = await this.page.textContent(locator);
    return textValue;
  }

  async verifyNewWindowUrl(context: BrowserContext, locator: string, urlText: string) {
    const [newWindow] = await Promise.all([context.waitForEvent("page"), await this.page.click(locator)]);
    await newWindow.waitForLoadState("load");
    expect(newWindow.url()).toContain(urlText);
    await newWindow.close();
  }

  async verifyElementContainsText(locator: string, text: string) {
    await this.waitForElementAttached(locator);
    await expect(this.page.locator(locator)).toContainText(text);
  }

  async verifyElementIsDisplayed(locator: string, errorMessage: string) {
    await this.page.waitForSelector(locator, { state: "visible", timeout: waitForElement }).catch(() => {
      throw new Error(errorMessage);
    });
  }





}
