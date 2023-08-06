import {
  assertInInjectionContext,
  DestroyRef,
  ErrorHandler,
  inject,
  Injector,
  isSignal,
  Signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  catchError,
  EMPTY,
  isObservable,
  MonoTypeOperatorFunction,
  Observable,
  of,
  OperatorFunction,
  pipe,
  repeat,
  Subject,
  Unsubscribable,
} from 'rxjs';

export type RxMethodOptions = {
  injector?: Injector;
  /**
   * By default, this option is `true`. If set to `false`, the `rxMethod` will
   * not retry on error.
   */
  retryOnError?: boolean;
};

type RxMethodInput<Input> = Input | Observable<Input> | Signal<Input>;

type RxMethod<Input> = ((input: RxMethodInput<Input>) => Unsubscribable) &
  Unsubscribable;

export function rxMethod<Input>(
  generator: OperatorFunction<Input, unknown>,
  options?: RxMethodOptions
): RxMethod<Input> {
  if (!options?.injector) {
    assertInInjectionContext(rxMethod);
  }

  const injector = options?.injector ?? inject(Injector);
  const shouldRetryOnError = options?.retryOnError ?? true;
  const errorHandler = injector.get(ErrorHandler);
  const destroyRef = injector.get(DestroyRef);
  const source$ = new Subject<Input>();

  const sourceSub = (
    shouldRetryOnError
      ? generator(source$).pipe(retryOnError(errorHandler))
      : generator(source$)
  ).subscribe();
  destroyRef.onDestroy(() => sourceSub.unsubscribe());

  const rxMethodFn = (input: RxMethodInput<Input>) => {
    let input$: Observable<Input>;

    if (isSignal(input)) {
      input$ = toObservable(input, { injector });
    } else if (isObservable(input)) {
      input$ = input;
    } else {
      input$ = of(input);
    }

    const instanceSub = input$.subscribe((value) => source$.next(value));
    sourceSub.add(instanceSub);

    return instanceSub;
  };
  rxMethodFn.unsubscribe = sourceSub.unsubscribe.bind(sourceSub);

  return rxMethodFn;
}

function retryOnError<T>(
  errorHandler: ErrorHandler
): MonoTypeOperatorFunction<T> {
  return pipe(
    catchError((error) => {
      errorHandler.handleError(error);
      return EMPTY;
    }),
    repeat()
  );
}
