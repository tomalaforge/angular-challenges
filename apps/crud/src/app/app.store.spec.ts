import { TestBed } from '@angular/core/testing';
import { of, skip, take, throwError } from 'rxjs';

import { AppState, AppStore } from './app.store';
import { TodoService } from './service/todo.service';
import { Todo } from './interfaces/Todo';
/*
describe('AppStore', () => {
  let appStore: AppStore;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    const todoServiceSpyObj = jasmine.createSpyObj('TodoService', [
      'getTodos',
      'updateTodo',
      'deleteTodo'
    ]);

    TestBed.configureTestingModule({
      providers: [
        AppStore,
        { provide: TodoService, useValue: todoServiceSpyObj },
      ],
    });

    appStore = TestBed.inject(AppStore);
    todoServiceSpy = TestBed.inject(
      TodoService
    ) as jasmine.SpyObj<TodoService>;
    appStore.setState({ todos: [], callState: 'Loading' });
  });

  it('should be created', () => {
    expect(appStore).toBeTruthy();
  });

  describe('todos$ selector', () => {
    it('should return todos from state', (done: DoneFn) => {
      // Given
      const todos: Todo[] = getFakeTodos();
      appStore.patchState({ todos });

      // Then
      appStore.todos$.pipe().subscribe({
        next: (todos: Todo[]) => {
          expect(todos.length).toBe(todos.length);
          done();
        },
      });
    });
  });

  describe('callState$ selector', () => {
    it('should return callState from state', (done: DoneFn) => {
      // Given
      const callState = "Loading";
      appStore.patchState({ callState });

      // Then
      appStore.callState$.pipe().subscribe({
        next: (callState: string) => {
          expect(callState).toBe("Loading");
          done();
        },
      });
    });
  });

  describe('fetchTodo() method', () => {
    it('should update state with returned todos', (done: DoneFn) => {

      appStore.patchState({ todos: [] });

      // Given
      const todos: Todo[] = getFakeTodos();
      todoServiceSpy.getTodos.and.returnValue(of(todos));

      // Then
      appStore.state$.pipe(skip(1), take(1)).subscribe({
        next: (state: AppState) => {
          expect(state.todos).toEqual(todos);
          done();
        },
      });

      // When
      appStore.fetchTodo();
    });

    it('should update the state with an error message if an error occurs', (done: DoneFn) => {
      // Given
      const error = 'An error occurred';
      todoServiceSpy.getTodos.and.returnValue(
        throwError(() => new Error(error))
      );

      // Then
      appStore.state$.pipe(skip(1), take(1)).subscribe({
        next: (state: AppState) => {
          expect(state.callState).toEqual(error);
          done();
        },
      });

      // When
      appStore.fetchTodo();
    });
  });

})

export function getFakeTodos(): Todo[] {
  return [
    {
      userId: 1,
      id: 1,
      title: 'Test todo 1',
      completed: false,
      body: 'Test todo 1'
    },
    {
      userId: 2,
      id: 2,
      title: 'Test todo 2',
      completed: true,
      body: 'Test todo 2'
    },
  ]
}

*/

describe('AppStore', () => {});
