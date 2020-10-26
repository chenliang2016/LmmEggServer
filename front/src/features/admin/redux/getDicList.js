import {
  ADMIN_GET_DIC_LIST_BEGIN,
  ADMIN_GET_DIC_LIST_SUCCESS,
  ADMIN_GET_DIC_LIST_FAILURE,
  ADMIN_GET_DIC_LIST_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getDicList(dicName) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ADMIN_GET_DIC_LIST_BEGIN,
    });
    
    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:'/api/b/dicvalues/list',
          data:{dicName:dicName},
        }).then( data => {
            console.log(data)
            dispatch({
                type: ADMIN_GET_DIC_LIST_SUCCESS,
                data: Object.assign({},data,{name:dicName}),
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: ADMIN_GET_DIC_LIST_FAILURE,
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
export function dismissGetDicListError() {
  return {
    type: ADMIN_GET_DIC_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_GET_DIC_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getDicListPending: true,
        getDicListError: null,
      };

    case ADMIN_GET_DIC_LIST_SUCCESS:

      let dicTypes = state.dicTypes;
      dicTypes[action.data.name] = action.data.list;
      console.log(dicTypes)
      // The request is success
      return {
        ...state,
        getDicListPending: false,
        getDicListError: null,
        dicTypes:dicTypes,
      };

    case ADMIN_GET_DIC_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        getDicListPending: false,
        getDicListError: action.data.error,
      };

    case ADMIN_GET_DIC_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getDicListError: null,
      };

    default:
      return state;
  }
}
