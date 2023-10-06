import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { TodoService } from './service/todo.service';
import { TestBed } from '@angular/core/testing';
import { provideComponentStore } from '@ngrx/component-store';
import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { AppStore } from './app.store';
import { TodoItemStore } from './todoItem.store';
import { lastValueFrom, take } from 'rxjs';

describe('TodoItemStore', () => {
  it('truthy', async () => {
    const { store } = await setup();
    store.setState({ todo: undefined, callState: '' });
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
});

const setup = async () => {
  const mockTodoService = createMockWithValues(TodoService, {
    getTodos: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
  });

  const fixture = await render(AppComponent, {
    providers: [
      provideComponentStore(AppStore),
      provideComponentStore(TodoItemStore),
      { provide: TodoService, useValue: mockTodoService },
    ],
  });

  const store = TestBed.inject(TodoItemStore);

  return { fixture, store, mockTodoService };
};
