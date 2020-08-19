import {
  SYSTEM_MY_ACTION,
} from '../../../../src/features/system/redux/constants';

import {
  myAction,
  reducer,
} from '../../../../src/features/system/redux/myAction';

describe('system/redux/myAction', () => {
  it('returns correct action by myAction', () => {
    expect(myAction()).toHaveProperty('type', SYSTEM_MY_ACTION);
  });

  it('handles action type SYSTEM_MY_ACTION correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SYSTEM_MY_ACTION }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
