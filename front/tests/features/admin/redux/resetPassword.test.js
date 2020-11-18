import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADMIN_RESET_PASSWORD_BEGIN,
  ADMIN_RESET_PASSWORD_SUCCESS,
  ADMIN_RESET_PASSWORD_FAILURE,
  ADMIN_RESET_PASSWORD_DISMISS_ERROR,
} from '../../../../src/features/admin/redux/constants';

import {
  resetPassword,
  dismissResetPasswordError,
  reducer,
} from '../../../../src/features/admin/redux/resetPassword';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/redux/resetPassword', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when resetPassword succeeds', () => {
    const store = mockStore({});

    return store.dispatch(resetPassword())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_RESET_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_RESET_PASSWORD_SUCCESS);
      });
  });

  it('dispatches failure action when resetPassword fails', () => {
    const store = mockStore({});

    return store.dispatch(resetPassword({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_RESET_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_RESET_PASSWORD_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissResetPasswordError', () => {
    const expectedAction = {
      type: ADMIN_RESET_PASSWORD_DISMISS_ERROR,
    };
    expect(dismissResetPasswordError()).toEqual(expectedAction);
  });

  it('handles action type ADMIN_RESET_PASSWORD_BEGIN correctly', () => {
    const prevState = { resetPasswordPending: false };
    const state = reducer(
      prevState,
      { type: ADMIN_RESET_PASSWORD_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.resetPasswordPending).toBe(true);
  });

  it('handles action type ADMIN_RESET_PASSWORD_SUCCESS correctly', () => {
    const prevState = { resetPasswordPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_RESET_PASSWORD_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.resetPasswordPending).toBe(false);
  });

  it('handles action type ADMIN_RESET_PASSWORD_FAILURE correctly', () => {
    const prevState = { resetPasswordPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_RESET_PASSWORD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.resetPasswordPending).toBe(false);
    expect(state.resetPasswordError).toEqual(expect.anything());
  });

  it('handles action type ADMIN_RESET_PASSWORD_DISMISS_ERROR correctly', () => {
    const prevState = { resetPasswordError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADMIN_RESET_PASSWORD_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.resetPasswordError).toBe(null);
  });
});

