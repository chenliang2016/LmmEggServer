// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  SYSTEM_ADD_LIST_ACTION,
} from './constants';

export function addListAction() {
  return {
    type: SYSTEM_ADD_LIST_ACTION,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SYSTEM_ADD_LIST_ACTION:
      return {
        ...state,
      };

    default:
      return state;
  }
}
