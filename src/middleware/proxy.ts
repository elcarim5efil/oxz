import * as https from 'https';
import { Context } from 'koa';
import * as httpProxy from 'http-proxy';
import * as pathToRegexp from 'path-to-regexp';


function getProxyConfig(ctx: Context) {
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

export default class Proxy {
  constructor() {

  }
  proxy() {
    return async (ctx: Context, next: Function) => {
      const proxy = httpProxy.createProxyServer({});
      const { req, res, path } = ctx;

      const config = getProxyConfig(ctx);

      const proxyOption = {
        target: config.target,
      };

      if (/^https/.test(config.target)) {
        Object.assign(proxyOption, {
          agent: https.globalAgent
        });
      }

      return new Promise((resolve, reject) => {
        if (config.host) {
          ctx.headers.host = config.host;
        }

        proxy.web(
          req,
          res,
          proxyOption,
          function(e) {
            console.log('callback', e)
            resolve()
          }
        )
        proxy.on('error', (e) => {
          console.error('proxy error', e);
        });
      });

    }
  }
}