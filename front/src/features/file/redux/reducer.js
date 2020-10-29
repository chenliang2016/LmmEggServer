import initialState from './initialState';
import { reducer as getAfileListReducer } from './getAfileList';
import { reducer as submitAfileReducer } from './submitAfile';
import { reducer as deleteAfileReducer } from './deleteAfile';
import { reducer as afileModalChangeReducer } from './afileModalChange';
import { reducer as chooseCurrentAfileReducer } from './chooseCurrentAfile';

const reducers = [
  getAfileListReducer,
  submitAfileReducer,
  deleteAfileReducer,
  afileModalChangeReducer,
  chooseCurrentAfileReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
