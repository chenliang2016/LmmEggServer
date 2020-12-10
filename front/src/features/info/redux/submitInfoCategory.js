import {
    INFO_SUBMIT_INFOCATEGORY_BEGIN,
    INFO_SUBMIT_INFOCATEGORY_SUCCESS,
    INFO_SUBMIT_INFOCATEGORY_FAILURE,
    INFO_SUBMIT_INFOCATEGORY_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'

export function submitInfoCategory(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: INFO_SUBMIT_INFOCATEGORY_BEGIN,
      });
  
      let apiurl = '/api/b/infoCategory/add';
    
    if (params.id != undefined){
      apiurl = '/api/b/infoCategory/update';
    }

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:apiurl,
          data: params,
        }).then( data => {
            dispatch({
                type: INFO_SUBMIT_INFOCATEGORY_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: INFO_SUBMIT_INFOCATEGORY_FAILURE,
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
  export function dismissSubmitInfoCategoryError() {
    return {
      type: INFO_SUBMIT_INFOCATEGORY_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case INFO_SUBMIT_INFOCATEGORY_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          submitInfoCategoryPending: true,
          submitInfoCategoryError: null,
        };
  
      case INFO_SUBMIT_INFOCATEGORY_SUCCESS:
        // The request is success
        return {
          ...state,
          submitInfoCategoryPending: false,
          submitInfoCategoryError: null,
        };
  
      case INFO_SUBMIT_INFOCATEGORY_FAILURE:
        // The request is failed
        return {
          ...state,
          submitInfoCategoryPending: false,
          submitInfoCategoryError: action.data.error,
        };
  
      case INFO_SUBMIT_INFOCATEGORY_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          submitInfoCategoryError: null,
        };
  
      default:
        return state;
    }
  }
  