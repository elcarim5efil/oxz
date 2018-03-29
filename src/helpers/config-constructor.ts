import * as pathTo from 'path';
import { MockConfig } from '../types';

export default class ConfigConstructor {
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