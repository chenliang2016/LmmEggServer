import {
  INFO_GOTO_ADD_OR_EDIT_BEGIN,
  INFO_GOTO_ADD_OR_EDIT_SUCCESS,
  INFO_GOTO_ADD_OR_EDIT_FAILURE,
  INFO_GOTO_ADD_OR_EDIT_DISMISS_ERROR,
} from './constants';
import { push } from 'react-router-redux'
import request from '../../../utils/request'
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function gotoAddOrEdit(optype,record) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: INFO_GOTO_ADD_OR_EDIT_BEGIN,
    });

    if (optype == "update"){
        const promise = new Promise((resolve, reject) => {
          request({
            method: 'post',
            url: '/api/b/info/detail',
            data:{
              id:record.id
            }
          }).then(data => {
            console.log(data)
            dispatch({
              type: INFO_GOTO_ADD_OR_EDIT_SUCCESS,
              data: data,
            });
            console.log("获取详情成功")
            dispatch(push("/info/edit"))
            resolve(data);
          }).catch(error => {
            dispatch({
              type: INFO_GOTO_ADD_OR_EDIT_FAILURE,
              data: { error: error },
            });
            reject(error);
          });
        });
        return promise;
    }else{
      dispatch(push("/info/edit"))
    }
   
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGotoAddOrEditError() {
  return {
    type: INFO_GOTO_ADD_OR_EDIT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case INFO_GOTO_ADD_OR_EDIT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        gotoAddOrEditPending: true,
        gotoAddOrEditError: null,
      };

    case INFO_GOTO_ADD_OR_EDIT_SUCCESS:
      // The request is success
      return {
        ...state,
        gotoAddOrEditPending: false,
        gotoAddOrEditError: null,
        currentInfo:action.data
      };

    case INFO_GOTO_ADD_OR_EDIT_FAILURE:
      // The request is failed
      return {
        ...state,
        gotoAddOrEditPending: false,
        gotoAddOrEditError: action.data.error,
      };

    case INFO_GOTO_ADD_OR_EDIT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        gotoAddOrEditError: null,
      };

    default:
      return state;
  }
}
