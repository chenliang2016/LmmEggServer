import {
  ROLE_GET_ALL_ROLE_BEGIN,
  ROLE_GET_ALL_ROLE_SUCCESS,
  ROLE_GET_ALL_ROLE_FAILURE,
  ROLE_GET_ALL_ROLE_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getAllRole(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ROLE_GET_ALL_ROLE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:'/api/b/role/list',
        }).then( data => {
            dispatch({
                type: ROLE_GET_ALL_ROLE_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: ROLE_GET_ALL_ROLE_FAILURE,
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
export function dismissGetAllRoleError() {
  return {
    type: ROLE_GET_ALL_ROLE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ROLE_GET_ALL_ROLE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getAllRolePending: true,
        getAllRoleError: null,
      };

    case ROLE_GET_ALL_ROLE_SUCCESS:
      // The request is success
      return {
        ...state,
        getAllRolePending: false,
        getAllRoleError: null,
        allRole:action.data.list,
      };

    case ROLE_GET_ALL_ROLE_FAILURE:
      // The request is failed
      return {
        ...state,
        getAllRolePending: false,
        getAllRoleError: action.data.error,
      };

    case ROLE_GET_ALL_ROLE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getAllRoleError: null,
      };

    default:
      return state;
  }
}
