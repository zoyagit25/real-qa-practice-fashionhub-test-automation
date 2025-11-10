import { defineConfig, devices } from '@playwright/test';
import { ConfigHandler } from './src/utils/config-handler';

const environment = ConfigHandler.getEnvironment();
const configHandler = new ConfigHandler(environment);
const config = configHandler.getConfig();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  
  // Enhanced reporting
  reporter: [
    ['html', { outputFolder: `playwright-report/${environment}`, open: 'never' }],
    ['json', { outputFile: `test-results/${environment}/results.json` }],
    ['junit', { outputFile: `test-results/${environment}/results.xml` }],
    ['line']
  ],
  
  timeout: config.timeout,
  
  use: {
    baseURL: 'https://pocketaces2.github.io/fashionhub/', // Default, overridden at runtime
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on-first-retry',
    actionTimeout: 30000,
    navigationTimeout: 30000,
    viewport: { width: 1280, height: 720 },
  },

  projects: config.browsers.map(browser => {
    let deviceConfig;
    switch (browser) {
      case 'firefox':
        deviceConfig = devices['Desktop Firefox'];
        break;
      case 'webkit':
        deviceConfig = devices['Desktop Safari'];
        break;
      case 'chromium':
      default:
        deviceConfig = devices['Desktop Chrome'];
        break;
    }
    
    return {
      name: browser,
      use: { 
        ...deviceConfig,
        headless: config.headless,
        ...(browser === 'firefox' && { 
          actionTimeout: 45000,
          navigationTimeout: 45000 
        }),
        slowMo: config.slowMo,
      },
    };
  }),
});