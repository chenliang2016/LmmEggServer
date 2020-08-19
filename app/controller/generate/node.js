'use strict';

const Controller = require('egg').Controller;

class NodeController extends Controller {
  async index() {
    const { ctx } = this;
    const templ = await ctx.renderView('generate/node/node_controller_templates.nj', { name: 'local' });
    console.log(templ);
    console.log(__dirname)

    

    fs.writeFile(__dirname + 'message.js', templ , 'utf8', () => {});
    await ctx.render('test.nj', { name: 'view test' });
  }
}

module.exports = NodeController;
