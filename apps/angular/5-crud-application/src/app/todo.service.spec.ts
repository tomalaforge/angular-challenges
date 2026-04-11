import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideApiConfig } from './core/provide-api-config';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpTesting: HttpTestingController;

  const todos: Todo[] = [
    { id: 1, userId: 1, title: 'First todo', completed: false },
    { id: 2, userId: 1, title: 'Second todo', completed: false },
    { id: 3, userId: 1, title: 'Third todo', completed: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiConfig(),
      ],
    });

    service = TestBed.inject(TodoService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should load todos', () => {
    service.loadTodos();

    const request = httpTesting.expectOne('/api/todos');

    expect(request.request.method).toBe('GET');

    request.flush(todos);

    expect(service.todos()).toEqual(todos);
    expect(service.loadingState()).toBe(false);
    expect(service.errorState()).toBeNull();
  });

  it('should update a todo without changing the list order', () => {
    service.setTodo(todos);

    const updatedTodo: Todo = {
      ...todos[1],
      title: 'Updated todo',
    };

    service.updateTodo(updatedTodo);

    const request = httpTesting.expectOne('/api/todos/2');

    expect(request.request.method).toBe('PUT');

    request.flush(updatedTodo);

    expect(service.todos()).toEqual([todos[0], updatedTodo, todos[2]]);
  });

  it('should delete a todo', () => {
    service.setTodo(todos);

    service.deleteTodo(2);

    const request = httpTesting.expectOne('/api/todos/2');

    expect(request.request.method).toBe('DELETE');

    request.flush(null);

    expect(service.todos()).toEqual([todos[0], todos[2]]);
  });
});
