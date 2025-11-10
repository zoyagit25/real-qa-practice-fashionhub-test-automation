interface GitHubPR {
  title: string;
  created_at: string;
  user: {
    login: string;
  };
}

export class GitHubAPI {
  private baseURL: string = 'https://api.github.com';

  async getOpenPullRequests(repo: string): Promise<any[]> {
    const url = `${this.baseURL}/repos/${repo}/pulls?state=open`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Test-Automation'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const prs: GitHubPR[] = await response.json();
      
      return prs.map(pr => ({
        title: pr.title,
        created_at: new Date(pr.created_at).toLocaleDateString(),
        author: pr.user.login
      }));
    } catch (error) {
      console.error('Error fetching PRs from GitHub:', error);
      return [];
    }
  }
}