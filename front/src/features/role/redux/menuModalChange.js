import {
  ROLE_MENU_MODAL_CHANGE,
} from './constants';

export function menuModalChange(visible,type) {
  return {
    type: ROLE_MENU_MODAL_CHANGE,
    data: {visible,type},
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ROLE_MENU_MODAL_CHANGE:
      return {
        ...state,
        menuModalType:action.data.type,
        menuModalVisible:action.data.visible
      };

    default:
      return state;
  }
}
