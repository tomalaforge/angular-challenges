import { WritableSignal } from '@angular/core';
import { Observable, tap, share, finalize, merge, NEVER } from 'rxjs';

export function connectSource<State>(
  state: WritableSignal<State>,
  source$: Observable<State>
) {
  const initialState = state();
  return merge(source$, NEVER).pipe(
    tap((s) => state.set(s)),
    finalize(() => state.set(initialState)),
    share()
  );
}
