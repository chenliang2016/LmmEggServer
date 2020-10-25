import {
    ADMIN_CHOOSE_CURRENT_DICNAME,
} from './constants';
  
export function chooseCurrentDicname(modal) {
    return {
      type: ADMIN_CHOOSE_CURRENT_DICNAME,
      data: modal,
    };
}
  
export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_CHOOSE_CURRENT_DICNAME:
        return {
          ...state,
          currentDicname:action.data,
        };
  
      default:
        return state;
    }
}