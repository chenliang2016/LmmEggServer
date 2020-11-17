import {
    ROLE_GET_MENU_LIST_BEGIN,
    ROLE_GET_MENU_LIST_SUCCESS,
    ROLE_GET_MENU_LIST_FAILURE,
    ROLE_GET_MENU_LIST_DISMISS_ERROR,
  } from './constants';
  
  import request from '../../../utils/request'
  // Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
  // If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
  export function getMenuList(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: ROLE_GET_MENU_LIST_BEGIN,
      });
     params.size = 10;

     const promise = new Promise((resolve, reject) => {
          request({
            method:'post',
            url:'/api/b/menu/list',
            data:params,
          }).then( data => {
              dispatch({
                  type: ROLE_GET_MENU_LIST_SUCCESS,
                  data: Object.assign({},data,{page:params.page}),
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: ROLE_GET_MENU_LIST_FAILURE,
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
  export function dismissGetMenuListError() {
    return {
      type: ROLE_GET_MENU_LIST_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case ROLE_GET_MENU_LIST_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          getMenuListPending: true,
          getMenuListError: null,
        };
  
      case ROLE_GET_MENU_LIST_SUCCESS:
        // The request is success
  
        const byId = {};
        const items = [];
        action.data.list.forEach(item => {
          items.push(item.id);
          byId[item.id] = item;
        });
        return {
          ...state,
          menuById:byId,
          menuList:items,
          menuPage: action.data.page,
          menuSize: action.data.size,
          menuTotal: action.data.total,
          getMenuListPending: false,
          getMenuListError: null,
        };
  
      case ROLE_GET_MENU_LIST_FAILURE:
        // The request is failed
        return {
          ...state,
          getMenuListPending: false,
          getMenuListError: action.data.error,
        };
  
      case ROLE_GET_MENU_LIST_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          getMenuListError: null,
        };
  
      default:
        return state;
    }
  }