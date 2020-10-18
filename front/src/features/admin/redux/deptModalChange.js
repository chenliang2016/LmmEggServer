import {
  ADMIN_DEPT_MODAL_CHANGE,
} from './constants';

export function deptModalChange(visible,type) {
  return {
    type: ADMIN_DEPT_MODAL_CHANGE,
    data: {visible,type},
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_DEPT_MODAL_CHANGE:
      return {
        ...state,
        deptModalType:action.data.type,
        deptModalVisible:action.data.visible
      };

    default:
      return state;
  }
}
