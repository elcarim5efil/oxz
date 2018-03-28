import * as Koa from 'koa';
import Enhancer from './middleware/enhancer';
import Router from './middleware/router';
import * as BodyParser from 'koa-bodyparser';

class Oxz {
  private app: Koa;
  run(option: Object) {
    this.app = new Koa();
    Oxz.install(this.app, option);
    this.app.listen(3000);
    console.log('Server running in 3000');
  }
  static install(app: Koa, option: Object) {
    app.use(BodyParser());
    app.use(new Enhancer(option).enhance());
    app.use(new Router().routes());
  }
}

// new Oxz().run();
module.exports = Oxz;