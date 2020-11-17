// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ROLE_ON_CHECK_KEYS,
} from './constants';

export function onCheckKeys(checkMenuKeys) {
  return {
    type: ROLE_ON_CHECK_KEYS,
    data:checkMenuKeys,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ROLE_ON_CHECK_KEYS:
      return {
        ...state,
        checkMenuKeys:action.data,
      };

    default:
      return state;
  }
}
