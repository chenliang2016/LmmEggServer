import {
    GENERATE_DELETE_MYSQLTABLE_BEGIN,
    GENERATE_DELETE_MYSQLTABLE_SUCCESS,
    GENERATE_DELETE_MYSQLTABLE_FAILURE,
    GENERATE_DELETE_MYSQLTABLE_DISMISS_ERROR,
  } from './constants';
  
  import request from '../../../utils/request'
  // Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
  // If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
  export function deleteMysqltable(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: GENERATE_DELETE_MYSQLTABLE_BEGIN,
      });
  
      // Return a promise so that you could control UI flow without states in the store.
      // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
      // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
      // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
      const promise = new Promise((resolve, reject) => {
          request({
            method:'post',
            url:'/api/generate/mysql/list',
            data:{id:id}
          }).then( data => {
              dispatch({
                  type: GENERATE_DELETE_MYSQLTABLE_SUCCESS,
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: GENERATE_DELETE_MYSQLTABLE_FAILURE,
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
  export function dismissDeleteMysqltableError() {
    return {
      type: GENERATE_DELETE_MYSQLTABLE_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case GENERATE_DELETE_MYSQLTABLE_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          deleteMysqltablePending: true,
          deleteMysqltableError: null,
        };
  
      case GENERATE_DELETE_MYSQLTABLE_SUCCESS:
        // The request is success
        return {
          ...state,
          deleteMysqltablePending: false,
          deleteMysqltableError: null,
        };
  
      case GENERATE_DELETE_MYSQLTABLE_FAILURE:
        // The request is failed
        return {
          ...state,
          deleteMysqltablePending: false,
          deleteMysqltableError: action.data.error,
        };
  
      case GENERATE_DELETE_MYSQLTABLE_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          deleteMysqltableError: null,
        };
  
      default:
        return state;
    }
  }
  