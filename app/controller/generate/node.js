'use strict';
const Controller = require('../../core/base_controller');
const fs = require('fs');
const {toZip} = require('../../utils/fileZip');
const fileUtil = require('../../utils/fileUtil');

function capitalize(paramString){
    return paramString.charAt(0).toUpperCase() + paramString.slice(1)
  }

class NodeController extends Controller {
  async index() {
    const {ctx} = this;
    const params = ctx.request.body;
    const class_name = params.class_name;
    const packageString = params.package

    await this.generateController(ctx,params);
    await this.generateService(ctx,params);

    if(params.isFront != undefined && params.isFront == 1){

        const feature = params.feature;

        const p = {
            isToDir:params.isToDir,
            modal:class_name,
            package:feature,
            feature:feature.toUpperCase(),
            deleteUrl:`/api/b/${class_name}/delete`,
            listUrl:`/api/b/${class_name}/list`,
            addUrl:`/api/b/${class_name}/add`,
            updateUrl:`/api/b/${class_name}/update`,
        }
    
        await this.generateActions(p)
        await this.generateConstants(p)
        await this.generateInitStates(p)
        await this.generateReducer(p)

        await this.generateCRUDActions(p)
        await this.generatePages(p)
    }
 
    // let __distFilePath = __dirname.replace("/controller/generate","") + "/public/generate" ;
    // let packagePath = packageString.replace('.',"/");
    // __distFilePath = __distFilePath + "/" + packagePath + "/";

    // let outPutFile = __dirname.replace("/controller/generate","") + "/public/" + class_name + ".zip" ;
    // toZip(__distFilePath,outPutFile)
    // this.success("http://" + ctx.host + "/public/" + class_name + '.zip');
    this.success();
  }

 
  async generateController(ctx,params){
    const packageString = params.package
    const class_name = params.class_name;

    const templ = await ctx.renderView('generate/node/node_controller_templates.nj', params);
    let __distFilePath = "";
    if(params.isToDir == 1){
        __distFilePath = __dirname.replace("/controller/generate","") + "/controller" ;
        let packagePath = packageString.replace('.',"/");
        __distFilePath = __distFilePath + "/" + packagePath + "/";
    }else{
        __distFilePath = __dirname.replace("/controller/generate","") + "/public/generate" ;
        let packagePath = packageString.replace('.',"/");
        __distFilePath = __distFilePath + "/" + packagePath + "/controller/" ;
    }
    if (!fs.existsSync(__distFilePath)) {
      fs.mkdirSync(__distFilePath, { recursive: true });
    }
    fs.writeFile(__distFilePath + `${class_name}.js`, templ , 'utf8', () => {});
  }

  async generateService(ctx,params){
    const packageString = params.package
    const class_name = params.class_name;

    const templ = await ctx.renderView('generate/node/node_service_templates.nj', params);
    let __distFilePath = "";
    if(params.isToDir == 1){
        __distFilePath = __dirname.replace("/controller/generate","") + "/service" ;
        let packagePath = packageString.replace('.',"/");
        __distFilePath = __distFilePath + "/" + packagePath + "/";
    }else{
        __distFilePath = __dirname.replace("/controller/generate","") + "/public/generate" ;
        let packagePath = packageString.replace('.',"/");
        __distFilePath = __distFilePath + "/" + packagePath + "/service/";
    }
    if (!fs.existsSync(__distFilePath)) {
      fs.mkdirSync(__distFilePath, { recursive: true });
    }
    fs.writeFile(__distFilePath + `${class_name}.js`, templ , 'utf8', () => {});
  }
  
  async generateActions(params){
    const feature = params.feature
    const modal = params.modal;
    const packageString = params.package
    const modalUpperCase = capitalize(modal);
    const c = {
      'feature': feature,
      'listName': 'get'+modalUpperCase+'List',
      'submitName': 'submit'+modalUpperCase,
      'deleteName': 'delete'+modalUpperCase,
      'modalName': modal+'ModalChange',
      'chooseCurrentName': 'chooseCurrent'+modalUpperCase,
      'listNameError':  capitalize('get'+modalUpperCase+'List'),
      'submitNameError':  capitalize('submit'+modalUpperCase),
      'deleteError':  capitalize('delete'+modalUpperCase)
    }
    let packagePath = packageString.replace('.',"/");
    return await this.generateActionsFile('generate/front/actions.nj',c,packagePath,'actions.js',"redux/",params.isToDir)
  }

  async generateConstants(params){
    const feature = params.feature
    const modal = params.modal;
    const packageString = params.package
    const modalUpcase = modal.toUpperCase()
    const featureUpcase = feature.toUpperCase()
    const c = {
        'feature': featureUpcase,
        'modalUpcase': modalUpcase,
    }

    let packagePath = packageString.replace('.',"/");
    return await this.generateConstantsFile('generate/front/constants.nj',c,packagePath,'constants.js',"redux/",params.isToDir)
  }

