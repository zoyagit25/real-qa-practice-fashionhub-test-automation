import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class AboutPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
}