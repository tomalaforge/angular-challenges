import { isSignal, Signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  combineLatest,
  distinctUntilChanged,
  from,
  isObservable,
  ObservableInput,
  of,
  OperatorFunction,
  take,
} from 'rxjs';

export type ObservableSignalInput<T> = ObservableInput<T> | Signal<T>;

/**
 * So that we can have `fn([Observable<A>, Signal<B>]): Observable<[A, B]>`
 */
type ObservableSignalInputTuple<T> = {
  [K in keyof T]: ObservableSignalInput<T[K]>;
};

export function computedFrom<Input extends readonly unknown[], Output = Input>(
  sources: readonly [...ObservableSignalInputTuple<Input>],
  operator?: OperatorFunction<Input, Output>
): Signal<Output>;

export function computedFrom<Input extends object, Output = Input>(
  sources: ObservableSignalInputTuple<Input>,
  operator?: OperatorFunction<Input, Output>
): Signal<Output>;

export function computedFrom(
  sources: any,
  operator?: OperatorFunction<any, any>
): Signal<any> {
  let { normalizedSources, initialValues } = Object.entries(sources).reduce(
    (acc, [keyOrIndex, source]) => {
      if (isSignal(source)) {
        acc.normalizedSources[keyOrIndex] = toObservable(source);
        acc.initialValues[keyOrIndex] = untracked(source);
      } else if (isObservable(source)) {
        acc.normalizedSources[keyOrIndex] = source.pipe(distinctUntilChanged());
        source.pipe(take(1)).subscribe((attemptedSyncValue) => {
          if (acc.initialValues[keyOrIndex] !== null) {
            acc.initialValues[keyOrIndex] = attemptedSyncValue;
          }
        });
        acc.initialValues[keyOrIndex] ??= null;
      } else {
        acc.normalizedSources[keyOrIndex] = from(source as any).pipe(
          distinctUntilChanged()
        );
        acc.initialValues[keyOrIndex] = null;
      }

      return acc;
    },
    {
      normalizedSources: Array.isArray(sources) ? [] : {},
      initialValues: Array.isArray(sources) ? [] : {},
    } as {
      normalizedSources: any;
      initialValues: any;
    }
  );

  normalizedSources = combineLatest(normalizedSources);
  if (operator) {
    normalizedSources = normalizedSources.pipe(operator);
    operator(of(initialValues))
      .pipe(take(1))
      .subscribe((newInitialValues) => {
        initialValues = newInitialValues;
      });
  }

  return toSignal(normalizedSources, { initialValue: initialValues });
}
