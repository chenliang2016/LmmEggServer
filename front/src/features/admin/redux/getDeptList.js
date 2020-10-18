import {
    ADMIN_GET_DEPT_LIST_BEGIN,
    ADMIN_GET_DEPT_LIST_SUCCESS,
    ADMIN_GET_DEPT_LIST_FAILURE,
    ADMIN_GET_DEPT_LIST_DISMISS_ERROR,
  } from './constants';
  
  import request from '../../../utils/request'
  // Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
  // If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
  export function getDeptList(page) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: ADMIN_GET_DEPT_LIST_BEGIN,
      });
  
     const promise = new Promise((resolve, reject) => {
          request({
            method:'post',
            url:'/api/b/dept/list',
            data:{page:page,size:10}
          }).then( data => {
              dispatch({
                  type: ADMIN_GET_DEPT_LIST_SUCCESS,
                  data: Object.assign({},data,{page}),
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: ADMIN_GET_DEPT_LIST_FAILURE,
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
  export function dismissGetDeptListError() {
    return {
      type: ADMIN_GET_DEPT_LIST_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_GET_DEPT_LIST_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          getDeptListPending: true,
          getDeptListError: null,
        };
  
      case ADMIN_GET_DEPT_LIST_SUCCESS:
        // The request is success
  
        const byId = {};
        const items = [];
        action.data.list.forEach(item => {
          items.push(item.id);
          byId[item.id] = item;
        });
        return {
          ...state,
          deptById:byId,
          deptList:items,
          deptPage: action.data.page,
          deptSize: action.data.size,
          deptTotal: action.data.total,
          getDeptListPending: false,
          getDeptListError: null,
        };
  
      case ADMIN_GET_DEPT_LIST_FAILURE:
        // The request is failed
        return {
          ...state,
          getDeptListPending: false,
          getDeptListError: action.data.error,
        };
  
      case ADMIN_GET_DEPT_LIST_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          getDeptListError: null,
        };
  
      default:
        return state;
    }
  }