import {
    GENERATE_CHOOSE_CURRENT_MYSQLTABLE,
} from './constants';
  
export function chooseCurrentMysqltable(modal) {
    return {
      type: GENERATE_CHOOSE_CURRENT_MYSQLTABLE,
      data: modal,
    };
}
  
export function reducer(state, action) {
    switch (action.type) {
      case GENERATE_CHOOSE_CURRENT_MYSQLTABLE:
        return {
          ...state,
          currentMysqltable:action.data,
        };
  
      default:
        return state;
    }
}