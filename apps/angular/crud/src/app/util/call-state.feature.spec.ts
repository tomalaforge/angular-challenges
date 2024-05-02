import { HttpErrorResponse } from '@angular/common/http';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
} from './call-state.feature';

describe('withCallState', () => {
  function setup() {
    const TestStore = signalStore(
      withCallState(),
      withMethods((state) => ({
        start: () => {
          patchState(state, setLoading());
        },
        stop: () => {
          patchState(state, setLoaded());
        },
        forceErrorString: () => {
          patchState(state, setError('something'));
        },
        forceErrorHttpErrorResponse: () => {
          patchState(
            state,
            setError(
              new HttpErrorResponse({
                url: 'myUrl',
                status: 404,
                statusText: 'Not Found',
              }),
            ),
          );
        },
        forceErrorBackup: () => {
          patchState(state, setError({}));
        },
      })),
    );

    return {
      store: new TestStore(),
    };
  }

  it('starts with loading state init', () => {
    const { store } = setup();
    expect(store.callState()).toBe('init');
    expect(store.error()).toBeFalsy();
    expect(store.loaded()).toBeFalsy();
    expect(store.loading()).toBeFalsy();
  });

  it('sets loading', () => {
    const { store } = setup();
    store.start();
    expect(store.callState()).toBe('loading');
    expect(store.error()).toBeFalsy();
    expect(store.loaded()).toBeFalsy();
    expect(store.loading()).toBe(true);
  });

  it('sets loaded', () => {
    const { store } = setup();
    store.stop();
    expect(store.callState()).toBe('loaded');
    expect(store.error()).toBeFalsy();
    expect(store.loaded()).toBe(true);
    expect(store.loading()).toBeFalsy();
  });

  it('sets error with a string', () => {
    const { store } = setup();
    store.forceErrorString();
    expect(store.callState()).toEqual({ error: 'something' });
    expect(store.error()).toEqual('something');
    expect(store.loaded()).toBeFalsy();
    expect(store.loading()).toBeFalsy();
  });

  it('sets error with a HttpErrorResponse', () => {
    const { store } = setup();
    store.forceErrorHttpErrorResponse();
    expect(store.callState()).toEqual({
      error: 'Http failure response for myUrl: 404 Not Found',
    });
    expect(store.error()).toEqual(
      'Http failure response for myUrl: 404 Not Found',
    );
    expect(store.loaded()).toBeFalsy();
    expect(store.loading()).toBeFalsy();
  });

  it('sets error with a backup message', () => {
    const { store } = setup();
    store.forceErrorBackup();
    expect(store.callState()).toEqual({
      error: 'An error occurred',
    });
    expect(store.error()).toEqual('An error occurred');
    expect(store.loaded()).toBeFalsy();
    expect(store.loading()).toBeFalsy();
  });
});
