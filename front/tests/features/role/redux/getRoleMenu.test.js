import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ROLE_GET_ROLE_MENU_BEGIN,
  ROLE_GET_ROLE_MENU_SUCCESS,
  ROLE_GET_ROLE_MENU_FAILURE,
  ROLE_GET_ROLE_MENU_DISMISS_ERROR,
} from '../../../../src/features/role/redux/constants';

import {
  getRoleMenu,
  dismissGetRoleMenuError,
  reducer,
} from '../../../../src/features/role/redux/getRoleMenu';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('role/redux/getRoleMenu', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getRoleMenu succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getRoleMenu())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ROLE_GET_ROLE_MENU_BEGIN);
        expect(actions[1]).toHaveProperty('type', ROLE_GET_ROLE_MENU_SUCCESS);
      });
  });

  it('dispatches failure action when getRoleMenu fails', () => {
    const store = mockStore({});

    return store.dispatch(getRoleMenu({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ROLE_GET_ROLE_MENU_BEGIN);
        expect(actions[1]).toHaveProperty('type', ROLE_GET_ROLE_MENU_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetRoleMenuError', () => {
    const expectedAction = {
      type: ROLE_GET_ROLE_MENU_DISMISS_ERROR,
    };
    expect(dismissGetRoleMenuError()).toEqual(expectedAction);
  });

  it('handles action type ROLE_GET_ROLE_MENU_BEGIN correctly', () => {
    const prevState = { getRoleMenuPending: false };
    const state = reducer(
      prevState,
      { type: ROLE_GET_ROLE_MENU_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getRoleMenuPending).toBe(true);
  });

  it('handles action type ROLE_GET_ROLE_MENU_SUCCESS correctly', () => {
    const prevState = { getRoleMenuPending: true };
    const state = reducer(
      prevState,
      { type: ROLE_GET_ROLE_MENU_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getRoleMenuPending).toBe(false);
  });

  it('handles action type ROLE_GET_ROLE_MENU_FAILURE correctly', () => {
    const prevState = { getRoleMenuPending: true };
    const state = reducer(
      prevState,
      { type: ROLE_GET_ROLE_MENU_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getRoleMenuPending).toBe(false);
    expect(state.getRoleMenuError).toEqual(expect.anything());
  });

  it('handles action type ROLE_GET_ROLE_MENU_DISMISS_ERROR correctly', () => {
    const prevState = { getRoleMenuError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ROLE_GET_ROLE_MENU_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getRoleMenuError).toBe(null);
  });
});

