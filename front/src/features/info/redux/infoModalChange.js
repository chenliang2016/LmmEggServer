import {
  INFO_INFO_MODAL_CHANGE,
} from './constants';
import { push } from 'react-router-redux'

export function infoModalChange(type,record) {

    return (dispatch) => {
        if (type == 'update'){
            
        }
        dispatch(push("/info/edit"))
    }
  
}

export function reducer(state, action) {
  switch (action.type) {
    case INFO_INFO_MODAL_CHANGE:
      return {
        ...state,
        infoModalType:action.data.type,
        infoModalVisible:action.data.visible
      };

    default:
      return state;
  }
}
