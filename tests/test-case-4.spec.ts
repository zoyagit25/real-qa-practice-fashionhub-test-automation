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
  
  // 验证CSV文件包含正确的数据
  const fs = require('fs');
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.split('\n');
  
  // 应该包含表头和数据行
  expect(lines.length).toBeGreaterThan(1);
  expect(lines[0]).toBe('PR Name,Created Date,Author');
});

// 新增：边界测试 - 验证GitHub API错误处理
test('TC4: Verify GitHub API error handling', async () => {
  const githubAPI = new GitHubAPI();
  
  // 测试不存在的仓库
  const prs = await githubAPI.getOpenPullRequests('nonexistent/repo');
  
  // API应该优雅地处理错误，返回空数组而不是抛出异常
  expect(Array.isArray(prs)).toBe(true);
  console.log(`Non-existent repo returned ${prs.length} PRs`);
});

// 新增：边界测试 - 验证CSV生成边界情况
test('TC4: Verify CSV generation with empty data', async () => {
  const emptyPRs: any[] = [];
  
  // 应该能够处理空数据
  const csvPath = CSVGenerator.generatePRsCSV(emptyPRs, 'empty-prs.csv');
  
  const fs = require('fs');
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.split('\n');
  
  // 空数据应该只包含表头
  expect(lines.length).toBe(1);
  expect(lines[0]).toBe('PR Name,Created Date,Author');
  
  console.log('Empty CSV generated successfully');
});