// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as getMenuListReducer } from './getMenuList';
import { reducer as submitMenuReducer } from './submitMenu';
import { reducer as deleteMenuReducer } from './deleteMenu';
import { reducer as menuModalChangeReducer } from './menuModalChange';
import { reducer as chooseCurrentMenuReducer } from './chooseCurrentMenu';
import { reducer as getMenuTreeReducer } from './getMenuTree';
import { reducer as getRoleListReducer } from './getRoleList';
import { reducer as submitRoleReducer } from './submitRole';
import { reducer as deleteRoleReducer } from './deleteRole';
import { reducer as roleModalChangeReducer } from './roleModalChange';
import { reducer as chooseCurrentRoleReducer } from './chooseCurrentRole';
import { reducer as onCheckKeysReducer } from './onCheckKeys';
import { reducer as saveRoleMenuReducer } from './saveRoleMenu';
import { reducer as getRoleMenuReducer } from './getRoleMenu';
import { reducer as getAllRoleReducer } from './getAllRole';

const reducers = [
  getRoleListReducer,
  submitRoleReducer,
  deleteRoleReducer,
  roleModalChangeReducer,
  chooseCurrentRoleReducer,
  getMenuListReducer,
  submitMenuReducer,
  deleteMenuReducer,
  menuModalChangeReducer,
  chooseCurrentMenuReducer,
  getMenuTreeReducer,
  onCheckKeysReducer,
  saveRoleMenuReducer,
  getRoleMenuReducer,
  getAllRoleReducer,
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
