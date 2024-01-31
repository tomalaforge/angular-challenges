# NgRx CallState ComponentStore

NgRx CallState ComponentStore is a small library that extends the **@Ngrx/component-store** by adding a loading and error state to your custom state.

## Installation

Requires @Ngrx/component-store

Yarn:

```bash
yarn add @tomalaforge/ngrx-callstate-store
```

NPM:

```bash
npm i @tomalaforge/ngrx-callstate-store
```

## Introduction

When making XHR calls or any asynschronous tasks, you always need a loading or error state. By using `CallStateComponentStore`, you can easily manage the loading and error states of your async tasks, which makes your code more organized and maintainable.

## Example

```typescript
@Injectable()
export class AppStore extends CallStateComponentStore<{todos: Todo[]}> {
  readonly todos$ = this.select((state) => state.todos);

  readonly vm$ = this.select({
    todos: this.todos$,
    loading: this.loading$,
  }, {debounce: true});

  constructor(private todoService: TodoService) {
    super({ todos: [] });
  }

  readonly fetchTodo = this.effect<void>(
    pipe(
      tap(() => this.startLoading()),
      switchMap(() =>
        this.todoService.getAllTodo().pipe(
          tapResponse(
            (todos) => this.stopLoading({ todos }),
            (error: unknown) => this.handleError(error, {todos: []})
          )
        )
      )
    )
  );
```

By extending your class with `CallStateComponentStore`, a `CallState` property is added to your state.

> You don't need to provide a state if you only want to use the `CallState` property.

```typescript
export type LoadingState = 'INIT' | 'LOADING' | 'LOADED';

export interface ErrorState {
  error: CustomError;
}

export type CallState = LoadingState | ErrorState;
```

> You can override [`CustomError`](#errorstate) as needed.

## API

### initialization

##### setInitState

The `setInitState` method lets you initialize your custom state if you are not using the constructor.

```typescript
setInitState = (state: T): void
```

### updater

##### startLoading

The `startLoading` method sets the `CallState` property to the `LOADING` state. You can pass optional state properties if you want to patch your own state.

```typescript
startLoading = (state: Optional<T>): void
```

##### stopLoading

The `stopLoading` method sets the `CallState` to the `LOADED` state. You can pass an optional state properties as well.

```typescript
stopLoading = (state: Optional<T>): void
```

##### updateCallState

The `updateCallState` method updates the callState with the inputed value.

```typescript
updateCallState = (callState: CallState): void
```

##### handleError

The `handleError` method handles errors. You can pass an optional state.

```typescript
handleError = (error: unknown, state: Optional<T>): void
```

### selector

##### isLoading$

`isLoading$` return a boolean, true if state is loading, false otherwise

##### isLoadingWithFlicker$

`isLoadingWithFlicker$` return the same as `isLoading$` but with a small delay. This can be useful when you don't want your page to flicker.

##### isLoaded$

`isLoaded$` return a boolean, true if state is loaded, false otherwise

##### callState$

`isLoading$` return the `CallState`

##### error$

`isLoading$` return your error message using the `getErrorMessage` of your `ErrorState`. [(see below)](#errorstate)

---

### Customize the library

##### ErrorState

You can provide your own implementation of The `ErrorState` by implementing `ErrorHandler`

```typescript
export interface ErrorHandler<T extends CustomError> {
  toError: (error: unknown) => T;
  getErrorMessage: (error?: T) => string | undefined;
}
```

The `toError` method converts the error input into the desired error object.
The `getErrorMessage` method returns the well-formed error message that you want to display to your user.

The current implementation is as follow:

```typescript
export const UNKNOWN_ERROR_CAUSE = 'UNKNOWN_ERROR';
export const UNKNOWN_ERROR_MESSAGE = 'unknown error occured';

export class CallStateError {
  name: string;
  message: string;
  stack?: string;

  constructor(name = '', message = '') {
    this.name = name;
    this.message = message;
  }
}

export class CallStateErrorHandler implements ErrorHandler<CallStateError> {
  toError = (error: unknown): CallStateError => {
    if (error instanceof CallStateError) return error;
    if (error instanceof Error) return new CallStateError(error.name, error.message);
    return new CallStateError(UNKNOWN_ERROR_CAUSE, UNKNOWN_ERROR_MESSAGE);
  };

  getErrorMessage = (error?: CallStateError): string | undefined => {
    return error?.message;
  };
}
```

Let's say you want to customize it as follow:

```typescript
export const UNKNOWN_ERROR_MESSAGE = 'unknown error occured';

export class MyError {
  message: string;
  code: number

  constructor(message = '', code = 404) {
    this.message = message;
    this.code = code;
  }
}

export class MyErrorHandler implements ErrorHandler<MyError> {
  toError = (error: unknown): MyError => {
    if (error instanceof MyError) return error;
    if (error instanceof Error)
      return new MyError(error.message);
    return new MyError(UNKNOWN_ERROR_MESSAGE);
  };

  getErrorMessage = (error?: MyError): string | undefined => {
    return error.code error?.message;
  };
}
```

Now to override the default implementation, you need to provide it as follow :

```typescript
provideErrorHandler(MyErrorHandler);
```

> You can provide it at root level to apply it to your whole application or at the component level for more specific implementation.

##### Flicker Delay

The default delay is 300ms but you can override it by providing it as follow:

```typescript
provideFlickerDelay(500);
```
