import { Context } from 'koa';
import { MockConfig, MockObject } from '../types';

import MockPathPlugin from '../plugins/mock-path-plugin';
import JsMockPlugin from '../plugins/js-mock-plugin';
import JsonMockPlugin from '../plugins/json-mock-plugin';
import Base from './base';

import * as BodyParser from 'koa-bodyparser';

export default class Local extends Base {
  private bodyParser: Function;
  protected plugins: Array<Function>;

  constructor(mock: MockObject) {
    super(mock);
    this.plugins = [
      MockPathPlugin(),
      JsonMockPlugin(),
      JsMockPlugin()
    ];

    this.installPlugins();
  }
  routes() {
    return async (ctx: Context, next: Function):Promise<any> => {
      try {
        ctx.type = 'application/json';
        if (typeof ctx.body !== 'string') {
          try {
            ctx.body = JSON.stringify(ctx.body);
          } catch(err) {
            console.warn(`json stringify error: ${err}`);
          }
        }
        ctx.status = 200;
      } catch(err) {
        next();
      }
    }
  }
}