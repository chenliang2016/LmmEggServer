import {
    ROLE_CHOOSE_CURRENT_MENU,
} from './constants';
  
export function chooseCurrentMenu(modal) {
    return {
      type: ROLE_CHOOSE_CURRENT_MENU,
      data: modal,
    };
}
  
export function reducer(state, action) {
    switch (action.type) {
      case ROLE_CHOOSE_CURRENT_MENU:
        return {
          ...state,
          currentMenu:action.data,
        };
  
      default:
        return state;
    }
}