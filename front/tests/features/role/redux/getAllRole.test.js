import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ROLE_GET_ALL_ROLE_BEGIN,
  ROLE_GET_ALL_ROLE_SUCCESS,
  ROLE_GET_ALL_ROLE_FAILURE,
  ROLE_GET_ALL_ROLE_DISMISS_ERROR,
} from '../../../../src/features/role/redux/constants';

import {
  getAllRole,
  dismissGetAllRoleError,
  reducer,
} from '../../../../src/features/role/redux/getAllRole';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('role/redux/getAllRole', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getAllRole succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAllRole())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ROLE_GET_ALL_ROLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', ROLE_GET_ALL_ROLE_SUCCESS);
      });
  });

  it('dispatches failure action when getAllRole fails', () => {
    const store = mockStore({});

    return store.dispatch(getAllRole({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ROLE_GET_ALL_ROLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', ROLE_GET_ALL_ROLE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetAllRoleError', () => {
    const expectedAction = {
      type: ROLE_GET_ALL_ROLE_DISMISS_ERROR,
    };
    expect(dismissGetAllRoleError()).toEqual(expectedAction);
  });

  it('handles action type ROLE_GET_ALL_ROLE_BEGIN correctly', () => {
    const prevState = { getAllRolePending: false };
    const state = reducer(
      prevState,
      { type: ROLE_GET_ALL_ROLE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAllRolePending).toBe(true);
  });

  it('handles action type ROLE_GET_ALL_ROLE_SUCCESS correctly', () => {
    const prevState = { getAllRolePending: true };
    const state = reducer(
      prevState,
      { type: ROLE_GET_ALL_ROLE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAllRolePending).toBe(false);
  });

  it('handles action type ROLE_GET_ALL_ROLE_FAILURE correctly', () => {
    const prevState = { getAllRolePending: true };
    const state = reducer(
      prevState,
      { type: ROLE_GET_ALL_ROLE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAllRolePending).toBe(false);
    expect(state.getAllRoleError).toEqual(expect.anything());
  });

  it('handles action type ROLE_GET_ALL_ROLE_DISMISS_ERROR correctly', () => {
    const prevState = { getAllRoleError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ROLE_GET_ALL_ROLE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAllRoleError).toBe(null);
  });
});

