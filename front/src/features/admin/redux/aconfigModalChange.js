import {
  ADMIN_ACONFIG_MODAL_CHANGE,
} from './constants';

export function aconfigModalChange(visible,type) {
  return {
    type: ADMIN_ACONFIG_MODAL_CHANGE,
    data: {visible,type},
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_ACONFIG_MODAL_CHANGE:
      return {
        ...state,
        aconfigModalType:action.data.type,
        aconfigModalVisible:action.data.visible
      };

    default:
      return state;
  }
}
