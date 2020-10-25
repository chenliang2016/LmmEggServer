import {
  ADMIN_DICVALUES_MODAL_CHANGE,
} from './constants';

export function dicvaluesModalChange(visible,type) {
  return {
    type: ADMIN_DICVALUES_MODAL_CHANGE,
    data: {visible,type},
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_DICVALUES_MODAL_CHANGE:
      return {
        ...state,
        dicvaluesModalType:action.data.type,
        dicvaluesModalVisible:action.data.visible
      };

    default:
      return state;
  }
}
