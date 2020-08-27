import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  GENERATE_SUBMIT_FRONT_BEGIN,
  GENERATE_SUBMIT_FRONT_SUCCESS,
  GENERATE_SUBMIT_FRONT_FAILURE,
  GENERATE_SUBMIT_FRONT_DISMISS_ERROR,
} from '../../../../src/features/generate/redux/constants';

import {
  submitFront,
  dismissSubmitFrontError,
  reducer,
} from '../../../../src/features/generate/redux/submitFront';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('generate/redux/submitFront', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when submitFront succeeds', () => {
    const store = mockStore({});

    return store.dispatch(submitFront())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GENERATE_SUBMIT_FRONT_BEGIN);
        expect(actions[1]).toHaveProperty('type', GENERATE_SUBMIT_FRONT_SUCCESS);
      });
  });

  it('dispatches failure action when submitFront fails', () => {
    const store = mockStore({});

    return store.dispatch(submitFront({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GENERATE_SUBMIT_FRONT_BEGIN);
        expect(actions[1]).toHaveProperty('type', GENERATE_SUBMIT_FRONT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSubmitFrontError', () => {
    const expectedAction = {
      type: GENERATE_SUBMIT_FRONT_DISMISS_ERROR,
    };
    expect(dismissSubmitFrontError()).toEqual(expectedAction);
  });

  it('handles action type GENERATE_SUBMIT_FRONT_BEGIN correctly', () => {
    const prevState = { submitFrontPending: false };
    const state = reducer(
      prevState,
      { type: GENERATE_SUBMIT_FRONT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitFrontPending).toBe(true);
  });

  it('handles action type GENERATE_SUBMIT_FRONT_SUCCESS correctly', () => {
    const prevState = { submitFrontPending: true };
    const state = reducer(
      prevState,
      { type: GENERATE_SUBMIT_FRONT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitFrontPending).toBe(false);
  });

  it('handles action type GENERATE_SUBMIT_FRONT_FAILURE correctly', () => {
    const prevState = { submitFrontPending: true };
    const state = reducer(
      prevState,
      { type: GENERATE_SUBMIT_FRONT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitFrontPending).toBe(false);
    expect(state.submitFrontError).toEqual(expect.anything());
  });

  it('handles action type GENERATE_SUBMIT_FRONT_DISMISS_ERROR correctly', () => {
    const prevState = { submitFrontError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GENERATE_SUBMIT_FRONT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitFrontError).toBe(null);
  });
});

