import * as https from 'https';
import { Context } from 'koa';
import * as httpProxy from 'http-proxy';
import * as pathToRegexp from 'path-to-regexp';
import { MockConfig, MockObject } from '../types';
import Base from './base';

export default class Proxy extends Base{
  protected plugins: Array<Function>;
  private proxy: httpProxy;
  constructor(mock: MockObject) {
    super(mock);
    this.proxy = httpProxy.createProxyServer({});
  }
  routes() {
    return async (ctx: Context, next: Function):Promise<any> => {
      try {
        await this.doProxy(ctx);
      } catch(err) {
        await next();
      }
    }
  }
  async doProxy(ctx: Context) {
    return new Promise((resolve, reject) => {
      const { req, res } = ctx;
      const config = this.getProxyConfig(ctx);

      const proxyOption = {
        target: config.target,
      };

      if (/^https/.test(config.target)) {
        Object.assign(proxyOption, {
          agent: https.globalAgent
        });
      }
      if (config.host) {
        ctx.headers.host = config.host;
      }

      this.proxy.web(
        req,
        res,
        proxyOption,
        function(e) {
          console.log('callback', e)
          resolve()
        }
      )
      this.proxy.on('error', (e) => {
        console.error('proxy error', e);
      });
    });
  }
  getProxyConfig(ctx: Context) {
    const { proxy } = ctx.mock.config;

    const res = proxy.rules.find((rule: any) => {
      const match = rule.pathes.some((path: any) => {
        if (path === '*' || pathToRegexp(path).test(ctx.path)) {
          return true;
        }
      });
      return match;
    });
    return res;
  }
}