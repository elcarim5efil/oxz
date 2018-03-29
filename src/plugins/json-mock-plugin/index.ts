import { Context } from 'koa';
import JSONReader from './json-reader';
import { PluginConfig } from '../../types';

export default function(): Function {
  return function(oxz: PluginConfig) {
    oxz.hooks.on('requested', async (ctx: Context) => {
      const data = await new JSONReader(ctx).read();
      console.log(data);
      ctx.body = data;
    });
  }
}