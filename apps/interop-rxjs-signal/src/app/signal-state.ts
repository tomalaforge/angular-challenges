import {
  computed,
  effect,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

type Signals<T> = { [P in keyof T]: WritableSignal<T[P]> };
type SpecificKeysOfObj<T> = { [P in keyof T]: T[P] };
type SpecificKeysOfObjAsSignals<T> = { [P in keyof T]: Signal<T[P]> };

@Injectable()
export class SignalState<T extends Record<string, unknown>> {
  private readonly notInitializedError =
    'Signal state is not initialized yet, call the initialize() method before using any other methods';
  private signals: Signals<T> | undefined;

  /**
   * Initializes the state with initial values
   */
  protected initialize<P extends keyof T>(state: T): void {
    const signals: Partial<Signals<T>> = {};
    (Object.keys(state) as P[]).forEach((key) => {
      signals[key] = signal<T[P]>(state[key]);
    });
    this.signals = signals as Signals<T>;
  }

  /**
   * Throws an error when the state is not initialized.
   * Selects one piece of the state
   * @param key: the key that is related to the piece of state we want to consume
   * @param cb: (Optional) The callback function that will calculate the computed signal
   */
  public select<K extends keyof T>(key: K): Signal<T[K]>;
  public select<K extends keyof T, P>(
    key: K,
    cb: (state: T[K]) => P
  ): Signal<P>;
  public select<K extends keyof T, P>(
    key: K,
    cb?: (state: T[K]) => P
  ): Signal<T[K] | P> {
    return computed(() => {
      const state = this.throwOrReturnSignals()[key]() as T[K];
      return cb ? (cb(state) as P) : (state as T[K]);
    });
  }

  /**
   * Throws an error when the state is not initialized.
   * Creates a computed signal based on pieces of state (signals)
   * @param keys: The keys that are related to the pieces of state we want to consume
   * @param cb: (Optional) The callback function that will calculate the computed signal
   */
  public selectMany(keys: (keyof T)[]): Signal<SpecificKeysOfObj<T>>;
  public selectMany<P>(
    keys: (keyof T)[],
    cb: (obj: SpecificKeysOfObj<T>) => P
  ): Signal<P>;
  public selectMany<P>(
    keys: (keyof T)[],
    cb?: (obj: SpecificKeysOfObj<T>) => P
  ): Signal<P | SpecificKeysOfObj<T>> {
    return computed(() => {
      const state = keys.reduce((obj, key) => {
        obj[key] = this.throwOrReturnSignals()[key]();
        return obj;
      }, {} as Partial<SpecificKeysOfObj<T>>) as SpecificKeysOfObj<T>;
      return cb ? (cb(state) as P) : (state as SpecificKeysOfObj<T>);
    });
  }

  /**
   * Throws an error when the state is not initialized.
   * Returns an object where every property is a signal.
   * This method is ideal to pick pieces of state from somewhere else
   * @param keys: The keys that are related to the pieces of state we want to pick
   */
  public pick<P extends keyof T>(
    keys: (keyof T)[]
  ): SpecificKeysOfObjAsSignals<T> {
    return keys.reduce((obj, key) => {
      obj[key] = this.throwOrReturnSignals()[key];
      return obj;
    }, {} as Partial<SpecificKeysOfObjAsSignals<T>>) as SpecificKeysOfObjAsSignals<T>;
  }

  /**
   * Throws an error when the state is not initialized.
   * Connects a partial state object where every property is a signal to the state
   * This will automatically feed the state whenever one of the signals changes
   * @param object: The object holding the signals where we want to listen to
   */
  protected connect(object: Partial<{ [P in keyof T]: Signal<T[P]> }>): void {
    this.throwOrReturnSignals();
    effect(
      () => {
        Object.keys(object).forEach((key: keyof T) => {
          const v = object[key] as Signal<keyof T>;
          this.patch({ [key]: v() } as Partial<T>);
        });
      },
      { allowSignalWrites: true }
    );
  }

  /**
   * Patches the state with a partial object. This will loop through all the state signals and update
   * them one by one
   */
  protected patch<P extends keyof T>(object: Partial<T>): void {
    const signals = this.throwOrReturnSignals();
    (Object.keys(object) as P[]).forEach((key: P) => {
      signals[key].set(object[key] as T[P]);
    });
  }

  /**
   * Returns the state as a signal
   */
  public state = computed(() => {
    this.throwOrReturnSignals();
    return this.snapshot;
  });

  /**
   * Returns the state as a snapshot
   */
  public get snapshot(): T {
    const signals = this.throwOrReturnSignals();
    return Object.keys(signals).reduce((obj, key: keyof T) => {
      obj[key] = signals[key]();
      return obj;
    }, {} as Partial<T>) as T;
  }

  private throwOrReturnSignals(): Signals<T> {
    if (!this.signals) {
      throw new Error(this.notInitializedError);
    }
    return this.signals as Signals<T>;
  }
}

// todo: triggers
