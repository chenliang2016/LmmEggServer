import {
    ADMIN_SUBMIT_DICNAME_BEGIN,
    ADMIN_SUBMIT_DICNAME_SUCCESS,
    ADMIN_SUBMIT_DICNAME_FAILURE,
    ADMIN_SUBMIT_DICNAME_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'

export function submitDicname(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: ADMIN_SUBMIT_DICNAME_BEGIN,
      });
  
      let apiurl = '/api/b/dicname/add';
    
    if (params.id != undefined){
      apiurl = '/api/b/dicname/update';
    }

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:apiurl,
          data: params,
        }).then( data => {
            dispatch({
                type: ADMIN_SUBMIT_DICNAME_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: ADMIN_SUBMIT_DICNAME_FAILURE,
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
  export function dismissSubmitDicnameError() {
    return {
      type: ADMIN_SUBMIT_DICNAME_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_SUBMIT_DICNAME_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          submitDicnamePending: true,
          submitDicnameError: null,
        };
  
      case ADMIN_SUBMIT_DICNAME_SUCCESS:
        // The request is success
        return {
          ...state,
          submitDicnamePending: false,
          submitDicnameError: null,
        };
  
      case ADMIN_SUBMIT_DICNAME_FAILURE:
        // The request is failed
        return {
          ...state,
          submitDicnamePending: false,
          submitDicnameError: action.data.error,
        };
  
      case ADMIN_SUBMIT_DICNAME_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          submitDicnameError: null,
        };
  
      default:
        return state;
    }
  }
  