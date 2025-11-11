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
        console.warn(`GitHub API returned ${response.status} for ${repo}`);
        return []; // 优雅地返回空数组而不是抛出异常
      }

      const prs: GitHubPR[] = await response.json();
      
      return prs.map(pr => ({
        title: pr.title,
        created_at: new Date(pr.created_at).toLocaleDateString(),
        author: pr.user.login
      }));
    } catch (error) {
      console.error('Error fetching PRs from GitHub:', error);
      return []; // 优雅地返回空数组
    }
  }
}