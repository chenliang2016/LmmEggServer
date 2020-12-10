import {
    INFO_SUBMIT_INFO_BEGIN,
    INFO_SUBMIT_INFO_SUCCESS,
    INFO_SUBMIT_INFO_FAILURE,
    INFO_SUBMIT_INFO_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'

export function submitInfo(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: INFO_SUBMIT_INFO_BEGIN,
      });
  
      let apiurl = '/api/b/info/add';
    
    if (params.id != undefined){
      apiurl = '/api/b/info/update';
    }

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:apiurl,
          data: params,
        }).then( data => {
            dispatch({
                type: INFO_SUBMIT_INFO_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: INFO_SUBMIT_INFO_FAILURE,
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
  export function dismissSubmitInfoError() {
    return {
      type: INFO_SUBMIT_INFO_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case INFO_SUBMIT_INFO_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          submitInfoPending: true,
          submitInfoError: null,
        };
  
      case INFO_SUBMIT_INFO_SUCCESS:
        // The request is success
        return {
          ...state,
          submitInfoPending: false,
          submitInfoError: null,
        };
  
      case INFO_SUBMIT_INFO_FAILURE:
        // The request is failed
        return {
          ...state,
          submitInfoPending: false,
          submitInfoError: action.data.error,
        };
  
      case INFO_SUBMIT_INFO_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          submitInfoError: null,
        };
  
      default:
        return state;
    }
  }
  