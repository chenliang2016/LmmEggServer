import {
    GENERATE_GET_MYSQLTABLE_LIST_BEGIN,
    GENERATE_GET_MYSQLTABLE_LIST_SUCCESS,
    GENERATE_GET_MYSQLTABLE_LIST_FAILURE,
    GENERATE_GET_MYSQLTABLE_LIST_DISMISS_ERROR,
  } from './constants';
  
  import request from '../../../utils/request'
  // Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
  // If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
  export function getMysqltableList(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: GENERATE_GET_MYSQLTABLE_LIST_BEGIN,
      });
     params.size = 10;

     const promise = new Promise((resolve, reject) => {
          request({
            method:'post',
            url:'/api/generate/mysql/list',
            data:params,
          }).then( data => {
              dispatch({
                  type: GENERATE_GET_MYSQLTABLE_LIST_SUCCESS,
                  data: Object.assign({},data,{page:params.page}),
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: GENERATE_GET_MYSQLTABLE_LIST_FAILURE,
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
  export function dismissGetMysqltableListError() {
    return {
      type: GENERATE_GET_MYSQLTABLE_LIST_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case GENERATE_GET_MYSQLTABLE_LIST_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          getMysqltableListPending: true,
          getMysqltableListError: null,
        };
  
      case GENERATE_GET_MYSQLTABLE_LIST_SUCCESS:
        // The request is success
  
        const byId = {};
        const items = [];
        action.data.list.forEach(item => {
          items.push(item.table_name);
          byId[item.table_name] = item;
        });
        return {
          ...state,
          mysqltableById:byId,
          mysqltableList:items,
          mysqltablePage: action.data.page,
          mysqltableSize: action.data.size,
          mysqltableTotal: action.data.total,
          getMysqltableListPending: false,
          getMysqltableListError: null,
        };
  
      case GENERATE_GET_MYSQLTABLE_LIST_FAILURE:
        // The request is failed
        return {
          ...state,
          getMysqltableListPending: false,
          getMysqltableListError: action.data.error,
        };
  
      case GENERATE_GET_MYSQLTABLE_LIST_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          getMysqltableListError: null,
        };
  
      default:
        return state;
    }
  }