import * as fs from 'fs';
import * as path from 'path';

export interface Config {
  baseURL: string;
  timeout: number;
  headless: boolean;
  browsers: string[];
  slowMo?: number;
}

export class ConfigHandler {
  private config: Config;
  private environment: string;

  constructor(environment: string = 'default') {
    this.environment = environment;
    this.config = this.loadConfig(environment);
  }

  private loadConfig(environment: string): Config {
    const configPath = path.join(process.cwd(), 'config', `${environment}.json`);
    
    console.log(`Loading config from: ${configPath}`);
    
    if (!fs.existsSync(configPath)) {
      console.warn(`Config file not found: ${configPath}, using default values`);
      return this.getDefaultConfig();
    }

    try {
      const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return { ...this.getDefaultConfig(), ...configData };
    } catch (error) {
      console.error(`Error loading config from ${configPath}:`, error);
      return this.getDefaultConfig();
    }
  }

  private getDefaultConfig(): Config {
    return {
      baseURL: 'https://pocketaces2.github.io/fashionhub/',
      timeout: 45000,
      headless: true,
      browsers: ['chromium', 'firefox', 'webkit'],
      slowMo: 0
    };
  }

  getConfig(): Config {
    return this.config;
  }

  getBaseURL(): string {
    return process.env.BASE_URL || this.config.baseURL;
  }

  static getEnvironment(): string {
    return process.env.NODE_ENV || 'production';
  }
}