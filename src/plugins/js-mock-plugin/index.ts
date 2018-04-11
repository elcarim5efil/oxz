import * as fs from 'fs';
import * as pathTo from 'path';
import { Context } from 'koa';
import { PluginConfig } from '../../types';
import * as BodyParser from 'koa-bodyparser';

const bodyParser = BodyParser();
export default function(): Function {
  return function(oxz: PluginConfig) {
    oxz.hooks.on('requested', async (ctx: Context) => {
      const { config, mockPath } = ctx.mock;
      const jsPath = pathTo.join(config.local.root, `${mockPath}.js`);
      await bodyParser(ctx, () => (Promise.resolve()));
      if (fs.existsSync(jsPath)) {
        delete require.cache[jsPath];
        try {
          const jsMock = require(jsPath);
          await jsMock(ctx);
        } catch(err) {
          console.warn(`${jsPath} process error: ${err}`);
        }
      }
    });
  }
}