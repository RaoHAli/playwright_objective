import { Browser, BrowserContext, Page, chromium } from 'playwright';


export abstract class BaseTest {
  protected browser!: Browser;
  protected context!: BrowserContext;
  protected page!: Page;

  async setup(): Promise<void> {

    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async teardown(): Promise<void> {

    await this.page.close();
    await this.context.close();
    await this.browser.close();

  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitFor(time: number): Promise<void> {
    await this.page.waitForTimeout(time)
  }

}



