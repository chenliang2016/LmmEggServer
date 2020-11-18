import {
  ADMIN_RESET_PASSWORD_BEGIN,
  ADMIN_RESET_PASSWORD_SUCCESS,
  ADMIN_RESET_PASSWORD_FAILURE,
  ADMIN_RESET_PASSWORD_DISMISS_ERROR,
} from './constants';
  import request from '../../../utils/request'
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function resetPassword(id) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ADMIN_RESET_PASSWORD_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
      // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
      // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
      // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
      const promise = new Promise((resolve, reject) => {
          request({
            method:'post',
            url:'/api/b/admin/resetPassword',
            data:{id:id}
          }).then( data => {
              dispatch({
                  type: ADMIN_RESET_PASSWORD_SUCCESS,
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: ADMIN_RESET_PASSWORD_FAILURE,
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
export function dismissResetPasswordError() {
  return {
    type: ADMIN_RESET_PASSWORD_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_RESET_PASSWORD_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        resetPasswordPending: true,
        resetPasswordError: null,
      };

    case ADMIN_RESET_PASSWORD_SUCCESS:
      // The request is success
      return {
        ...state,
        resetPasswordPending: false,
        resetPasswordError: null,
      };

    case ADMIN_RESET_PASSWORD_FAILURE:
      // The request is failed
      return {
        ...state,
        resetPasswordPending: false,
        resetPasswordError: action.data.error,
      };

    case ADMIN_RESET_PASSWORD_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        resetPasswordError: null,
      };

    default:
      return state;
  }
}
