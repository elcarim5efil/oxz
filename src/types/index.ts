import { Emitter } from '../helpers';

export interface PluginConfig {
  hooks: Emitter;
}

export interface ProxyConfig {
  enable?: Boolean;
  rules?: Array<Object>;
}

export interface MockConfig {
  local: Object;
  proxy: ProxyConfig;
  plugins: Array<Function>;
}

export interface MockObject {
  hooks: Emitter;
  config: MockConfig;
}