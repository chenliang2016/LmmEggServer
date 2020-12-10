import {
    INFO_GET_INFODETAIL_LIST_BEGIN,
    INFO_GET_INFODETAIL_LIST_SUCCESS,
    INFO_GET_INFODETAIL_LIST_FAILURE,
    INFO_GET_INFODETAIL_LIST_DISMISS_ERROR,
  } from './constants';
  
  import request from '../../../utils/request'
  // Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
  // If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
  export function getInfoDetailList(params) {
    return (dispatch) => { // optionally you can have getState as the second argument
      dispatch({
        type: INFO_GET_INFODETAIL_LIST_BEGIN,
      });
     params.size = 10;

     const promise = new Promise((resolve, reject) => {
          request({
            method:'post',
            url:'/api/b/infoDetail/list',
            data:params,
          }).then( data => {
              dispatch({
                  type: INFO_GET_INFODETAIL_LIST_SUCCESS,
                  data: Object.assign({},data,{page:params.page}),
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: INFO_GET_INFODETAIL_LIST_FAILURE,
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
  export function dismissGetInfoDetailListError() {
    return {
      type: INFO_GET_INFODETAIL_LIST_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case INFO_GET_INFODETAIL_LIST_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          getInfoDetailListPending: true,
          getInfoDetailListError: null,
        };
  
      case INFO_GET_INFODETAIL_LIST_SUCCESS:
        // The request is success
  
        const byId = {};
        const items = [];
        action.data.list.forEach(item => {
          items.push(item.id);
          byId[item.id] = item;
        });
        return {
          ...state,
          infoDetailById:byId,
          infoDetailList:items,
          infoDetailPage: action.data.page,
          infoDetailSize: action.data.size,
          infoDetailTotal: action.data.count,
          getInfoDetailListPending: false,
          getInfoDetailListError: null,
        };
  
      case INFO_GET_INFODETAIL_LIST_FAILURE:
        // The request is failed
        return {
          ...state,
          getInfoDetailListPending: false,
          getInfoDetailListError: action.data.error,
        };
  
      case INFO_GET_INFODETAIL_LIST_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          getInfoDetailListError: null,
        };
  
      default:
        return state;
    }
  }