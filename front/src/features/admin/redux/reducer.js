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
import { reducer as getDicnameListReducer } from './getDicnameList';
import { reducer as submitDicnameReducer } from './submitDicname';
import { reducer as deleteDicnameReducer } from './deleteDicname';
import { reducer as dicnameModalChangeReducer } from './dicnameModalChange';
import { reducer as chooseCurrentDicnameReducer } from './chooseCurrentDicname';
import { reducer as getDicvaluesListReducer } from './getDicvaluesList';
import { reducer as submitDicvaluesReducer } from './submitDicvalues';
import { reducer as deleteDicvaluesReducer } from './deleteDicvalues';
import { reducer as dicvaluesModalChangeReducer } from './dicvaluesModalChange';
import { reducer as chooseCurrentDicvaluesReducer } from './chooseCurrentDicvalues';
import { reducer as getDicListReducer } from './getDicList';

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
  getDicnameListReducer,
  submitDicnameReducer,
  deleteDicnameReducer,
  dicnameModalChangeReducer,
  chooseCurrentDicnameReducer,
  getDicvaluesListReducer,
  submitDicvaluesReducer,
  deleteDicvaluesReducer,
  dicvaluesModalChangeReducer,
  chooseCurrentDicvaluesReducer,
  getDicListReducer,
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
