import {
    ADMIN_GET_DICVALUES_LIST_BEGIN,
    ADMIN_GET_DICVALUES_LIST_SUCCESS,
    ADMIN_GET_DICVALUES_LIST_FAILURE,
    ADMIN_GET_DICVALUES_LIST_DISMISS_ERROR,
  } from './constants';
  
  import request from '../../../utils/request'
  // Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
  // If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
  export function getDicvaluesList(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: ADMIN_GET_DICVALUES_LIST_BEGIN,
      });
     params.size = 10;

     const promise = new Promise((resolve, reject) => {
          request({
            method:'post',
            url:'/api/b/dicvalues/list',
            data:params,
          }).then( data => {
              dispatch({
                  type: ADMIN_GET_DICVALUES_LIST_SUCCESS,
                  data: Object.assign({},data,{page:params.page}),
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: ADMIN_GET_DICVALUES_LIST_FAILURE,
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
  export function dismissGetDicvaluesListError() {
    return {
      type: ADMIN_GET_DICVALUES_LIST_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_GET_DICVALUES_LIST_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          getDicvaluesListPending: true,
          getDicvaluesListError: null,
        };
  
      case ADMIN_GET_DICVALUES_LIST_SUCCESS:
        // The request is success
  
        const byId = {};
        const items = [];
        action.data.list.forEach(item => {
          items.push(item.id);
          byId[item.id] = item;
        });
        return {
          ...state,
          dicvaluesById:byId,
          dicvaluesList:items,
          dicvaluesPage: action.data.page,
          dicvaluesSize: action.data.size,
          dicvaluesTotal: action.data.total,
          getDicvaluesListPending: false,
          getDicvaluesListError: null,
        };
  
      case ADMIN_GET_DICVALUES_LIST_FAILURE:
        // The request is failed
        return {
          ...state,
          getDicvaluesListPending: false,
          getDicvaluesListError: action.data.error,
        };
  
      case ADMIN_GET_DICVALUES_LIST_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          getDicvaluesListError: null,
        };
  
      default:
        return state;
    }
  }