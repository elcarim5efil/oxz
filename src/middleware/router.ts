import { Context } from 'koa';
import JSONReader from '../helpers/json-reader';

export default class Router {
  constructor() {

  }
  routes() {
    return async function(ctx: Context, next: Function) {
      try {
        await ctx.mock.hooks.emit('requested', ctx);

        const data = await ctx.mock.JSONReader.read();
        ctx.body = data;

        await ctx.mock.hooks.emit('jsonRead', ctx);

        ctx.type = 'application/json';
        if (typeof ctx.body !== 'string') {
          try {
            ctx.body = JSON.stringify(ctx.body);
          } catch(err) {
            console.warn(`json stringify error: ${err}`);
          }
        }
        ctx.status = 200;

        await ctx.mock.hooks.emit('beforeResponse', ctx);
      } catch(err) {
        console.log(err)
        next();
      }
    }
  }
}