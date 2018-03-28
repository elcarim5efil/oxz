import * as pathTo from 'path';

export interface ProxyConfig {
  enable?: Boolean;
  rules?: Array<Object>;
}

export interface MockConfig {
  local: Object;
  proxy: ProxyConfig;
  plugins: Array<Function>;
}

export class ConfigConstructor {
  private config: MockConfig;
  constructor(config?: any) {
    if (typeof config === 'string') {
      this.config = require(config);
    } else {
      this.config = config;
    }

    this.config.plugins = this.config.plugins || [];
    this.config.proxy = this.config.proxy || {};
  }
  get(): MockConfig {
    return this.config;
  }
}