// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
    CHANGE_USER_NAME,
  } from './constants';
  
  export function changeUserName(username) {
    return {
      type: CHANGE_USER_NAME,
      payload: username
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case CHANGE_USER_NAME:
        return {
          ...state,
          username:action.payload,
        };
  
      default:
        return state;
    }
  }
  