import {
  INFO_INFOCATEGORY_MODAL_CHANGE,
} from './constants';

export function infoCategoryModalChange(visible,type) {
  return {
    type: INFO_INFOCATEGORY_MODAL_CHANGE,
    data: {visible,type},
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case INFO_INFOCATEGORY_MODAL_CHANGE:
      return {
        ...state,
        infoCategoryModalType:action.data.type,
        infoCategoryModalVisible:action.data.visible
      };

    default:
      return state;
  }
}
