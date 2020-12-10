import {
    INFO_SUBMIT_INFODETAIL_BEGIN,
    INFO_SUBMIT_INFODETAIL_SUCCESS,
    INFO_SUBMIT_INFODETAIL_FAILURE,
    INFO_SUBMIT_INFODETAIL_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'

export function submitInfoDetail(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: INFO_SUBMIT_INFODETAIL_BEGIN,
      });
  
      let apiurl = '/api/b/infoDetail/add';
    
    if (params.id != undefined){
      apiurl = '/api/b/infoDetail/update';
    }

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:apiurl,
          data: params,
        }).then( data => {
            dispatch({
                type: INFO_SUBMIT_INFODETAIL_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: INFO_SUBMIT_INFODETAIL_FAILURE,
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
  export function dismissSubmitInfoDetailError() {
    return {
      type: INFO_SUBMIT_INFODETAIL_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case INFO_SUBMIT_INFODETAIL_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          submitInfoDetailPending: true,
          submitInfoDetailError: null,
        };
  
      case INFO_SUBMIT_INFODETAIL_SUCCESS:
        // The request is success
        return {
          ...state,
          submitInfoDetailPending: false,
          submitInfoDetailError: null,
        };
  
      case INFO_SUBMIT_INFODETAIL_FAILURE:
        // The request is failed
        return {
          ...state,
          submitInfoDetailPending: false,
          submitInfoDetailError: action.data.error,
        };
  
      case INFO_SUBMIT_INFODETAIL_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          submitInfoDetailError: null,
        };
  
      default:
        return state;
    }
  }
  