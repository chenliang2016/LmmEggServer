import {
    ROLE_SUBMIT_ROLE_BEGIN,
    ROLE_SUBMIT_ROLE_SUCCESS,
    ROLE_SUBMIT_ROLE_FAILURE,
    ROLE_SUBMIT_ROLE_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'

export function submitRole(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: ROLE_SUBMIT_ROLE_BEGIN,
      });
  
      let apiurl = '/api/b/role/add';
    
    if (params.id != undefined){
      apiurl = '/api/b/role/update';
    }

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:apiurl,
          data: params,
        }).then( data => {
            dispatch({
                type: ROLE_SUBMIT_ROLE_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: ROLE_SUBMIT_ROLE_FAILURE,
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
  export function dismissSubmitRoleError() {
    return {
      type: ROLE_SUBMIT_ROLE_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case ROLE_SUBMIT_ROLE_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          submitRolePending: true,
          submitRoleError: null,
        };
  
      case ROLE_SUBMIT_ROLE_SUCCESS:
        // The request is success
        return {
          ...state,
          submitRolePending: false,
          submitRoleError: null,
        };
  
      case ROLE_SUBMIT_ROLE_FAILURE:
        // The request is failed
        return {
          ...state,
          submitRolePending: false,
          submitRoleError: action.data.error,
        };
  
      case ROLE_SUBMIT_ROLE_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          submitRoleError: null,
        };
  
      default:
        return state;
    }
  }
  