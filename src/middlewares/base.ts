import * as pathTo from 'path';
import { Context } from 'koa';
import { MockConfig, MockObject } from '../types';
import { Emitter } from '../helpers';

import * as utils from '../utils';

export default class Base {
  protected hooks: Emitter;
  protected config: MockConfig;
  protected plugins: Array<Function>;

  constructor(mock: MockObject) {
    this.config = mock.config;
    this.hooks = mock.hooks;
    this.plugins = [];
  }
  installPlugins() {
    this.plugins = this.plugins.concat([
      ...this.config.plugins
    ]);
    this.plugins.forEach((plugin: Function) => {
      if (typeof plugin === 'function') {
        plugin({
          hooks: this.hooks
        })
      } else {
        console.warn(`${plugin} is not a funciton`)
      }
    });
  }
  enhance(ctx: Context) {
    const { plugins, config, hooks } = this;
    Object.assign(ctx, {
      mock: {
        config,
        plugins,
        hooks,
        utils
      }
    });
  }
  routes() {
    return async (ctx: Context, next: Function):Promise<any> => {
      await next();
    }
  }
}