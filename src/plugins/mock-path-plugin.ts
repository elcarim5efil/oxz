import { Context } from 'koa';
import { PluginConfig } from '../middleware/enhancer';
import * as pathTo from 'path';

export default function() {
  return function(oxz: PluginConfig) {
    oxz.hooks.on('requested', (ctx: Context) => {
      ctx.mock.mockPath = pathTo.join(ctx.path, 'data');
    });
  }
}