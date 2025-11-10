import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async login(username: string, password: string): Promise<void> {
    console.log('Attempting login with:', { username, password });
    
    await this.page.waitForTimeout(1000);
    
    const usernameSelectors = [
      'input[type="text"]',
      'input[name="username"]',
      'input[placeholder*="user" i]',
      'input[placeholder*="email" i]'
    ];
    
    const passwordSelectors = [
      'input[type="password"]',
      'input[name="password"]'
    ];
    
    for (const selector of usernameSelectors) {
      const element = this.page.locator(selector).first();
      if (await element.isVisible()) {
        await element.fill(username);
        break;
      }
    }
    
    for (const selector of passwordSelectors) {
      const element = this.page.locator(selector).first();
      if (await element.isVisible()) {
        await element.fill(password);
        break;
      }
    }
    
    const buttonSelectors = [
      'button[type="submit"]',
      'input[type="submit"]',
      'button:has-text("Login")',
      'button:has-text("Sign In")'
    ];
    
    for (const selector of buttonSelectors) {
      const button = this.page.locator(selector).first();
      if (await button.isVisible() && await button.isEnabled()) {
        await button.click();
        await this.page.waitForTimeout(2000);
        return;
      }
    }
    
    await this.page.keyboard.press('Enter');
  }
}