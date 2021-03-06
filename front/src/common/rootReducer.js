import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import loginReducer from '../features/login/redux/reducer';
import demoReducer from '../features/demo/redux/reducer';
import errorReducer from '../features/error/redux/reducer';
import systemReducer from '../features/system/redux/reducer';
import generateReducer from '../features/generate/redux/reducer';
import adminReducer from '../features/admin/redux/reducer';
import fileReducer from '../features/file/redux/reducer';
import roleReducer from '../features/role/redux/reducer';
import infoReducer from '../features/info/redux/reducer';
// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: routerReducer,
  home: homeReducer,
  common: commonReducer,
  login: loginReducer,
  demo: demoReducer,
  error: errorReducer,
  system: systemReducer,
  generate: generateReducer,
  admin: adminReducer,
  file: fileReducer,
  role: roleReducer,
  info: infoReducer,
};

export default combineReducers(reducerMap);
