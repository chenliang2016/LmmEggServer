import {
    FILE_GET_AFILE_LIST_BEGIN,
    FILE_GET_AFILE_LIST_SUCCESS,
    FILE_GET_AFILE_LIST_FAILURE,
    FILE_GET_AFILE_LIST_DISMISS_ERROR,
  } from './constants';
  
  import request from '../../../utils/request'
  // Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
  // If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
  export function getAfileList(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: FILE_GET_AFILE_LIST_BEGIN,
      });
     params.size = 10;

     const promise = new Promise((resolve, reject) => {
          request({
            method:'post',
            url:'/api/b/file/list',
            data:params,
          }).then( data => {
              dispatch({
                  type: FILE_GET_AFILE_LIST_SUCCESS,
                  data: Object.assign({},data,{page:params.page}),
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: FILE_GET_AFILE_LIST_FAILURE,
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
  export function dismissGetAfileListError() {
    return {
      type: FILE_GET_AFILE_LIST_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case FILE_GET_AFILE_LIST_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          getAfileListPending: true,
          getAfileListError: null,
        };
  
      case FILE_GET_AFILE_LIST_SUCCESS:
        // The request is success
  
        const byId = {};
        const items = [];
        action.data.list.forEach(item => {
          items.push(item.id);
          byId[item.id] = item;
        });
        return {
          ...state,
          afileById:byId,
          afileList:items,
          afilePage: action.data.page,
          afileSize: action.data.size,
          afileTotal: action.data.total,
          getAfileListPending: false,
          getAfileListError: null,
        };
  
      case FILE_GET_AFILE_LIST_FAILURE:
        // The request is failed
        return {
          ...state,
          getAfileListPending: false,
          getAfileListError: action.data.error,
        };
  
      case FILE_GET_AFILE_LIST_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          getAfileListError: null,
        };
  
      default:
        return state;
    }
  }