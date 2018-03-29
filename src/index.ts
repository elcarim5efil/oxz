import * as Koa from 'koa';
import Enhancer from './middleware/enhancer';
import Router from './middleware/router';
import Proxy from './middleware/proxy';
import * as compose from 'koa-compose';
import * as BodyParser from 'koa-bodyparser';
import { ConfigConstructor, MockConfig } from './helpers/config-constructor';

class Oxz {
  private app: Koa;

  run(option: Object) {
    this.app = new Koa();
    Oxz.install(this.app, option);
    this.app.listen(3000);
    console.log('Server running in 3000');
  }

  static middleware(option: Object|string) {
    const config = new ConfigConstructor(option).get();
    const enableProxy = config.proxy && config.proxy.enable;
    const middlewares = [];

    middlewares.push(new Enhancer(config).enhance());

    if (!enableProxy) {
      middlewares.push(BodyParser());
      middlewares.push(new Router().routes());
    } else {
      middlewares.push(new Proxy().proxy());
    }

    return compose(middlewares)
  }

  static install(app: Koa, option: Object|string) {
    app.use(Oxz.middleware(option));
  }
}

// new Oxz().run(require('../test/example/config'));

module.exports = Oxz;