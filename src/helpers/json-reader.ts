import * as pathTo from 'path';
import * as fs from 'fs';
import * as json5 from 'json5';
import { Context } from 'koa';

export default class JsonReader {
  private ctx: Context;
  constructor(ctx?: Context) {
    this.ctx = ctx;
  }
  read(path: string) {
    const { ctx } = this;
    const { config } = ctx.mock;
    let mockPath = path || ctx.mock.mockPath || ctx.path;
    if (!/.json5?$/.test(mockPath)) {
      mockPath += '.json';
    }
    return new Promise((resolve, reject) => {
      const filePath = pathTo.join(config.local.root, `${mockPath}`);
      try {

        fs.readFile(filePath, (err, data) => {
          if (err) {
            reject(err);
          } else {
            try {
              const json = json5.parse(data.toString());
              resolve(json);
            } catch(err) {
              console.warn(`${filePath} parse error`);
              reject(err);
            }
          }
        })
      } catch(err) {
        console.warn(`${filePath} not found`);
        reject(err);
      }
    });
  }
  
}