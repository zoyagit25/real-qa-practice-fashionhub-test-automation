import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';

test('TC3: Verify login page accessibility and form elements', async ({ page, browserName }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navigateTo('login.html');
  await page.waitForLoadState('networkidle');
  
  const currentURL = page.url();
  const pageTitle = await page.title();
  console.log(`${browserName} - Login page URL:`, currentURL);
  console.log(`${browserName} - Login page title:`, pageTitle);
  
  // Check if login form elements exist
  const usernameInput = page.locator('input[type="text"], input[name="username"]');
  const passwordInput = page.locator('input[type="password"]');
  const loginButton = page.locator('button[type="submit"], input[type="submit"]');
  
  const hasUsername = await usernameInput.isVisible();
  const hasPassword = await passwordInput.isVisible();
  const hasLoginButton = await loginButton.isVisible();
  
  console.log(`${browserName} - Form elements:`, {
    username: hasUsername,
    password: hasPassword,
    loginButton: hasLoginButton
  });
  
  expect(hasUsername).toBe(true);
  expect(hasPassword).toBe(true);
  expect(hasLoginButton).toBe(true);
});

test('TC3: Verify login functionality with demo credentials', async ({ page, browserName }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navigateTo('login.html');
  await page.waitForLoadState('networkidle');
  
  // Fill login form with demo credentials
  const usernameInput = page.locator('input[type="text"], input[name="username"]').first();
  const passwordInput = page.locator('input[type="password"]').first();
  const loginButton = page.locator('button[type="submit"], input[type="submit"]').first();
  
  await usernameInput.fill('demouser');
  await passwordInput.fill('fashion123');
  
  // Capture console logs during login attempt
  const consoleLogs: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'log') {
      consoleLogs.push(msg.text());
    }
  });
  
  await loginButton.click();
  
  // Wait for navigation or state change
  await page.waitForTimeout(3000);
  
  const afterLoginURL = page.url();
  console.log(`${browserName} - After login URL:`, afterLoginURL);
  console.log(`${browserName} - Console logs during login:`, consoleLogs);
  
  // Check if login was successful (redirected to account page or shows success)
  const loginSuccessful = afterLoginURL.includes('account.html') || 
                         consoleLogs.some(log => log.includes('Login successful'));
  
  console.log(`${browserName} - Login successful:`, loginSuccessful);
  
  // For this test, we consider it successful if we can attempt login
  // The actual login functionality depends on the application implementation
  expect(loginSuccessful).toBe(true);
});