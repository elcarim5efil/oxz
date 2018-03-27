import * as pathTo from 'path';

export interface MockConfig {
  local: Object;
  proxy: Object;
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
  }
  get(): MockConfig {
    return this.config;
  }
}