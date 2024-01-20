/* eslint-disable @typescript-eslint/ban-types */
import {
  inject,
  Inject,
  Injectable,
  InjectionToken,
  Optional,
} from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of, switchMap } from 'rxjs';
import {
  CallState,
  CallStateError,
  getErrorCallState,
} from './call-state.model';
import { ERROR_TOKEN, FLICKER_TIME } from './external.model';
import { nonFlickerLoader } from './non-flicker-loader';

export const INITIAL_TOKEN = new InjectionToken('initial data');

export interface CallStateComponentState {
  callState: CallState;
}

@Injectable()
export class CallStateComponentStore<
  U extends object | void = void,
  T extends
    | (U & CallStateComponentState)
    | CallStateComponentState = U extends void
    ? CallStateComponentState
    : U & CallStateComponentState,
> extends ComponentStore<T> {
  private error = inject(ERROR_TOKEN);
  private flickerTime = inject(FLICKER_TIME);

  constructor(@Inject(INITIAL_TOKEN) @Optional() initialState: U) {
    super({ callState: 'INIT', ...initialState } as T);
  }

  readonly isLoading$: Observable<boolean> = this.select(
    (state) => state.callState === 'LOADING',
  );

  readonly isLoadingWithFlicker$: Observable<boolean> = this.select(
    (state) => state.callState === 'LOADING',
  ).pipe(
    switchMap((loading) => nonFlickerLoader(of(loading), this.flickerTime)),
  );

  readonly isLoaded$: Observable<boolean> = this.select(
    (state) => state.callState === 'LOADED',
  ).pipe(switchMap((loaded) => of(loaded)));

  readonly callState$ = this.select((state) => state.callState);

  readonly error$: Observable<string | undefined> = this.select((state) =>
    this.error.getErrorMessage(getErrorCallState(state.callState)),
  );

  readonly updateCallState = this.updater(
    (state, callState: CallState | undefined): T => {
      return {
        ...(state as object),
        callState: callState ?? 'LOADED',
      } as T;
    },
  );

  readonly startLoading = this.updater(
    (state, patchedState: Partial<U> | void): T => {
      return {
        ...(state as object),
        ...patchedState,
        callState: 'LOADING',
      } as T;
    },
  );

  readonly stopLoading = this.updater(
    (state, patchedState: Partial<U> | void): T => {
      return {
        ...(state as object),
        ...patchedState,
        callState: 'LOADED',
      } as T;
    },
  );

  protected handleError(
    error: unknown,
    patchedState: Partial<U> = {},
  ): CallStateError {
    const err = this.error.toError(error);
    this.patchState({
      callState: { error: err },
      ...patchedState,
    } as Partial<T>);
    return err;
  }

  setInitState(initialState: U) {
    this.setState({ callState: 'INIT', ...initialState } as T);
  }
}
