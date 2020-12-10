import {
  INFO_GET_ALL_CATEGORY_BEGIN,
  INFO_GET_ALL_CATEGORY_SUCCESS,
  INFO_GET_ALL_CATEGORY_FAILURE,
  INFO_GET_ALL_CATEGORY_DISMISS_ERROR,
} from './constants';
  import request from '../../../utils/request'
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getAllCategory(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: INFO_GET_ALL_CATEGORY_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
          request({
            method:'post',
            url:'/api/b/infoCategory/list',
          }).then( data => {
              dispatch({
                  type: INFO_GET_ALL_CATEGORY_SUCCESS,
                  data: data,
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: INFO_GET_ALL_CATEGORY_FAILURE,
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
export function dismissGetAllCategoryError() {
  return {
    type: INFO_GET_ALL_CATEGORY_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case INFO_GET_ALL_CATEGORY_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getAllCategoryPending: true,
        getAllCategoryError: null,
      };

    case INFO_GET_ALL_CATEGORY_SUCCESS:
      // The request is success
      const byId = {};
      const items = [];
      action.data.list.forEach(item => {
        items.push(item.id);
        byId[item.id] = item;
      });
      return {
        ...state,
        getAllCategoryPending: false,
        getAllCategoryError: null,
        allinfoCategoryList:items,
        allinfoCategoryById:byId,
      };

    case INFO_GET_ALL_CATEGORY_FAILURE:
      // The request is failed
      return {
        ...state,
        getAllCategoryPending: false,
        getAllCategoryError: action.data.error,
      };

    case INFO_GET_ALL_CATEGORY_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getAllCategoryError: null,
      };

    default:
      return state;
  }
}
