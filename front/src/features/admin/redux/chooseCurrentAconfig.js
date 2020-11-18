import {
    ADMIN_CHOOSE_CURRENT_ACONFIG,
} from './constants';
  
export function chooseCurrentAconfig(modal) {
    return {
      type: ADMIN_CHOOSE_CURRENT_ACONFIG,
      data: modal,
    };
}
  
export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_CHOOSE_CURRENT_ACONFIG:
        return {
          ...state,
          currentAconfig:action.data,
        };
  
      default:
        return state;
    }
}