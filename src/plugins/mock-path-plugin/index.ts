import { Context } from 'koa';
import * as pathTo from 'path';
import { PluginConfig } from '../../types';

export default function() {
  return function(oxz: PluginConfig) {
    oxz.hooks.on('requested', (ctx: Context) => {
      ctx.mock.mockPath = pathTo.join(ctx.path, 'data');
    });
  }
}