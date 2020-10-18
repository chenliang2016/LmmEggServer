import {
  COMMON_LOGOUT_SUCCESS,
} from './constants';
import { push } from 'react-router-redux';

export function logout() {
  return dispatch => {
    dispatch(push(`/login`));
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_LOGOUT_SUCCESS:
      return {
        ...state,
        routeList: [
          {
            id: '1',
            icon: 'fund',
            name: '账单',
            route: '/app-bill',
          },
        ]
      }

    default:
      return state;
  }
}
