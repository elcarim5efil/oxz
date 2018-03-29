import * as Koa from 'koa';
import * as compose from 'koa-compose';
import * as BodyParser from 'koa-bodyparser';
import { ConfigConstructor, Emitter } from './helpers';
import { MockConfig, MockObject } from './types';
import { Session, Local, Proxy } from './middlewares';

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
    const hooks = new Emitter(null);

    const mock = {
      config,
      hooks
    };

    const enableProxy = config.proxy && config.proxy.enable;
    const middlewares = [];

    // middlewares.push(BodyParser());
    
    middlewares.push(new Session(mock).routes());

    if (enableProxy) {
      middlewares.push(new Proxy(mock).routes());
    } else {
      middlewares.push(new Local(mock).routes());
    }

    return compose(middlewares)
  }

  static install(app: Koa, option: Object|string) {
    app.use(Oxz.middleware(option));
  }
}

// new Oxz().run(require('../test/example/config'));

module.exports = Oxz;