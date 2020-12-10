import {
  INFO_INFODETAIL_MODAL_CHANGE,
} from './constants';

export function infoDetailModalChange(visible,type) {
  return {
    type: INFO_INFODETAIL_MODAL_CHANGE,
    data: {visible,type},
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case INFO_INFODETAIL_MODAL_CHANGE:
      return {
        ...state,
        infoDetailModalType:action.data.type,
        infoDetailModalVisible:action.data.visible
      };

    default:
      return state;
  }
}
