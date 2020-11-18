// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMMON_CHANGE_PASSWORD_VISIBLE,
} from './constants';

export function changePasswordVisible(changePasswordModal) {
  return {
    type: COMMON_CHANGE_PASSWORD_VISIBLE,
    data:changePasswordModal
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_CHANGE_PASSWORD_VISIBLE:
      return {
        ...state,
        changePasswordModal:action.data,
      };

    default:
      return state;
  }
}
