import * as pathTo from 'path';
import { Context } from 'koa';
import { PluginConfig } from '../middleware/enhancer';

export default function(): Function {
  return function(oxz: PluginConfig) {
    oxz.hooks.on('jsonRead', async (ctx: Context) => {
      const { config, mockPath } = ctx.mock;
      const jsPath = pathTo.join(config.local.root, `${mockPath}.js`);
      delete require.cache[jsPath];
      try {
        const jsMock = require(jsPath);
        await jsMock(ctx);
      } catch(err) {
        console.warn(`${jsPath} process error: ${err}`);
      }
    });
  }
}