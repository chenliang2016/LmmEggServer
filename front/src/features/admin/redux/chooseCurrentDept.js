import {
    ADMIN_CHOOSE_CURRENT_DEPT,
} from './constants';
  
export function chooseCurrentDept(modal) {
    return {
      type: ADMIN_CHOOSE_CURRENT_DEPT,
      data: modal,
    };
}
  
export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_CHOOSE_CURRENT_DEPT:
        return {
          ...state,
          currentDept:action.data,
        };
  
      default:
        return state;
    }
}