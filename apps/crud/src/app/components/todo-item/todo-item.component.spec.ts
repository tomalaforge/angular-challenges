import { fireEvent, render, screen } from '@testing-library/angular';
import { TodoItemComponent } from './todo-item.component';
import { provideComponentStore } from '@ngrx/component-store';
import { TodoItemStore } from '../../todoItem.store';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppStore } from '../../app.store';
import { TodoService } from '../../service/todo.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('TodoItemComponent', () => {
  test('should render', async () => {
    const { fixture } = await setup();
    expect(fixture).toBeTruthy();
  });

  test('update', async () => {
    const { mockTodoService } = await setup();

    const button = await screen.findByRole('button', { name: /update/i });

    fireEvent.click(button);

    expect(mockTodoService.updateTodo).toHaveBeenCalledTimes(1);
  });

  test('delete', async () => {
    const { mockTodoService } = await setup();

    const button = await screen.findByRole('button', { name: /delete/i });

    fireEvent.click(button);

    expect(mockTodoService.deleteTodo).toHaveBeenCalledTimes(1);
  });
});

const setup = async () => {
  const mockTodoService = createMockWithValues(TodoService, {
    getTodos: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
  });

  mockTodoService.getTodos.mockReturnValue(of([]));

  const fixture = await render(TodoItemComponent, {
    componentInputs: {
      todo: {
        userId: 2,
        id: 2,
        title: 'Test todo 2',
        completed: true,
        body: 'Test todo 2',
      },
    },
    imports: [TodoItemComponent, LoadingSpinnerComponent],
    providers: [
      provideComponentStore(TodoItemStore),
      provideComponentStore(AppStore),
      { provide: TodoService, useValue: mockTodoService },
      HttpClient,
      HttpHandler,
    ],
  });

  /*
  // doesn't work to set todo directly

  fixture.fixture.componentInstance.todo = {
    userId: 2,
    id: 2,
    title: 'Test todo 2',
    completed: true,
    body: 'Test todo 2',
  };
  */

  const store = TestBed.inject(TodoItemStore);

  return { mockTodoService, fixture, store };
};
