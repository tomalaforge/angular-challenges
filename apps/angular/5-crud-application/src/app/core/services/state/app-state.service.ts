import { computed, Injectable, signal } from '@angular/core';

export type TState = 'READY' | 'LOADING' | 'ERROR';

export interface IState {
  state: TState;
  error: string | null;
  todoId: number | null;
}

/**
 * Service responsible for managing the application state.
 * It provides methods to update and query the current state, error, and todoId being processed.
 */
@Injectable({
  providedIn: 'root',
})
export class App5StateService {
  #appState = signal<IState>({ state: 'READY', error: null, todoId: null });

  /**
   * Returns the current application state as a computed property.
   * @returns The current application state including state, error, and todoId.
   */
  public appState = computed<IState>(() => {
    return this.#appState();
  });

  /**
   * Returns the current state.
   * @returns The current state value ('READY', 'LOADING', or 'ERROR').
   */
  public get state(): TState {
    return this.#appState().state;
  }

  /**
   * Returns the current error message, if any.
   * @returns The current error message or null if no error.
   */
  public get error(): string | null {
    return this.#appState().error;
  }

  /**
   * Sets the application state to 'READY' and clears any error or todoId.
   */
  public setReady(): void {
    this.#appState.update(() => ({
      state: 'READY',
      error: null,
      todoId: null,
    }));
  }

  /**
   * Sets the application state to 'LOADING' and optionally sets the todoId being processed.
   * @param todoId The ID of the todo item being processed, or null if not applicable.
   */
  public setLoading(todoId: number | null): void {
    this.#appState.update(() => ({
      state: 'LOADING',
      error: null,
      todoId: todoId,
    }));
  }

  /**
   * Sets the application state to 'ERROR', records the error message, and optionally sets the todoId related to the error.
   * @param error The error message to record.
   * @param todoId The ID of the todo item related to the error, or null if not applicable.
   */
  public setError(error: string, todoId: number | null): void {
    this.#appState.update(() => ({ state: 'ERROR', error, todoId: todoId }));
  }

  /**
   * Checks if the current state is 'LOADING'.
   * @returns True if the state is 'LOADING', false otherwise.
   */
  public isStatusLoading(): boolean {
    return this.#appState().state === 'LOADING';
  }

  /**
   * Checks if the current state is 'LOADING' for a specific todoId.
   * @param todoId The ID of the todo item to check.
   * @returns True if the state is 'LOADING' and the todoId matches, false otherwise.
   */
  public isStatusLoadingWith(todoId: number): boolean {
    return (
      this.#appState().state === 'LOADING' && this.#appState().todoId === todoId
    );
  }

  /**
   * Checks if the current state is 'ERROR'.
   * @returns True if the state is 'ERROR', false otherwise.
   */
  public isStatusError(): boolean {
    return this.#appState().state === 'ERROR';
  }

  /**
   * Checks if the current state is 'ERROR' for a specific todoId.
   * @param todoId The ID of the todo item related to the error.
   * @returns True if the state is 'ERROR' and the todoId matches, false otherwise.
   */
  public isStatusErrorWith(todoId: number): boolean {
    return (
      this.#appState().state === 'ERROR' && this.#appState().todoId === todoId
    );
  }

  /**
   * Checks if the current state is 'READY'.
   * @returns True if the state is 'READY', false otherwise.
   */
  public isStatusReady(): boolean {
    return this.#appState().state === 'READY';
  }
}
