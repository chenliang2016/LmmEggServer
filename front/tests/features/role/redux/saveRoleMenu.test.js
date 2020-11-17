import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ROLE_SAVE_ROLE_MENU_BEGIN,
  ROLE_SAVE_ROLE_MENU_SUCCESS,
  ROLE_SAVE_ROLE_MENU_FAILURE,
  ROLE_SAVE_ROLE_MENU_DISMISS_ERROR,
} from '../../../../src/features/role/redux/constants';

import {
  saveRoleMenu,
  dismissSaveRoleMenuError,
  reducer,
} from '../../../../src/features/role/redux/saveRoleMenu';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('role/redux/saveRoleMenu', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when saveRoleMenu succeeds', () => {
    const store = mockStore({});

    return store.dispatch(saveRoleMenu())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ROLE_SAVE_ROLE_MENU_BEGIN);
        expect(actions[1]).toHaveProperty('type', ROLE_SAVE_ROLE_MENU_SUCCESS);
      });
  });

  it('dispatches failure action when saveRoleMenu fails', () => {
    const store = mockStore({});

    return store.dispatch(saveRoleMenu({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ROLE_SAVE_ROLE_MENU_BEGIN);
        expect(actions[1]).toHaveProperty('type', ROLE_SAVE_ROLE_MENU_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSaveRoleMenuError', () => {
    const expectedAction = {
      type: ROLE_SAVE_ROLE_MENU_DISMISS_ERROR,
    };
    expect(dismissSaveRoleMenuError()).toEqual(expectedAction);
  });

  it('handles action type ROLE_SAVE_ROLE_MENU_BEGIN correctly', () => {
    const prevState = { saveRoleMenuPending: false };
    const state = reducer(
      prevState,
      { type: ROLE_SAVE_ROLE_MENU_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveRoleMenuPending).toBe(true);
  });

  it('handles action type ROLE_SAVE_ROLE_MENU_SUCCESS correctly', () => {
    const prevState = { saveRoleMenuPending: true };
    const state = reducer(
      prevState,
      { type: ROLE_SAVE_ROLE_MENU_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveRoleMenuPending).toBe(false);
  });

  it('handles action type ROLE_SAVE_ROLE_MENU_FAILURE correctly', () => {
    const prevState = { saveRoleMenuPending: true };
    const state = reducer(
      prevState,
      { type: ROLE_SAVE_ROLE_MENU_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveRoleMenuPending).toBe(false);
    expect(state.saveRoleMenuError).toEqual(expect.anything());
  });

  it('handles action type ROLE_SAVE_ROLE_MENU_DISMISS_ERROR correctly', () => {
    const prevState = { saveRoleMenuError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ROLE_SAVE_ROLE_MENU_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveRoleMenuError).toBe(null);
  });
});

