import {
  ADMIN_ADMIN_MODAL_CHANGE,
} from './constants';

export function adminModalChange(visible,type) {
  return {
    type: ADMIN_ADMIN_MODAL_CHANGE,
    data: {visible,type},
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_ADMIN_MODAL_CHANGE:
      return {
        ...state,
        adminModalType:action.data.type,
        adminModalVisible:action.data.visible
      };

    default:
      return state;
  }
}
