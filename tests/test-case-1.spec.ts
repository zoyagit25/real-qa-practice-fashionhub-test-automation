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
  
 
  if (browserName === 'firefox') {
    await page.waitForTimeout(3000);
  } else {
    await page.waitForTimeout(2000);
  }
  
  console.log(`${browserName} - Home page console errors:`, errors);
 
  const severeErrors = errors.filter(error => 
    !error.includes('deprecated') && 
    !error.includes('experimental') &&
    !error.includes('Warning') &&
    !error.includes('warning')
  );
  
  expect(severeErrors).toHaveLength(0);
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


test('TC1: Verify products page has no unexpected errors', async ({ page, browserName }) => {
  const aboutPage = new AboutPage(page);
  
  const errors: string[] = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await aboutPage.navigateTo('products.html');
  await page.waitForTimeout(2000);
  
  console.log(`${browserName} - Products page console errors:`, errors);
  

  const unexpectedErrors = errors.filter(error => 
    !error.includes('deprecated') && 
    !error.includes('experimental')
  );
  
  expect(unexpectedErrors).toHaveLength(0);
});
