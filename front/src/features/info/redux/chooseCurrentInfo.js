import {
    INFO_CHOOSE_CURRENT_INFO,
} from './constants';
  
export function chooseCurrentInfo(modal) {
    return {
      type: INFO_CHOOSE_CURRENT_INFO,
      data: modal,
    };
}
  
export function reducer(state, action) {
    switch (action.type) {
      case INFO_CHOOSE_CURRENT_INFO:
        return {
          ...state,
          currentInfo:action.data,
        };
  
      default:
        return state;
    }
}