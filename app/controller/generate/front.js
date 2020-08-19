'use strict';

const Controller = require('egg').Controller;
const fs = require('fs')

class FrontController extends Controller {
  async index() {
    const { ctx } = this;

    const params = {
        table:"cc_user",
        class_name:"User",
        package: "com.lmm",
    }

    const templ = await ctx.renderView('generate/node/node_controller_templates.nj', params);
    console.log(templ);
    console.log(__dirname)

    let __distFilePath = __dirname.replace("/controller/generate","") + "/public";

    console.log(__distFilePath)


    fs.writeFile(__distFilePath + '/message.js', templ , 'utf8', () => {});
    ctx.body = "执行成功"
  }

  async generateFile(tempString,dir){
      
  }
}

module.exports = FrontController;
