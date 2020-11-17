import {
    ROLE_CHOOSE_CURRENT_ROLE,
} from './constants';
  
export function chooseCurrentRole(modal) {
    return {
      type: ROLE_CHOOSE_CURRENT_ROLE,
      data: modal,
    };
}
  
export function reducer(state, action) {
    switch (action.type) {
      case ROLE_CHOOSE_CURRENT_ROLE:
        return {
          ...state,
          currentRole:action.data,
        };
  
      default:
        return state;
    }
}