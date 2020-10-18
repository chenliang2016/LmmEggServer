import initialState from './initialState';
import { reducer as getAdminListReducer } from './getAdminList';
import { reducer as submitAdminReducer } from './submitAdmin';
import { reducer as deleteAdminReducer } from './deleteAdmin';
import { reducer as adminModalChangeReducer } from './adminModalChange';
import { reducer as chooseCurrentAdminReducer } from './chooseCurrentAdmin';
import { reducer as getDeptListReducer } from './getDeptList';
import { reducer as submitDeptReducer } from './submitDept';
import { reducer as deleteDeptReducer } from './deleteDept';
import { reducer as deptModalChangeReducer } from './deptModalChange';
import { reducer as chooseCurrentDeptReducer } from './chooseCurrentDept';
import { reducer as getAllDeptReducer } from './getAllDept';

const reducers = [
  getAdminListReducer,
  submitAdminReducer,
  deleteAdminReducer,
  adminModalChangeReducer,
  chooseCurrentAdminReducer,
  getDeptListReducer,
  submitDeptReducer,
  deleteDeptReducer,
  deptModalChangeReducer,
  chooseCurrentDeptReducer,
  getAllDeptReducer,
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
