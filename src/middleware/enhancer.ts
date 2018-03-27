import * as pathTo from 'path';
import { Context } from 'koa';
import JSONReader from '../helpers/json-reader';
import { ConfigConstructor, MockConfig } from '../helpers/config-constructor';
import Emitter from '../helpers/emitter';

import MockPathPlugin from '../plugins/mock-path-plugin';
import JsMockPlugin from '../plugins/js-mock-plugin';

export interface PluginConfig {
  hooks: Emitter;
}

export default class Ehancer {
  private hooks: Emitter;
  private config: MockConfig;
  private plugins: Array<Function>;

  constructor(config: string|Object) {
    this.config = new ConfigConstructor(config).get();
    this.hooks = new Emitter(null);
    this.plugins = [
      MockPathPlugin(),
      JsMockPlugin(),
      ...this.config.plugins
    ];
  }
  enhance() {
    this.plugins.forEach((plugin: Function) => {
      if (typeof plugin === 'function') {
        plugin({
          hooks: this.hooks
        })
      } else {
        console.warn(`${plugin} is not a funciton`)
      }
    });

    const self = this;

    return async function(ctx: Context, next: Function) {
      Object.assign(ctx, {
        mock: {
          config: self.config,
          plugins: self.plugins,
          hooks: self.hooks,
          JSONReader: new JSONReader(ctx)
        }
      });

      await next();
    }
  }
}