import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  GENERATE_SUBMIT_NODE_BEGIN,
  GENERATE_SUBMIT_NODE_SUCCESS,
  GENERATE_SUBMIT_NODE_FAILURE,
  GENERATE_SUBMIT_NODE_DISMISS_ERROR,
} from '../../../../src/features/generate/redux/constants';

import {
  submitNode,
  dismissSubmitNodeError,
  reducer,
} from '../../../../src/features/generate/redux/submitNode';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('generate/redux/submitNode', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when submitNode succeeds', () => {
    const store = mockStore({});

    return store.dispatch(submitNode())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GENERATE_SUBMIT_NODE_BEGIN);
        expect(actions[1]).toHaveProperty('type', GENERATE_SUBMIT_NODE_SUCCESS);
      });
  });

  it('dispatches failure action when submitNode fails', () => {
    const store = mockStore({});

    return store.dispatch(submitNode({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GENERATE_SUBMIT_NODE_BEGIN);
        expect(actions[1]).toHaveProperty('type', GENERATE_SUBMIT_NODE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSubmitNodeError', () => {
    const expectedAction = {
      type: GENERATE_SUBMIT_NODE_DISMISS_ERROR,
    };
    expect(dismissSubmitNodeError()).toEqual(expectedAction);
  });

  it('handles action type GENERATE_SUBMIT_NODE_BEGIN correctly', () => {
    const prevState = { submitNodePending: false };
    const state = reducer(
      prevState,
      { type: GENERATE_SUBMIT_NODE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitNodePending).toBe(true);
  });

  it('handles action type GENERATE_SUBMIT_NODE_SUCCESS correctly', () => {
    const prevState = { submitNodePending: true };
    const state = reducer(
      prevState,
      { type: GENERATE_SUBMIT_NODE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitNodePending).toBe(false);
  });

  it('handles action type GENERATE_SUBMIT_NODE_FAILURE correctly', () => {
    const prevState = { submitNodePending: true };
    const state = reducer(
      prevState,
      { type: GENERATE_SUBMIT_NODE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitNodePending).toBe(false);
    expect(state.submitNodeError).toEqual(expect.anything());
  });

  it('handles action type GENERATE_SUBMIT_NODE_DISMISS_ERROR correctly', () => {
    const prevState = { submitNodeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GENERATE_SUBMIT_NODE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitNodeError).toBe(null);
  });
});

