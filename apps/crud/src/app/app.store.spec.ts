import { TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';

import { AppStore } from './app.store';
import { TodoService } from './service/todo.service';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { AppComponent } from './app.component';
import { provideComponentStore } from '@ngrx/component-store';
import { Todo } from './interfaces/Todo';
import { lastValueFrom, take, throwError } from 'rxjs';

describe('AppStore', () => {
  it('truthy', async () => {
    const { store } = await setup();

    store.patchState({ todos: getFakeTodos(), callState: 'LOADED' });

    expect(store).toBeTruthy();
    const callState = await lastValueFrom(store.callState$.pipe(take(1)));
    expect(callState).toEqual('LOADED');
  });

  describe('todos$ selector', () => {
    it('should return todos from state', async () => {
      const todos: Todo[] = getFakeTodos();
      const { store } = await setup();

      store.patchState({ todos: getFakeTodos(), callState: 'LOADED' });

      const t = await lastValueFrom(store.todos$.pipe(take(1)));

      expect(t.length).toEqual(todos.length);
    });
  });

  // can't do success and failure
  // setup function has only one mocked returned value
  // and you can't overwrite it inside a test
  it('fetchTodo() failure', async () => {
    const { store } = await setup();

    store.fetchTodo();

    const todos = await lastValueFrom(store.todos$.pipe(take(1)));

    expect(todos.length).toEqual(0);

    const callState = await lastValueFrom(store.callState$.pipe(take(1)));

    expect(callState).toEqual('An error occurred');
  });

  it('updateTodo', async () => {
    const { store } = await setup();

    store.patchState({ todos: getFakeTodos() });

    store.updateTodo({
      userId: 1,
      id: 1,
      title: 'updated 1',
      completed: false,
      body: 'Test todo 1',
    });

    const todos = await lastValueFrom(store.todos$.pipe(take(1)));

    expect(todos[0]).toEqual({
      userId: 1,
      id: 1,
      title: 'updated 1',
      completed: false,
      body: 'Test todo 1',
    });
  });

  it('deleteTodo', async () => {
    const { store } = await setup();

    store.patchState({ todos: getFakeTodos(), callState: 'LOADED' });

    store.deleteTodoState(2);

    const todos = await lastValueFrom(store.todos$.pipe(take(1)));

    expect(todos.length).toEqual(1);
  });
});

const setup = async () => {
  const mockTodoService = createMockWithValues(TodoService, {
    getTodos: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
  });

  mockTodoService.getTodos.mockReturnValue(
    throwError(() => new Error('An error occurred'))
  );

  mockTodoService.updateTodo.mockReturnValue({
    id: 1,
    title: 'UPDATED todo 1',
  });

  mockTodoService.deleteTodo.mockReturnValue({
    userId: 2,
    id: 2,
    title: 'Test todo 2',
    completed: true,
    body: 'Test todo 2',
  });

  const fixture = await render(AppComponent, {
    providers: [
      provideComponentStore(AppStore),
      { provide: TodoService, useValue: mockTodoService },
    ],
  });

  const store = TestBed.inject(AppStore);

  store.setState({ todos: [], callState: 'Loading' }); // initial state

  return { fixture, store, mockTodoService };
};

export function getFakeTodos(): Todo[] {
  return [
    {
      userId: 1,
      id: 1,
      title: 'Test todo 1',
      completed: false,
      body: 'Test todo 1',
    },
    {
      userId: 2,
      id: 2,
      title: 'Test todo 2',
      completed: true,
      body: 'Test todo 2',
    },
  ];
}
