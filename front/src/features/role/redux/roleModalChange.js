import {
  ROLE_ROLE_MODAL_CHANGE,
} from './constants';

export function roleModalChange(visible,type) {
  return {
    type: ROLE_ROLE_MODAL_CHANGE,
    data: {visible,type},
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ROLE_ROLE_MODAL_CHANGE:
      return {
        ...state,
        roleModalType:action.data.type,
        roleModalVisible:action.data.visible
      };

    default:
      return state;
  }
}
