import {
    ADMIN_SUBMIT_ADMIN_BEGIN,
    ADMIN_SUBMIT_ADMIN_SUCCESS,
    ADMIN_SUBMIT_ADMIN_FAILURE,
    ADMIN_SUBMIT_ADMIN_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'

export function submitAdmin(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: ADMIN_SUBMIT_ADMIN_BEGIN,
      });
  
    let method = "post";
      let apiurl = '/v1/sys/user/insert';
    
    if (params.id != undefined){
      apiurl = '/v1/sys/user/update';
      method = "put"
    }

    const promise = new Promise((resolve, reject) => {
        request({
          method:method,
          url:apiurl,
          data: params,
        }).then( data => {
            dispatch({
                type: ADMIN_SUBMIT_ADMIN_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: ADMIN_SUBMIT_ADMIN_FAILURE,
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
  export function dismissSubmitAdminError() {
    return {
      type: ADMIN_SUBMIT_ADMIN_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_SUBMIT_ADMIN_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          submitAdminPending: true,
          submitAdminError: null,
        };
  
      case ADMIN_SUBMIT_ADMIN_SUCCESS:
        // The request is success
        return {
          ...state,
          submitAdminPending: false,
          submitAdminError: null,
        };
  
      case ADMIN_SUBMIT_ADMIN_FAILURE:
        // The request is failed
        return {
          ...state,
          submitAdminPending: false,
          submitAdminError: action.data.error,
        };
  
      case ADMIN_SUBMIT_ADMIN_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          submitAdminError: null,
        };
  
      default:
        return state;
    }
  }
  