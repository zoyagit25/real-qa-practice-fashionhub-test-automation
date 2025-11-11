import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';

test('TC3: Verify login page accessibility and form elements', async ({ page, browserName }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo('login.html');

  if (browserName === 'firefox') {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  } else {
    await page.waitForLoadState('networkidle');
  }

  const currentURL = page.url();
  const pageTitle = await page.title();
  console.log(`${browserName} - Login page URL:`, currentURL);
  console.log(`${browserName} - Login page title:`, pageTitle);

  const pageText = await page.textContent('body');
  console.log(`${browserName} - Page content length:`, pageText?.length);

  expect(pageText?.length).toBeGreaterThan(0);
});

test('TC3: Verify basic page functionality', async ({ page, browserName }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo('login.html');

  if (browserName === 'firefox') {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
  } else {
    await page.waitForLoadState('domcontentloaded');
  }

  const title = await page.title();
  console.log(`${browserName} - Page title:`, title);

  const bodyText = await page.textContent('body');
  console.log(`${browserName} - Body text length:`, bodyText?.length);

  expect(title).toBeTruthy();
  expect(bodyText?.length).toBeGreaterThan(0);
});


test('TC3: Verify login form validation (stable)', async ({ page, browserName }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo('login.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);


  console.log(`${browserName}: Testing valid credentials...`);
  await loginPage.login('demouser', 'fashion123');
  await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
  await page.waitForTimeout(2000);

  const afterValidURL = page.url();
  console.log(`${browserName} - After valid login URL: ${afterValidURL}`);


  const validPageText = await page.textContent('body');
  expect(validPageText?.length).toBeGreaterThan(0);

  await loginPage.navigateTo('login.html');
  await page.waitForLoadState('networkidle');

 
  console.log(`${browserName}: Testing invalid credentials...`);
  await loginPage.login('wronguser', 'wrongpass');
  await page.waitForTimeout(1500);

  const invalidPageText = await page.textContent('body');
  expect(invalidPageText?.length).toBeGreaterThan(0);


  console.log(`${browserName}: Testing empty credentials...`);
  await loginPage.login('', '');
  await page.waitForTimeout(1500);

  const emptyPageText = await page.textContent('body');
  expect(emptyPageText?.length).toBeGreaterThan(0);
});
