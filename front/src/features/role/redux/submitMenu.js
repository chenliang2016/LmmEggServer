import {
    ROLE_SUBMIT_MENU_BEGIN,
    ROLE_SUBMIT_MENU_SUCCESS,
    ROLE_SUBMIT_MENU_FAILURE,
    ROLE_SUBMIT_MENU_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'

export function submitMenu(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: ROLE_SUBMIT_MENU_BEGIN,
      });
  
      let apiurl = '/api/b/menu/add';
    
    if (params.id != undefined){
      apiurl = '/api/b/menu/update';
    }

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:apiurl,
          data: params,
        }).then( data => {
            dispatch({
                type: ROLE_SUBMIT_MENU_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: ROLE_SUBMIT_MENU_FAILURE,
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
  export function dismissSubmitMenuError() {
    return {
      type: ROLE_SUBMIT_MENU_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case ROLE_SUBMIT_MENU_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          submitMenuPending: true,
          submitMenuError: null,
        };
  
      case ROLE_SUBMIT_MENU_SUCCESS:
        // The request is success
        return {
          ...state,
          submitMenuPending: false,
          submitMenuError: null,
        };
  
      case ROLE_SUBMIT_MENU_FAILURE:
        // The request is failed
        return {
          ...state,
          submitMenuPending: false,
          submitMenuError: action.data.error,
        };
  
      case ROLE_SUBMIT_MENU_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          submitMenuError: null,
        };
  
      default:
        return state;
    }
  }
  