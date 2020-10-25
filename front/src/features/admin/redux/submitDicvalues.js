import {
    ADMIN_SUBMIT_DICVALUES_BEGIN,
    ADMIN_SUBMIT_DICVALUES_SUCCESS,
    ADMIN_SUBMIT_DICVALUES_FAILURE,
    ADMIN_SUBMIT_DICVALUES_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'

export function submitDicvalues(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: ADMIN_SUBMIT_DICVALUES_BEGIN,
      });
  
      let apiurl = '/api/b/dicvalues/add';
    
    if (params.id != undefined){
      apiurl = '/api/b/dicvalues/update';
    }

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:apiurl,
          data: params,
        }).then( data => {
            dispatch({
                type: ADMIN_SUBMIT_DICVALUES_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: ADMIN_SUBMIT_DICVALUES_FAILURE,
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
  export function dismissSubmitDicvaluesError() {
    return {
      type: ADMIN_SUBMIT_DICVALUES_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_SUBMIT_DICVALUES_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          submitDicvaluesPending: true,
          submitDicvaluesError: null,
        };
  
      case ADMIN_SUBMIT_DICVALUES_SUCCESS:
        // The request is success
        return {
          ...state,
          submitDicvaluesPending: false,
          submitDicvaluesError: null,
        };
  
      case ADMIN_SUBMIT_DICVALUES_FAILURE:
        // The request is failed
        return {
          ...state,
          submitDicvaluesPending: false,
          submitDicvaluesError: action.data.error,
        };
  
      case ADMIN_SUBMIT_DICVALUES_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          submitDicvaluesError: null,
        };
  
      default:
        return state;
    }
  }
  