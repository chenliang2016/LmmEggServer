'use strict';

const Controller = require('../../core/base_controller');
const fs = require('fs');
const moment = require('moment')
const {toZip} = require('../../utils/fileZip')

function capitalize(paramString){
  return paramString.charAt(0).toUpperCase() + paramString.slice(1)
}

class FrontController extends Controller {
  async index() {
    const { ctx } = this;
    let data = ctx.request.body;
    await this.generateActions(data)
    await this.generateConstants(data)
    await this.generateCRUDActions(data)
    await this.generateInitStates(data)
    await this.generateReducer(data)
    const distModal =  await this.generatePages(data)
    const distDir = distModal.distDir
    const randomFilePackage = distModal.randomFilePackage
    console.log(distDir)
    let outPutFile = __dirname.replace("/controller/generate","") + "/public/" + randomFilePackage + ".zip" ;
    toZip(distDir,outPutFile)
    this.success("http://" + ctx.host + "/public/" + randomFilePackage + '.zip');
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
    return await this.generateFile('generate/front/actions.nj',c,packagePath,'actions.js',"redux/")
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
    return await this.generateFile('generate/front/constants.nj',c,packagePath,'constants.js',"redux/")
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
    await this.generateFile('generate/front/chooseCurrentAction.nj',c,packagePath,'chooseCurrent'+modalCapitalize + '.js',"redux/")
    await this.generateFile('generate/front/deleteAction.nj',c,packagePath,'delete'+modalCapitalize + '.js',"redux/")
    await this.generateFile('generate/front/listAction.nj',c,packagePath,'get'+modalCapitalize+'List' + '.js',"redux/")
    await this.generateFile('generate/front/modalChange.nj',c,packagePath,modal + 'ModalChange' + '.js',"redux/")
    return await this.generateFile('generate/front/submitAction.nj',c,packagePath,'submit'+ modalCapitalize + '.js',"redux/")
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
    return await this.generateFile('generate/front/initialState.nj',c,packagePath,'initialState.js',"redux/")
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
    return await this.generateFile('generate/front/reducer.nj',c,packagePath,'reducer.js',"redux/")
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
    return await this.generateFile('generate/front/page.nj',c,packagePath,modalCapitalize + 'Page' + '.js')
  }

  async generateFile(tmplUrl,params,packagePath,fileName,subDir){
    const {ctx} = this;
    const templ = await ctx.renderView(tmplUrl, params);
    let __distFilePath = __dirname.replace("/controller/generate","") + "/public/generate" ;
    let randomFilePackage = moment().format("YYYYMMDDHHmmss")
    __distFilePath = __distFilePath + "/" + packagePath + "/" + randomFilePackage + "/" ;
    if (subDir){
      __distFilePath = __distFilePath + subDir
    }
    if (!fs.existsSync(__distFilePath)) {
      fs.mkdirSync(__distFilePath, { recursive: true });
    }
    fs.writeFile(__distFilePath + fileName, templ , 'utf8', () => {});
    return {distDir:__distFilePath,randomFilePackage};
  }
}

module.exports = FrontController;
