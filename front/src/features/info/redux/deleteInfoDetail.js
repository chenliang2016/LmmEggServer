import {
    INFO_DELETE_INFODETAIL_BEGIN,
    INFO_DELETE_INFODETAIL_SUCCESS,
    INFO_DELETE_INFODETAIL_FAILURE,
    INFO_DELETE_INFODETAIL_DISMISS_ERROR,
  } from './constants';
  
  import request from '../../../utils/request'
  // Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
  // If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
  export function deleteInfoDetail(id) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: INFO_DELETE_INFODETAIL_BEGIN,
      });
  
      // Return a promise so that you could control UI flow without states in the store.
      // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
      // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
      // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
      const promise = new Promise((resolve, reject) => {
          request({
            method:'post',
            url:'/api/b/infoDetail/delete',
            data:{id:id}
          }).then( data => {
              dispatch({
                  type: INFO_DELETE_INFODETAIL_SUCCESS,
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: INFO_DELETE_INFODETAIL_FAILURE,
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
  export function dismissDeleteInfoDetailError() {
    return {
      type: INFO_DELETE_INFODETAIL_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case INFO_DELETE_INFODETAIL_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          deleteInfoDetailPending: true,
          deleteInfoDetailError: null,
        };
  
      case INFO_DELETE_INFODETAIL_SUCCESS:
        // The request is success
        return {
          ...state,
          deleteInfoDetailPending: false,
          deleteInfoDetailError: null,
        };
  
      case INFO_DELETE_INFODETAIL_FAILURE:
        // The request is failed
        return {
          ...state,
          deleteInfoDetailPending: false,
          deleteInfoDetailError: action.data.error,
        };
  
      case INFO_DELETE_INFODETAIL_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          deleteInfoDetailError: null,
        };
  
      default:
        return state;
    }
  }
  