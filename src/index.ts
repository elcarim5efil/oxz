import * as Koa from 'koa';
import Enhancer from './middleware/enhancer';
import Router from './middleware/router';
import Proxy from './middleware/proxy';
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
  static install(app: Koa, option: Object|string) {
    const config = new ConfigConstructor(option).get()
    const enableProxy = config.proxy && config.proxy.enable;

    app.use(new Enhancer(config).enhance());

    if (!enableProxy) {
      app.use(BodyParser());
      app.use(new Router().routes());
    } else {
      app.use(new Proxy().proxy());
    }
  }
}

new Oxz().run(require('../example/config'));

module.exports = Oxz;