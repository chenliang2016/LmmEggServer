import {
  ROLE_GET_ROLE_MENU_BEGIN,
  ROLE_GET_ROLE_MENU_SUCCESS,
  ROLE_GET_ROLE_MENU_FAILURE,
  ROLE_GET_ROLE_MENU_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getRoleMenu(params = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ROLE_GET_ROLE_MENU_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:'/api/b/role/getRoleMenu',
          data:params,
        }).then( data => {
            dispatch({
                type: ROLE_GET_ROLE_MENU_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: ROLE_GET_ROLE_MENU_FAILURE,
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
export function dismissGetRoleMenuError() {
  return {
    type: ROLE_GET_ROLE_MENU_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ROLE_GET_ROLE_MENU_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getRoleMenuPending: true,
        getRoleMenuError: null,
      };

    case ROLE_GET_ROLE_MENU_SUCCESS:
      // The request is success
      const items = [];
        action.data.forEach(item => {
          items.push(item.menuId);
        });
      return {
        ...state,
        getRoleMenuPending: false,
        getRoleMenuError: null,
        checkMenuKeys:items,
      };

    case ROLE_GET_ROLE_MENU_FAILURE:
      // The request is failed
      return {
        ...state,
        getRoleMenuPending: false,
        getRoleMenuError: action.data.error,
      };

    case ROLE_GET_ROLE_MENU_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getRoleMenuError: null,
      };

    default:
      return state;
  }
}
