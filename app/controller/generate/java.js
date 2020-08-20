'use strict';

const Controller = require('../../core/base_controller');

class JavaController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';a
    // ctx.body = await ctx.renderString('{{ name }}', { name: 'local' });
    // not need to assign `ctx.render` to `ctx.body`
    this.success("执行成功");
  }
}

module.exports = JavaController;
