import {
    ADMIN_SUBMIT_ACONFIG_BEGIN,
    ADMIN_SUBMIT_ACONFIG_SUCCESS,
    ADMIN_SUBMIT_ACONFIG_FAILURE,
    ADMIN_SUBMIT_ACONFIG_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'

export function submitAconfig(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: ADMIN_SUBMIT_ACONFIG_BEGIN,
      });
  
      let apiurl = '/api/b/aconfig/add';
    
    if (params.id != undefined){
      apiurl = '/api/b/aconfig/update';
    }

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:apiurl,
          data: params,
        }).then( data => {
            dispatch({
                type: ADMIN_SUBMIT_ACONFIG_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: ADMIN_SUBMIT_ACONFIG_FAILURE,
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
  export function dismissSubmitAconfigError() {
    return {
      type: ADMIN_SUBMIT_ACONFIG_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_SUBMIT_ACONFIG_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          submitAconfigPending: true,
          submitAconfigError: null,
        };
  
      case ADMIN_SUBMIT_ACONFIG_SUCCESS:
        // The request is success
        return {
          ...state,
          submitAconfigPending: false,
          submitAconfigError: null,
        };
  
      case ADMIN_SUBMIT_ACONFIG_FAILURE:
        // The request is failed
        return {
          ...state,
          submitAconfigPending: false,
          submitAconfigError: action.data.error,
        };
  
      case ADMIN_SUBMIT_ACONFIG_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          submitAconfigError: null,
        };
  
      default:
        return state;
    }
  }
  