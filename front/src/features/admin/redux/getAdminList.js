import {
    ADMIN_GET_ADMIN_LIST_BEGIN,
    ADMIN_GET_ADMIN_LIST_SUCCESS,
    ADMIN_GET_ADMIN_LIST_FAILURE,
    ADMIN_GET_ADMIN_LIST_DISMISS_ERROR,
  } from './constants';
  
  import request from '../../../utils/request'
  // Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
  // If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
  export function getAdminList(page) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: ADMIN_GET_ADMIN_LIST_BEGIN,
      });

      let params = {
        page:page,
        size:10
      }
  
     const promise = new Promise((resolve, reject) => {
          request({
            method:'get',
            url:'/v1/sys/user/page',
            data:params,
          }).then( data => {
              dispatch({
                  type: ADMIN_GET_ADMIN_LIST_SUCCESS,
                  data: data,
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: ADMIN_GET_ADMIN_LIST_FAILURE,
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
  export function dismissGetAdminListError() {
    return {
      type: ADMIN_GET_ADMIN_LIST_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_GET_ADMIN_LIST_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          getAdminListPending: true,
          getAdminListError: null,
        };
  
      case ADMIN_GET_ADMIN_LIST_SUCCESS:
        // The request is success
  
        const byId = {};
        const items = [];
        action.data.list.forEach(item => {
          items.push(item.id);
          byId[item.id] = item;
        });
        return {
          ...state,
          adminById:byId,
          adminList:items,
          adminPage: action.data.page,
          adminSize: action.data.size,
          adminTotal: action.data.total,
          getAdminListPending: false,
          getAdminListError: null,
        };
  
      case ADMIN_GET_ADMIN_LIST_FAILURE:
        // The request is failed
        return {
          ...state,
          getAdminListPending: false,
          getAdminListError: action.data.error,
        };
  
      case ADMIN_GET_ADMIN_LIST_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          getAdminListError: null,
        };
  
      default:
        return state;
    }
  }