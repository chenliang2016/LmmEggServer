import {
  ROLE_ON_CHECK_KEYS,
} from '../../../../src/features/role/redux/constants';

import {
  onCheckKeys,
  reducer,
} from '../../../../src/features/role/redux/onCheckKeys';

describe('role/redux/onCheckKeys', () => {
  it('returns correct action by onCheckKeys', () => {
    expect(onCheckKeys()).toHaveProperty('type', ROLE_ON_CHECK_KEYS);
  });

  it('handles action type ROLE_ON_CHECK_KEYS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ROLE_ON_CHECK_KEYS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
