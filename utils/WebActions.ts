import fs from "fs";
import type { Frame, FrameLocator, Page, test } from "@playwright/test";
import { BrowserContext, expect } from "@playwright/test";
import path from "path";
import Env from "./environment";
const waitForElement = Env.waitForElement;

export class WebActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToURL(url: string) {
    this.page.goto(url);
  }

  async waitForElementAttached(locator: string) {
    await this.page.waitForSelector(locator);
  }

  async waitForPageNavigation(event: string) {
    switch (event.toLowerCase()) {
      case "networkidle":
        await this.page.waitForNavigation({ waitUntil: "networkidle", timeout: waitForElement });
        break;
      case "load":
        await this.page.waitForNavigation({ waitUntil: "load", timeout: waitForElement });
        break;
      case "domcontentloaded":
        await this.page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: waitForElement });
    }
  }

  async delay(time: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  async clickElement(locator: string) {
    await this.page.waitForSelector(locator);
   // await this.waitForElementAttached(locator);
    await this.page.click(locator);
  }

  async clickElementJS(locator: string) {
    await this.waitForElementAttached(locator);
    await this.page.$eval(locator, (element: HTMLElement) => element.click());
  }

 

  async enterElementText(locator: string, text: string) {
    //await this.waitForElementAttached(locator);
    console.log(locator);
    await this.page.fill(locator, text);
  }

  async dragAndDrop(dragElementLocator: string, dropElementLocator: string) {
    await this.waitForElementAttached(dragElementLocator);
    await this.waitForElementAttached(dropElementLocator);
    await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
  }

  // async selectOptionFromDropdown(locator: string, option: string) {
  //   await this.waitForElementAttached(locator);
  //   const selectDropDownLocator = await this.page.$(locator);
  //   selectDropDownLocator.type(option);
  // }

  async keyPress(locator: string, key: string) {
    this.page.press(locator, key);
  }

  // async verifyElementText(locator: string, text: string) {
  //   await this.waitForElementAttached(locator);
  //   const textValue = await this.page.textContent(locator);
  //   expect(textValue.trim()).toBe(text);
  // }

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

  // async verifyJSElementValue(locator: string, text: string)  {
  //     await this.waitForElementAttached(locator);
  //     const textValue = await this.page.$eval(locator, (element: HTMLInputElement) => element.value);
  //     expect(textValue.trim()).toBe(text);
  // }

 

  async verifyElementIsDisplayed(locator: string, errorMessage: string) {
    await this.page.waitForSelector(locator, { state: "visible", timeout: waitForElement }).catch(() => {
      throw new Error(errorMessage);
    });
  }

  async expectToBeTrue(status: boolean, errorMessage: string) {
    expect(status, "${errorMessage}").toBe(true);
  }

  async expectToBeValue(expectedValue: string, actualValue: string, errorMessage: string) {
    expect(expectedValue.trim(), errorMessage).toBe(actualValue);
  }

  async enterFrameElementText(frameLocator: string, locator: string, text: string) {
    const frame = this.page.frame({ name: frameLocator });
    if (frame != null) {
      // await this.waitForElementAttached(locator);
      await frame.fill(locator, text);
    } else throw new Error("No such frame");
  }
}
