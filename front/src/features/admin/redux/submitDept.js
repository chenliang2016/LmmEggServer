import {
    ADMIN_SUBMIT_DEPT_BEGIN,
    ADMIN_SUBMIT_DEPT_SUCCESS,
    ADMIN_SUBMIT_DEPT_FAILURE,
    ADMIN_SUBMIT_DEPT_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'

export function submitDept(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: ADMIN_SUBMIT_DEPT_BEGIN,
      });
  
      let apiurl = '/api/b/dept/add';
    
    if (params.id != undefined){
      apiurl = '/api/b/dept/update';
    }

    if (params.pid == undefined){
      params.pid = -1;
    }

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:apiurl,
          data: params,
        }).then( data => {
            dispatch({
                type: ADMIN_SUBMIT_DEPT_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: ADMIN_SUBMIT_DEPT_FAILURE,
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
  export function dismissSubmitDeptError() {
    return {
      type: ADMIN_SUBMIT_DEPT_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_SUBMIT_DEPT_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          submitDeptPending: true,
          submitDeptError: null,
        };
  
      case ADMIN_SUBMIT_DEPT_SUCCESS:
        // The request is success
        return {
          ...state,
          submitDeptPending: false,
          submitDeptError: null,
        };
  
      case ADMIN_SUBMIT_DEPT_FAILURE:
        // The request is failed
        return {
          ...state,
          submitDeptPending: false,
          submitDeptError: action.data.error,
        };
  
      case ADMIN_SUBMIT_DEPT_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          submitDeptError: null,
        };
  
      default:
        return state;
    }
  }
  