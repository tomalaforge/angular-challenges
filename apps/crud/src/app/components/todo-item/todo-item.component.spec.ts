import { render, screen } from '@testing-library/angular';
import { TodoItemComponent } from './todo-item.component';
import { provideComponentStore } from '@ngrx/component-store';
import { TodoItemStore } from '../../todoItem.store';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppStore } from '../../app.store';
import { TodoService } from '../../service/todo.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { createMockWithValues } from '@testing-library/angular/jest-utils';

describe('TodoItemComponent', () => {
  test('should render', async () => {
    const mockTodoService = createMockWithValues(TodoService, {
      getTodos: jest.fn(),
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
    });

    const component = await render(TodoItemComponent, {
      imports: [TodoItemComponent, LoadingSpinnerComponent],
      providers: [
        provideComponentStore(TodoItemStore),
        provideComponentStore(AppStore),
        { provide: TodoService, useValue: mockTodoService },
        HttpClient,
        HttpHandler,
      ],
    });
    expect(component).toBeTruthy();
  });
});
