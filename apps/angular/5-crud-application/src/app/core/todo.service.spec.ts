import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from '../todo.interface';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  let baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  const mockTodos: Todo[] = [
    { userId: 1, id: 1, title: 'Test Todo 1', completed: false },
    { userId: 1, id: 2, title: 'Test Todo 2', completed: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load todos', () => {
    httpMock.expectOne(`${baseUrl}`).flush(mockTodos);
    service.loadTodos();

    const req = httpMock.expectOne(`${baseUrl}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockTodos);

    expect(service.todos()).toEqual(mockTodos);
    expect(service.loading()).toBeFalsy();
    expect(service.error()).toBe('');
  });

  it('should update a todo', () => {
    const updatedTodo: Todo = { ...mockTodos[0], title: 'Updated Title' };

    service.updateTodo(updatedTodo).subscribe((result) => {
      expect(result).toEqual(updatedTodo);
      expect(service.todos()).toContain(updatedTodo);
    });

    const req = httpMock.expectOne(`${baseUrl}/${updatedTodo.id}`);
    expect(req.request.method).toBe('PUT');

    req.flush(updatedTodo);
  });

  it('should delete a todo', () => {
    service.deleteTodo(mockTodos[0].id).subscribe(() => {
      expect(service.todos()).not.toContain(mockTodos[0]);
    });

    const req = httpMock.expectOne(`${baseUrl}/${mockTodos[0].id}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });

  it('should create a new todo', () => {
    httpMock.expectOne(`${baseUrl}`).flush(mockTodos);
    const newTodo = { userId: 1, title: 'New Todo', completed: false };

    service.createTodo(newTodo).subscribe((result) => {
      expect(result).toEqual({ ...newTodo, id: 3 });
      expect(service.todos()[0]).toEqual({ ...newTodo, id: 3 });
    });

    const req = httpMock.expectOne(`${baseUrl}`);
    expect(req.request.method).toBe('POST');

    req.flush({ ...newTodo, id: 3 });
  });

  it('should clear error', () => {
    service.clearError();
    expect(service.error()).toBe('');
  });
});
