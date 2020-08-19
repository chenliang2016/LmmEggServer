import {
  SYSTEM_ADD_LIST_ACTION,
} from '../../../../src/features/system/redux/constants';

import {
  addListAction,
  reducer,
} from '../../../../src/features/system/redux/addListAction';

describe('system/redux/addListAction', () => {
  it('returns correct action by addListAction', () => {
    expect(addListAction()).toHaveProperty('type', SYSTEM_ADD_LIST_ACTION);
  });

  it('handles action type SYSTEM_ADD_LIST_ACTION correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SYSTEM_ADD_LIST_ACTION }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
