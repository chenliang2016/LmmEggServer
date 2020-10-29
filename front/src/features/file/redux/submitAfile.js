import {
    FILE_SUBMIT_AFILE_BEGIN,
    FILE_SUBMIT_AFILE_SUCCESS,
    FILE_SUBMIT_AFILE_FAILURE,
    FILE_SUBMIT_AFILE_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'

export function submitAfile(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: FILE_SUBMIT_AFILE_BEGIN,
      });
  
      let apiurl = '/api/b/file/add';
    
    if (params.id != undefined){
      apiurl = '/api/b/file/update';
    }

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:apiurl,
          data: params,
        }).then( data => {
            dispatch({
                type: FILE_SUBMIT_AFILE_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: FILE_SUBMIT_AFILE_FAILURE,
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
  export function dismissSubmitAfileError() {
    return {
      type: FILE_SUBMIT_AFILE_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case FILE_SUBMIT_AFILE_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          submitAfilePending: true,
          submitAfileError: null,
        };
  
      case FILE_SUBMIT_AFILE_SUCCESS:
        // The request is success
        return {
          ...state,
          submitAfilePending: false,
          submitAfileError: null,
        };
  
      case FILE_SUBMIT_AFILE_FAILURE:
        // The request is failed
        return {
          ...state,
          submitAfilePending: false,
          submitAfileError: action.data.error,
        };
  
      case FILE_SUBMIT_AFILE_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          submitAfileError: null,
        };
  
      default:
        return state;
    }
  }
  