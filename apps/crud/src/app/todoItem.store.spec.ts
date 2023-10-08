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
    const { store } = await setup('success');
    expect(store).toBeTruthy();
  });

  // can't use a done function inside an async function anymore with jest v27+
  // change setup function to not be an async function but have an async function inside?
  // probably bad idea
  // use rxjs

  it('ngOnInit', async () => {
    const { store } = await setup('success');

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

  /*
  // test doesn't work
  // problem caused by the tap or tapResponse ?
  // the callState is updating

  it('updateTodo', async () => {
    const { store } = await setup('success');

    store.setState({
      todo: {
        userId: 1,
        id: 1,
        title: 'Test todo 1',
        completed: false,
        body: 'Test todo 1',
      },
    })

    store.update(1);

    const callState = await lastValueFrom(store.callState$.pipe(take(1)));

    expect(callState).toEqual('LOADED'); // Updating

    const todo = await lastValueFrom(store.todo$.pipe(take(1))); //undefined

    expect(todo).toBe({
      userId: 1,
      id: 1,
      title: 'updated 1',
      completed: false,
      body: 'Test todo 1'
    })

  });
  */

  it('updateTodo failure', async () => {
    const { store } = await setup('failure');

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
    const { store } = await setup('success');

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

  it('deleteTodo failure', async () => {
    const { store } = await setup('failure');

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

    const callState = await lastValueFrom(store.callState$.pipe(take(1)));

    expect(callState).toEqual('Delete error');
  });
});

const setup = async (state: string) => {
  const mockTodoService = createMockWithValues(TodoService, {
    getTodos: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
  });

  if (state === 'success') {
    mockTodoService.updateTodo.mockReturnValue({
      userId: 1,
      id: 1,
      title: 'updated 1',
      completed: false,
      body: 'Test todo 1',
    });

    mockTodoService.deleteTodo.mockReturnValue(of(undefined));
  } else {
    mockTodoService.updateTodo.mockReturnValue(
      throwError(() => new Error('Update error'))
    );

    mockTodoService.deleteTodo.mockReturnValue(
      throwError(() => new Error('Delete error'))
    );
  }

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
