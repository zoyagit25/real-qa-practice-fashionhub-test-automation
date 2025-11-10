import { test, expect } from '@playwright/test';
import { GitHubAPI } from '../src/utils/github-api';
import { CSVGenerator } from '../src/utils/csv-generator';

test('TC4: Generate CSV of open pull requests', async () => {
  const githubAPI = new GitHubAPI();
  
  const prs = await githubAPI.getOpenPullRequests('appwrite/appwrite');
  
  expect(prs.length).toBeGreaterThan(0);
  
  const csvPath = CSVGenerator.generatePRsCSV(prs);
  
  console.log(`CSV generated at: ${csvPath}`);
  console.log(`Found ${prs.length} open pull requests`);
});