import {
    ADMIN_GET_DICNAME_LIST_BEGIN,
    ADMIN_GET_DICNAME_LIST_SUCCESS,
    ADMIN_GET_DICNAME_LIST_FAILURE,
    ADMIN_GET_DICNAME_LIST_DISMISS_ERROR,
  } from './constants';
  
  import request from '../../../utils/request'
  // Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
  // If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
  export function getDicnameList(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: ADMIN_GET_DICNAME_LIST_BEGIN,
      });
     params.size = 10;

     const promise = new Promise((resolve, reject) => {
          request({
            method:'post',
            url:'/api/b/dicname/list',
            data:params,
          }).then( data => {
              dispatch({
                  type: ADMIN_GET_DICNAME_LIST_SUCCESS,
                  data: Object.assign({},data,{page:params.page}),
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: ADMIN_GET_DICNAME_LIST_FAILURE,
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
  export function dismissGetDicnameListError() {
    return {
      type: ADMIN_GET_DICNAME_LIST_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_GET_DICNAME_LIST_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          getDicnameListPending: true,
          getDicnameListError: null,
        };
  
      case ADMIN_GET_DICNAME_LIST_SUCCESS:
        // The request is success
  
        const byId = {};
        const items = [];
        action.data.list.forEach(item => {
          items.push(item.id);
          byId[item.id] = item;
        });
        return {
          ...state,
          dicnameById:byId,
          dicnameList:items,
          dicnamePage: action.data.page,
          dicnameSize: action.data.size,
          dicnameTotal: action.data.total,
          getDicnameListPending: false,
          getDicnameListError: null,
        };
  
      case ADMIN_GET_DICNAME_LIST_FAILURE:
        // The request is failed
        return {
          ...state,
          getDicnameListPending: false,
          getDicnameListError: action.data.error,
        };
  
      case ADMIN_GET_DICNAME_LIST_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          getDicnameListError: null,
        };
  
      default:
        return state;
    }
  }