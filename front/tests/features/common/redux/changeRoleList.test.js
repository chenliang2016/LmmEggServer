import {
  COMMON_CHANGE_ROLE_LIST,
} from '../../../../src/features/common/redux/constants';

import {
  changeRoleList,
  reducer,
} from '../../../../src/features/common/redux/changeRoleList';

describe('common/redux/changeRoleList', () => {
  it('returns correct action by changeRoleList', () => {
    expect(changeRoleList()).toHaveProperty('type', COMMON_CHANGE_ROLE_LIST);
  });

  it('handles action type COMMON_CHANGE_ROLE_LIST correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_CHANGE_ROLE_LIST }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
