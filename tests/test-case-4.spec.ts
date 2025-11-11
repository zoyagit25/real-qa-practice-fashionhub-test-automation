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
  
 
  const fs = require('fs');
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.split('\n');

  expect(lines.length).toBeGreaterThan(1);
  expect(lines[0]).toBe('PR Name,Created Date,Author');
});


test('TC4: Verify GitHub API error handling', async () => {
  const githubAPI = new GitHubAPI();
  

  const prs = await githubAPI.getOpenPullRequests('nonexistent/repo');
 
  expect(Array.isArray(prs)).toBe(true);
  console.log(`Non-existent repo returned ${prs.length} PRs`);
});


test('TC4: Verify CSV generation with empty data', async () => {
  const emptyPRs: any[] = [];
  

  const csvPath = CSVGenerator.generatePRsCSV(emptyPRs, 'empty-prs.csv');
  
  const fs = require('fs');
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.split('\n');
  

  expect(lines.length).toBe(1);
  expect(lines[0]).toBe('PR Name,Created Date,Author');
  
  console.log('Empty CSV generated successfully');
});