  async generateCRUDActions(params){
    const feature = params.feature
    const modal = params.modal;
    const packageString = params.package
    const modalUpcase = modal.toUpperCase()
    const featureUpcase = feature.toUpperCase()
    const modalCapitalize = capitalize(modal);
    const c = {
        'modal': modal,
        'feature': featureUpcase,
        'modalUpcase': modalUpcase,
        'modalCapitalize': modalCapitalize,
        'deleteUrl':params.deleteUrl,
        'listUrl':params.listUrl,
        'addUrl': params.addUrl,
        'updateUrl': params.updateUrl
    }
 
    let packagePath = packageString.replace('.',"/") ;
    await this.generateFile('generate/front/chooseCurrentAction.nj',c,packagePath,'chooseCurrent'+modalCapitalize + '.js',"redux/",params.isToDir)
    await this.generateFile('generate/front/deleteAction.nj',c,packagePath,'delete'+modalCapitalize + '.js',"redux/",params.isToDir)
    await this.generateFile('generate/front/listAction.nj',c,packagePath,'get'+modalCapitalize+'List' + '.js',"redux/",params.isToDir)
    await this.generateFile('generate/front/modalChange.nj',c,packagePath,modal + 'ModalChange' + '.js',"redux/",params.isToDir)
    return await this.generateFile('generate/front/submitAction.nj',c,packagePath,'submit'+ modalCapitalize + '.js',"redux/",params.isToDir)
  }

  async generateInitStates(params){
    const modal = params.modal;
    const packageString = params.package
    const modalCapitalize = capitalize(modal);
    const c = {
        'modal': modal,
        'modalCapitalize': modalCapitalize,
    }
 
    let packagePath = packageString.replace('.',"/") ;
    
    return await this.generateInitFile('generate/front/initialState.nj',c,packagePath,'initialState.js',"redux/",params.isToDir)
  }

  async generateReducer(params){
    const feature = params.feature
    const modal = params.modal;
    const packageString = params.package
    const modalUpcase = modal.toUpperCase()
    const featureUpcase = feature.toUpperCase()
    const modalCapitalize = capitalize(modal);
    const c = {
        'modal': modal,
        'featureUpcase': featureUpcase,
        'modalUpcase': modalUpcase,
        'modalCapitalize': modalCapitalize,
    }
    let packagePath = packageString.replace('.',"/") ;
    return await this.generateReducerFile('generate/front/reducer.nj',c,packagePath,'reducer.js',"redux/",params.isToDir)
  }

  async generatePages(params){
    const feature = params.feature
    const modal = params.modal;
    const packageString = params.package
    const modalUpcase = modal.toUpperCase()
    const featureUpcase = feature.toUpperCase()
    const modalCapitalize = capitalize(modal);
    const c = {
        'modal': modal,
        'feature': feature.toLowerCase(),
        'modalUpcase': modalUpcase,
        'featureUpcase': featureUpcase,
        'modalCapitalize': modalCapitalize,
    }
 
    let packagePath = packageString.replace('.',"/") + "/";
    return await this.generateFile('generate/front/page.nj',c,packagePath,modalCapitalize + 'Page' + '.js',"",params.isToDir)
  }

  async generateFile(tmplUrl,params,packagePath,fileName,subDir,isToDir){
    const {ctx} = this;
    const templ = await ctx.renderView(tmplUrl, params);
    let __distFilePath = "";

    if(isToDir != undefined && isToDir == 1){
        __distFilePath = __dirname.replace("/app/controller/generate","/front/src/features")  ;
        __distFilePath = __distFilePath + "/" + packagePath + "/";
    }else{
        __distFilePath = __dirname.replace("/controller/generate","") + "/public/generate" ;
        __distFilePath = __distFilePath + "/" + packagePath + "/" ;
    }
    console.log("__distFilePath",__distFilePath)

    if (subDir){
      __distFilePath = __distFilePath + subDir
    }
    if (!fs.existsSync(__distFilePath)) {
      fs.mkdirSync(__distFilePath, { recursive: true });
    }

    console.log("前端地址")
    console.log(__distFilePath)

    fs.writeFile(__distFilePath + fileName, templ , 'utf8', () => {});
    return {distDir:__distFilePath};
  }

  async generateActionsFile(tmplUrl,params,packagePath,fileName,subDir,isToDir){
    const {ctx} = this;
    const templ = await ctx.renderView(tmplUrl, params);
    let __distFilePath = "";

    if(isToDir != undefined && isToDir == 1){
        __distFilePath = __dirname.replace("/app/controller/generate","/front/src/features")  ;
        __distFilePath = __distFilePath + "/" + packagePath + "/";
    }else{
        __distFilePath = __dirname.replace("/controller/generate","") + "/public/generate" ;
        __distFilePath = __distFilePath + "/" + packagePath + "/" ;
    }
    console.log("__distFilePath",__distFilePath)

    if (subDir){
      __distFilePath = __distFilePath + subDir
    }
    if (!fs.existsSync(__distFilePath)) {
      fs.mkdirSync(__distFilePath, { recursive: true });
    }
    console.log("前端地址",__distFilePath + fileName)

    try {
        const lines = fileUtil.getLines(__distFilePath + fileName);
        const i = fileUtil.lastLineIndex(lines, /^export /);
        lines.splice(i + 1, 0, templ);
        console.log("内容",lines)
        fs.writeFileSync(__distFilePath + fileName, lines.join("\n"));
    }catch {
        fs.writeFile(__distFilePath + fileName, templ , 'utf8', () => {});
    }
  
    return {distDir:__distFilePath};
  }

