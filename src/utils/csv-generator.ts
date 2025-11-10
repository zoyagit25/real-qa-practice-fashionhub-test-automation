import * as fs from 'fs';
import * as path from 'path';

export interface PullRequest {
  title: string;
  created_at: string;
  author: string;
}

export class CSVGenerator {
  static generatePRsCSV(prs: PullRequest[], filename: string = 'pull-requests.csv'): string {
    const csvContent = [
      'PR Name,Created Date,Author',
      ...prs.map(pr => `"${pr.title}","${pr.created_at}","${pr.author}"`)
    ].join('\n');

    const filePath = path.join(process.cwd(), 'test-results', filename);
    
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, csvContent, 'utf8');
    return filePath;
  }
}