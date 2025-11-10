import { test, expect } from '@playwright/test';
import { AboutPage } from '../src/pages/about-page';

test('TC1: Verify no console errors on home page', async ({ page, browserName }) => {
  const aboutPage = new AboutPage(page);
  
  const errors: string[] = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await aboutPage.navigateTo('');
  
  // Firefox需要更长的等待时间
  if (browserName === 'firefox') {
    await page.waitForTimeout(3000);
  } else {
    await page.waitForTimeout(2000);
  }
  
  console.log(`${browserName} - Home page console errors:`, errors);
  
  // 主页应该没有控制台错误
  expect(errors).toHaveLength(0);
});

test('TC1: Verify about page has intentional error', async ({ page, browserName }) => {
  const aboutPage = new AboutPage(page);
  
  const errors: string[] = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await aboutPage.navigateTo('about.html');
  
  // Firefox需要更长的等待时间
  if (browserName === 'firefox') {
    await page.waitForTimeout(3000);
  } else {
    await page.waitForTimeout(2000);
  }
  
  console.log(`${browserName} - About page console errors:`, errors);
  
  const hasIntentionalError = errors.some(error => 
    error.includes('intentional') || 
    error.includes('This is an intentional error message!')
  );
  
  console.log(`${browserName} - Has intentional error:`, hasIntentionalError);
  expect(hasIntentionalError).toBe(true);
});