  async generateConstantsFile(tmplUrl,params,packagePath,fileName,subDir,isToDir){
    const {ctx} = this;
    const templ = await ctx.renderView(tmplUrl, params);
    let __distFilePath = "";

    if(isToDir != undefined && isToDir == 1){
        __distFilePath = __dirname.replace("/app/controller/generate","/front/src/features")  ;
        __distFilePath = __distFilePath + "/" + packagePath + "/";
    }else{
        __distFilePath = __dirname.replace("/controller/generate","") + "/public/generate" ;
        __distFilePath = __distFilePath + "/" + packagePath + "/" ;
    }
    console.log("__distFilePath",__distFilePath)

    if (subDir){
      __distFilePath = __distFilePath + subDir
    }
    if (!fs.existsSync(__distFilePath)) {
      fs.mkdirSync(__distFilePath, { recursive: true });
    }
    console.log("前端地址",__distFilePath + fileName)

    try {
        const lines = fileUtil.getLines(__distFilePath + fileName);
        const i = fileUtil.lastLineIndex(lines, /^export /);
        lines.splice(i + 1, 0, templ);
        console.log("内容",lines)
        fs.writeFileSync(__distFilePath + fileName, lines.join("\n"));
    }catch {
        fs.writeFile(__distFilePath + fileName, templ , 'utf8', () => {});
    }
  
    return {distDir:__distFilePath};
  }

  async generateInitFile(tmplUrl,params,packagePath,fileName,subDir,isToDir){
    const {ctx} = this;
    let templ = await ctx.renderView(tmplUrl, params);
    let __distFilePath = "";

    if(isToDir != undefined && isToDir == 1){
        __distFilePath = __dirname.replace("/app/controller/generate","/front/src/features")  ;
        __distFilePath = __distFilePath + "/" + packagePath + "/";
    }else{
        __distFilePath = __dirname.replace("/controller/generate","") + "/public/generate" ;
        __distFilePath = __distFilePath + "/" + packagePath + "/" ;
    }
    console.log("__distFilePath",__distFilePath)

    if (subDir){
      __distFilePath = __distFilePath + subDir
    }
    if (!fs.existsSync(__distFilePath)) {
      fs.mkdirSync(__distFilePath, { recursive: true });
    }
    console.log("前端地址",__distFilePath + fileName)

    try {
        const lines = fileUtil.getLines(__distFilePath + fileName);
        const i = fileUtil.lastLineIndex(lines, /^export /);
        templ = await ctx.renderView("generate/front/initialStateWithOutExport.nj", params);
        console.log("内容",templ)
        lines.splice(i - 2, 0, templ);
        fs.writeFileSync(__distFilePath + fileName, lines.join("\n"));
    }catch {
        fs.writeFile(__distFilePath + fileName, templ , 'utf8', () => {});
    }
  
    return {distDir:__distFilePath};
  }

  async generateReducerFile(tmplUrl,params,packagePath,fileName,subDir,isToDir){
    const {ctx} = this;
    let templ = await ctx.renderView(tmplUrl, params);
    let __distFilePath = "";

    if(isToDir != undefined && isToDir == 1){
        __distFilePath = __dirname.replace("/app/controller/generate","/front/src/features")  ;
        __distFilePath = __distFilePath + "/" + packagePath + "/";
    }else{
        __distFilePath = __dirname.replace("/controller/generate","") + "/public/generate" ;
        __distFilePath = __distFilePath + "/" + packagePath + "/" ;
    }
    console.log("__distFilePath",__distFilePath)

    if (subDir){
      __distFilePath = __distFilePath + subDir
    }
    if (!fs.existsSync(__distFilePath)) {
      fs.mkdirSync(__distFilePath, { recursive: true });
    }
    console.log("前端地址",__distFilePath + fileName)

    try {
        let lines = fileUtil.getLines(__distFilePath + fileName);
        const i = fileUtil.lastLineIndex(lines, /^import /);
        templ = await ctx.renderView("generate/front/reducerSub1.nj", params);
        console.log("内容",templ)
        lines.splice(i + 1, 0, templ);
        templ = await ctx.renderView("generate/front/reducerSub2.nj", params);
        const y = fileUtil.lastLineIndex(lines, /^const reducers /);
        lines.splice(y + 1, 0, templ);
        fs.writeFileSync(__distFilePath + fileName, lines.join("\n"));
    }catch {
        fs.writeFile(__distFilePath + fileName, templ , 'utf8', () => {});
    }
  
    return {distDir:__distFilePath};
  }
  
}

module.exports = NodeController;
