import {
  GENERATE_SUBMIT_NODE_BEGIN,
  GENERATE_SUBMIT_NODE_SUCCESS,
  GENERATE_SUBMIT_NODE_FAILURE,
  GENERATE_SUBMIT_NODE_DISMISS_ERROR,
} from './constants';

import request from '../../../utils/request'

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function submitNode(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: GENERATE_SUBMIT_NODE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      request({
        url:'/api/generate/node',
        data:args,
        method:'post'
      }).then(res => {
          dispatch({
            type: GENERATE_SUBMIT_NODE_SUCCESS,
            data: res,
          });
          resolve(res);
      }).catch(e => {
         dispatch({
            type: GENERATE_SUBMIT_NODE_FAILURE,
            data: { error: e },
          });
        reject(e)
      })
    });
    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSubmitNodeError() {
  return {
    type: GENERATE_SUBMIT_NODE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case GENERATE_SUBMIT_NODE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        submitNodePending: true,
        submitNodeError: null,
      };

    case GENERATE_SUBMIT_NODE_SUCCESS:
      // The request is success
      return {
        ...state,
        submitNodePending: false,
        submitNodeError: null,
      };

    case GENERATE_SUBMIT_NODE_FAILURE:
      // The request is failed
      return {
        ...state,
        submitNodePending: false,
        submitNodeError: action.data.error,
      };

    case GENERATE_SUBMIT_NODE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        submitNodeError: null,
      };

    default:
      return state;
  }
}
