import { LoadingState } from '../state/loading.feature';
import { LoadingStatePipe } from './loading-state.pipe';

describe('LoadingStatePipe', () => {
  let pipe: LoadingStatePipe;

  beforeEach(() => {
    pipe = new LoadingStatePipe();
  });

  it('should transform "loading" to { loading: true }', () => {
    const state: LoadingState = 'loading';

    const transformedState = pipe.transform(state);
    expect(transformedState).toEqual({ loading: true });
  });

  it('should transform an error object to { loading: false, error: "error message" }', () => {
    const state: LoadingState = { error: 'error message' };
    const transformedState = pipe.transform(state);
    expect(transformedState).toEqual({
      loading: false,
      error: 'error message',
    });
  });

  it('should transform other states to { loading: false }', () => {
    const state: LoadingState = 'loaded';
    const transformedState = pipe.transform(state);
    expect(transformedState).toEqual({ loading: false });
  });
});
