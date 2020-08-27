'use strict';
const Controller = require('../../core/base_controller');
const fs = require('fs');
const {toZip} = require('../../utils/fileZip')

class NodeController extends Controller {
  async index() {
    const {ctx} = this;
    const params = ctx.request.body;
    const class_name = params.class_name;
    const packageString = params.package

    await this.generateController(ctx,params);
    await this.generateService(ctx,params);
 
    let __distFilePath = __dirname.replace("/controller/generate","") + "/public/generate" ;
    let packagePath = packageString.replace('.',"/");
    __distFilePath = __distFilePath + "/" + packagePath + "/";

    let outPutFile = __dirname.replace("/controller/generate","") + "/public/" + class_name + ".zip" ;
    toZip(__distFilePath,outPutFile)
    this.success("http://" + ctx.host + "/public/" + class_name + '.zip');
  }

 
  async generateController(ctx,params){
    const packageString = params.package
    const class_name = params.class_name;

    const templ = await ctx.renderView('generate/node/node_controller_templates.nj', params);
    let __distFilePath = __dirname.replace("/controller/generate","") + "/public/generate" ;
    let packagePath = packageString.replace('.',"/");
    __distFilePath = __distFilePath + "/" + packagePath + "/controller/";
    if (!fs.existsSync(__distFilePath)) {
      fs.mkdirSync(__distFilePath, { recursive: true });
    }
    fs.writeFile(__distFilePath + `${class_name}.js`, templ , 'utf8', () => {});
  }

  async generateService(ctx,params){
    const packageString = params.package
    const class_name = params.class_name;

    const templ = await ctx.renderView('generate/node/node_service_templates.nj', params);
    let __distFilePath = __dirname.replace("/controller/generate","") + "/public/generate" ;
    let packagePath = packageString.replace('.',"/");
    __distFilePath = __distFilePath + "/" + packagePath + "/service/";
    if (!fs.existsSync(__distFilePath)) {
      fs.mkdirSync(__distFilePath, { recursive: true });
    }
    fs.writeFile(__distFilePath + `${class_name}.js`, templ , 'utf8', () => {});
  }
}

module.exports = NodeController;
