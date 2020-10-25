import {
  ADMIN_DICNAME_MODAL_CHANGE,
} from './constants';

export function dicnameModalChange(visible,type) {
  return {
    type: ADMIN_DICNAME_MODAL_CHANGE,
    data: {visible,type},
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_DICNAME_MODAL_CHANGE:
      return {
        ...state,
        dicnameModalType:action.data.type,
        dicnameModalVisible:action.data.visible
      };

    default:
      return state;
  }
}
