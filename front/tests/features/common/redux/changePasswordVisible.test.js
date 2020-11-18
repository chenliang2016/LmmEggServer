import {
  COMMON_CHANGE_PASSWORD_VISIBLE,
} from '../../../../src/features/common/redux/constants';

import {
  changePasswordVisible,
  reducer,
} from '../../../../src/features/common/redux/changePasswordVisible';

describe('common/redux/changePasswordVisible', () => {
  it('returns correct action by changePasswordVisible', () => {
    expect(changePasswordVisible()).toHaveProperty('type', COMMON_CHANGE_PASSWORD_VISIBLE);
  });

  it('handles action type COMMON_CHANGE_PASSWORD_VISIBLE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_CHANGE_PASSWORD_VISIBLE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
