import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async getAllLinks(): Promise<{href: string, text: string}[]> {
    return await this.page.$$eval('a[href]', elements => 
      elements.map(el => ({
        href: (el as HTMLAnchorElement).href,
        text: el.textContent?.trim() || ''
      })).filter(link => link.href && !link.href.startsWith('javascript:'))
    );
  }
}