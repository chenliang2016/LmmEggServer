import {
    ADMIN_CHOOSE_CURRENT_ADMIN,
} from './constants';
  
export function chooseCurrentAdmin(modal) {
    return {
      type: ADMIN_CHOOSE_CURRENT_ADMIN,
      data: modal,
    };
}
  
export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_CHOOSE_CURRENT_ADMIN:
        return {
          ...state,
          currentAdmin:action.data,
        };
  
      default:
        return state;
    }
}