import {
  ROLE_SAVE_ROLE_MENU_BEGIN,
  ROLE_SAVE_ROLE_MENU_SUCCESS,
  ROLE_SAVE_ROLE_MENU_FAILURE,
  ROLE_SAVE_ROLE_MENU_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function saveRoleMenu(params = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ROLE_SAVE_ROLE_MENU_BEGIN,
    });

    let apiurl = '/api/b/role/configRole';
 

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:apiurl,
          data: params,
        }).then( data => {
            dispatch({
                type: ROLE_SAVE_ROLE_MENU_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: ROLE_SAVE_ROLE_MENU_FAILURE,
              data: { error: error },
            });
            reject(error);
        })
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSaveRoleMenuError() {
  return {
    type: ROLE_SAVE_ROLE_MENU_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ROLE_SAVE_ROLE_MENU_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        saveRoleMenuPending: true,
        saveRoleMenuError: null,
      };

    case ROLE_SAVE_ROLE_MENU_SUCCESS:
      // The request is success
      return {
        ...state,
        saveRoleMenuPending: false,
        saveRoleMenuError: null,
      };

    case ROLE_SAVE_ROLE_MENU_FAILURE:
      // The request is failed
      return {
        ...state,
        saveRoleMenuPending: false,
        saveRoleMenuError: action.data.error,
      };

    case ROLE_SAVE_ROLE_MENU_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        saveRoleMenuError: null,
      };

    default:
      return state;
  }
}
