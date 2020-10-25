import {
    ADMIN_CHOOSE_CURRENT_DICVALUES,
} from './constants';
  
export function chooseCurrentDicvalues(modal) {
    return {
      type: ADMIN_CHOOSE_CURRENT_DICVALUES,
      data: modal,
    };
}
  
export function reducer(state, action) {
    switch (action.type) {
      case ADMIN_CHOOSE_CURRENT_DICVALUES:
        return {
          ...state,
          currentDicvalues:action.data,
        };
  
      default:
        return state;
    }
}