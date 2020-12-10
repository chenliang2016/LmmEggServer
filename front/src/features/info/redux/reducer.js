// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as getInfoListReducer } from './getInfoList';
import { reducer as submitInfoReducer } from './submitInfo';
import { reducer as deleteInfoReducer } from './deleteInfo';
import { reducer as infoModalChangeReducer } from './infoModalChange';
import { reducer as chooseCurrentInfoReducer } from './chooseCurrentInfo';
import { reducer as getInfoCategoryListReducer } from './getInfoCategoryList';
import { reducer as submitInfoCategoryReducer } from './submitInfoCategory';
import { reducer as deleteInfoCategoryReducer } from './deleteInfoCategory';
import { reducer as infoCategoryModalChangeReducer } from './infoCategoryModalChange';
import { reducer as chooseCurrentInfoCategoryReducer } from './chooseCurrentInfoCategory';
import { reducer as getAllCategoryReducer } from './getAllCategory';
import { reducer as getQiniuTokenReducer } from './getQiniuToken';
import { reducer as getInfoDetailListReducer } from './getInfoDetailList';
import { reducer as submitInfoDetailReducer } from './submitInfoDetail';
import { reducer as deleteInfoDetailReducer } from './deleteInfoDetail';
import { reducer as infoDetailModalChangeReducer } from './infoDetailModalChange';
import { reducer as chooseCurrentInfoDetailReducer } from './chooseCurrentInfoDetail';
import { reducer as gotoAddOrEditReducer } from './gotoAddOrEdit';

const reducers = [
  getInfoDetailListReducer,
  submitInfoDetailReducer,
  deleteInfoDetailReducer,
  infoDetailModalChangeReducer,
  chooseCurrentInfoDetailReducer,
  getInfoCategoryListReducer,
  submitInfoCategoryReducer,
  deleteInfoCategoryReducer,
  infoCategoryModalChangeReducer,
  chooseCurrentInfoCategoryReducer,
  getInfoListReducer,
  submitInfoReducer,
  deleteInfoReducer,
  infoModalChangeReducer,
  chooseCurrentInfoReducer,
  getAllCategoryReducer,
  getQiniuTokenReducer,
  gotoAddOrEditReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
