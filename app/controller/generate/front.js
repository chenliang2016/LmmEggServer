'use strict';

const Controller = require('../../core/base_controller');
const fs = require('fs')

class FrontController extends Controller {
  async index() {
    const { ctx } = this;

    const params = {
        table:"cc_user",
        class_name:"User",
        package: "com.lmm",
        isCopyToApp: "",
    }

    const templ = await ctx.renderView('generate/node/node_controller_templates.nj', params);
    console.log(templ);
    console.log(__dirname)

    let __distFilePath = __dirname.replace("/controller/generate","") + "/public";

    console.log(__distFilePath)


    fs.writeFile(__distFilePath + '/message.js', templ , 'utf8', () => {});
    this.success("执行成功");
  }

  async generateFile(tempString,dir){
      
  }
}

module.exports = FrontController;
