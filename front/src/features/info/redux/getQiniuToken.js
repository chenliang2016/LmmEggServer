import {
  INFO_GET_QINIU_TOKEN_BEGIN,
  INFO_GET_QINIU_TOKEN_SUCCESS,
  INFO_GET_QINIU_TOKEN_FAILURE,
  INFO_GET_QINIU_TOKEN_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getQiniuToken(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: INFO_GET_QINIU_TOKEN_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      request({
        method: 'post',
        url: '/api/b/file/qiniuToken',
      }).then(data => {
        dispatch({
          type: INFO_GET_QINIU_TOKEN_SUCCESS,
          data: data,
        });
        resolve(data);
      }).catch(error => {
        dispatch({
          type: INFO_GET_QINIU_TOKEN_FAILURE,
          data: { error: error },
        });
        reject(error);
      });
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetQiniuTokenError() {
  return {
    type: INFO_GET_QINIU_TOKEN_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case INFO_GET_QINIU_TOKEN_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getQiniuTokenPending: true,
        getQiniuTokenError: null,
      };

    case INFO_GET_QINIU_TOKEN_SUCCESS:
      // The request is success
      return {
        ...state,
        getQiniuTokenPending: false,
        getQiniuTokenError: null,
        qntoken:action.data,
      };

    case INFO_GET_QINIU_TOKEN_FAILURE:
      // The request is failed
      return {
        ...state,
        getQiniuTokenPending: false,
        getQiniuTokenError: action.data.error,
      };

    case INFO_GET_QINIU_TOKEN_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getQiniuTokenError: null,
      };

    default:
      return state;
  }
}
