import {
  COMMON_CHANGE_PASSWORD_BEGIN,
  COMMON_CHANGE_PASSWORD_SUCCESS,
  COMMON_CHANGE_PASSWORD_FAILURE,
  COMMON_CHANGE_PASSWORD_DISMISS_ERROR,
} from './constants';
  import request from '../../../utils/request'
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function changePassword(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_CHANGE_PASSWORD_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
      // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
      // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
      // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
      const promise = new Promise((resolve, reject) => {
          request({
            method:'post',
            url:'/api/b/admin/changePassword',
            data:args
          }).then( data => {
              dispatch({
                  type: COMMON_CHANGE_PASSWORD_SUCCESS,
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: COMMON_CHANGE_PASSWORD_FAILURE,
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
export function dismissChangePasswordError() {
  return {
    type: COMMON_CHANGE_PASSWORD_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_CHANGE_PASSWORD_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        changePasswordPending: true,
        changePasswordError: null,
      };

    case COMMON_CHANGE_PASSWORD_SUCCESS:
      // The request is success
      return {
        ...state,
        changePasswordPending: false,
        changePasswordError: null,
      };

    case COMMON_CHANGE_PASSWORD_FAILURE:
      // The request is failed
      return {
        ...state,
        changePasswordPending: false,
        changePasswordError: action.data.error,
      };

    case COMMON_CHANGE_PASSWORD_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        changePasswordError: null,
      };

    default:
      return state;
  }
}
