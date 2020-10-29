import {
  FILE_AFILE_MODAL_CHANGE,
} from './constants';

export function afileModalChange(visible,type) {
  return {
    type: FILE_AFILE_MODAL_CHANGE,
    data: {visible,type},
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FILE_AFILE_MODAL_CHANGE:
      return {
        ...state,
        afileModalType:action.data.type,
        afileModalVisible:action.data.visible
      };

    default:
      return state;
  }
}
