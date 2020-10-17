import initialState from './initialState';
import { reducer as getAdminListReducer } from './getAdminList';
import { reducer as submitAdminReducer } from './submitAdmin';
import { reducer as deleteAdminReducer } from './deleteAdmin';
import { reducer as adminModalChangeReducer } from './adminModalChange';
import { reducer as chooseCurrentAdminReducer } from './chooseCurrentAdmin';

const reducers = [
  getAdminListReducer,
  submitAdminReducer,
  deleteAdminReducer,
  adminModalChangeReducer,
  chooseCurrentAdminReducer,
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
