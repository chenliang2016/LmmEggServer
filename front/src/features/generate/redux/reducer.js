// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as submitNodeReducer } from './submitNode';
import { reducer as submitFrontReducer } from './submitFront';
import { reducer as getMysqltableListReducer } from './getMysqltableList';
import { reducer as submitMysqltableReducer } from './submitMysqltable';
import { reducer as deleteMysqltableReducer } from './deleteMysqltable';
import { reducer as mysqltableModalChangeReducer } from './mysqltableModalChange';
import { reducer as chooseCurrentMysqltableReducer } from './chooseCurrentMysqltable';

const reducers = [
  submitNodeReducer,
  submitFrontReducer,
  getMysqltableListReducer,
  submitMysqltableReducer,
  deleteMysqltableReducer,
  mysqltableModalChangeReducer,
  chooseCurrentMysqltableReducer,
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
