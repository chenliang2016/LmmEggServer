import {
    INFO_CHOOSE_CURRENT_INFOCATEGORY,
} from './constants';
  
export function chooseCurrentInfoCategory(modal) {
    return {
      type: INFO_CHOOSE_CURRENT_INFOCATEGORY,
      data: modal,
    };
}
  
export function reducer(state, action) {
    switch (action.type) {
      case INFO_CHOOSE_CURRENT_INFOCATEGORY:
        return {
          ...state,
          currentInfoCategory:action.data,
        };
  
      default:
        return state;
    }
}