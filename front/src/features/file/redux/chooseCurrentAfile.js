import {
    FILE_CHOOSE_CURRENT_AFILE,
} from './constants';
  
export function chooseCurrentAfile(modal) {
    return {
      type: FILE_CHOOSE_CURRENT_AFILE,
      data: modal,
    };
}
  
export function reducer(state, action) {
    switch (action.type) {
      case FILE_CHOOSE_CURRENT_AFILE:
        return {
          ...state,
          currentAfile:action.data,
        };
  
      default:
        return state;
    }
}