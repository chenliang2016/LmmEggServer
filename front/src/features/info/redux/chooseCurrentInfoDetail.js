import {
    INFO_CHOOSE_CURRENT_INFODETAIL,
} from './constants';
  
export function chooseCurrentInfoDetail(modal) {
    return {
      type: INFO_CHOOSE_CURRENT_INFODETAIL,
      data: modal,
    };
}
  
export function reducer(state, action) {
    switch (action.type) {
      case INFO_CHOOSE_CURRENT_INFODETAIL:
        return {
          ...state,
          currentInfoDetail:action.data,
        };
  
      default:
        return state;
    }
}