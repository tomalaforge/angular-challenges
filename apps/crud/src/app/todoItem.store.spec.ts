import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { TodoService } from './service/todo.service';
import { TestBed } from '@angular/core/testing';
import { provideComponentStore } from '@ngrx/component-store';
import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { AppStore } from './app.store';
import { TodoItemStore } from './todoItem.store';

describe('TodoItemStore', () => {
  it('truthy', async () => {
    const { store } = await setup();
    store.setState({ todo: undefined, callState: '' });
    expect(store).toBeTruthy();
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
