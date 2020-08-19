'use strict';

const Controller = require('egg').Controller;

class FrontController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';a
    // ctx.body = await ctx.renderString('{{ name }}', { name: 'local' });
    // not need to assign `ctx.render` to `ctx.body`
    await ctx.render('test.nj', { name: 'view test' });
  }
}

module.exports = FrontController;
