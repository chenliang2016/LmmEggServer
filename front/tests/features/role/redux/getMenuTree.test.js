import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ROLE_GET_MENU_TREE_BEGIN,
  ROLE_GET_MENU_TREE_SUCCESS,
  ROLE_GET_MENU_TREE_FAILURE,
  ROLE_GET_MENU_TREE_DISMISS_ERROR,
} from '../../../../src/features/role/redux/constants';

import {
  getMenuTree,
  dismissGetMenuTreeError,
  reducer,
} from '../../../../src/features/role/redux/getMenuTree';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('role/redux/getMenuTree', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getMenuTree succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getMenuTree())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ROLE_GET_MENU_TREE_BEGIN);
        expect(actions[1]).toHaveProperty('type', ROLE_GET_MENU_TREE_SUCCESS);
      });
  });

  it('dispatches failure action when getMenuTree fails', () => {
    const store = mockStore({});

    return store.dispatch(getMenuTree({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ROLE_GET_MENU_TREE_BEGIN);
        expect(actions[1]).toHaveProperty('type', ROLE_GET_MENU_TREE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetMenuTreeError', () => {
    const expectedAction = {
      type: ROLE_GET_MENU_TREE_DISMISS_ERROR,
    };
    expect(dismissGetMenuTreeError()).toEqual(expectedAction);
  });

  it('handles action type ROLE_GET_MENU_TREE_BEGIN correctly', () => {
    const prevState = { getMenuTreePending: false };
    const state = reducer(
      prevState,
      { type: ROLE_GET_MENU_TREE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMenuTreePending).toBe(true);
  });

  it('handles action type ROLE_GET_MENU_TREE_SUCCESS correctly', () => {
    const prevState = { getMenuTreePending: true };
    const state = reducer(
      prevState,
      { type: ROLE_GET_MENU_TREE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMenuTreePending).toBe(false);
  });

  it('handles action type ROLE_GET_MENU_TREE_FAILURE correctly', () => {
    const prevState = { getMenuTreePending: true };
    const state = reducer(
      prevState,
      { type: ROLE_GET_MENU_TREE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMenuTreePending).toBe(false);
    expect(state.getMenuTreeError).toEqual(expect.anything());
  });

  it('handles action type ROLE_GET_MENU_TREE_DISMISS_ERROR correctly', () => {
    const prevState = { getMenuTreeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ROLE_GET_MENU_TREE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMenuTreeError).toBe(null);
  });
});

