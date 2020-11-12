import {
  GENERATE_MYSQLTABLE_MODAL_CHANGE,
} from './constants';

export function mysqltableModalChange(visible,type) {
  return {
    type: GENERATE_MYSQLTABLE_MODAL_CHANGE,
    data: {visible,type},
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case GENERATE_MYSQLTABLE_MODAL_CHANGE:
      return {
        ...state,
        mysqltableModalType:action.data.type,
        mysqltableModalVisible:action.data.visible
      };

    default:
      return state;
  }
}
