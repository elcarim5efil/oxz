import { Context } from 'koa';
import Base from './base';
import { MockObject } from '../types';

export default class Process extends Base {
  constructor(mock: MockObject) {
    super(mock);
  }
  routes() {
    return async (ctx: Context, next: Function):Promise<any> => {
      this.enhance(ctx);

      await ctx.mock.hooks.emit('requested', ctx);

      await next();

      await ctx.mock.hooks.emit('beforeResponse', ctx);
    }
  }
}