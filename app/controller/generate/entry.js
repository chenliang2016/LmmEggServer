const _ = require('lodash');
const fileUtil = require('../../utils/fileUtil');

function addToRoute(feature, component, args) {
   
    args = args || {};
    const urlPath = args.urlPath || _.kebabCase(component);
    const targetPath = utils.mapFeatureFile(feature, 'route.js');
    const lines = fileUtil.getLines(targetPath);
    let i = refactor.lineIndex(lines, "} from './index';");
    lines.splice(i, 0, `  ${_.pascalCase(component)},`);
    i = refactor.lineIndex(lines, "path: '*'");
    if (i === -1) {
      i = refactor.lastLineIndex(lines, /^ {2}]/);
    }
    lines.splice(
      i,
      0,
      `    { path: '${urlPath}', name: '${args.pageName ||
        _.upperFirst(_.lowerCase(component))}', component: ${_.pascalCase(component)}${
        args.isIndex ? ', isIndex: true' : ''
      } },`
    );
    vio.save(targetPath, lines);
  }


module.exports = {
    addToRoute
}