import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { TodoService } from './service/todo.service';
import { TestBed } from '@angular/core/testing';
import { provideComponentStore } from '@ngrx/component-store';
import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { AppStore } from './app.store';
import { TodoItemStore } from './todoItem.store';
import { lastValueFrom, of, take, throwError } from 'rxjs';

describe('TodoItemStore', () => {
  it('truthy', async () => {
    const { store } = await setup();
    expect(store).toBeTruthy();
  });

  // can't use done inside an async function anymore with jest 27+
  // change setup function to not be an async function by having an inner async function inside ?
  // probably bad idea
  // use rxjs

  it('ngOnInit', async () => {
    const { store } = await setup();

    store.ngOnInit();

    /*
    store.todo$.subscribe(data => {
      expect(data).toBeUndefined();
    })
    */

    const todo = await lastValueFrom(store.todo$.pipe(take(1)));
    expect(todo).toBeUndefined();
    const callState = await lastValueFrom(store.callState$.pipe(take(1)));
    expect(callState).toBe('');
  });

  it('updateTodo', async () => {
    const { store } = await setup();

    store.setState({
      todo: {
        userId: 1,
        id: 1,
        title: 'Test todo 1',
        completed: false,
        body: 'Test todo 1',
      },
      callState: 'LOADED',
    });

    store.update(1);

    const callState = await lastValueFrom(store.callState$.pipe(take(1)));

    expect(callState).toEqual('Update error');
  });

  it('deleteTodo', async () => {
    const { store } = await setup();

    store.setState({
      todo: {
        userId: 2,
        id: 2,
        title: 'Test todo 2',
        completed: true,
        body: 'Test todo 2',
      },
      callState: 'LOADED',
    });

    store.deleteTodo(2);

    const todo = await lastValueFrom(store.todo$.pipe(take(1)));

    expect(todo).toEqual(undefined);
  });
});

const setup = async () => {
  const mockTodoService = createMockWithValues(TodoService, {
    getTodos: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
  });

  mockTodoService.deleteTodo.mockReturnValue(of(undefined));
  mockTodoService.updateTodo.mockReturnValue(
    throwError(() => new Error('Update error'))
  );

  const fixture = await render(AppComponent, {
    providers: [
      provideComponentStore(AppStore),
      provideComponentStore(TodoItemStore),
      { provide: TodoService, useValue: mockTodoService },
    ],
  });

  const store = TestBed.inject(TodoItemStore);

  store.setState({ todo: undefined, callState: '' }); //initial state

  return { fixture, store, mockTodoService };
};
