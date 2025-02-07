import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from '../interfaces/todo.interface';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    completed: false,
    userId: 1,
  };

  it('should fetch todos', () => {
    const mockTodos = [mockTodo];

    service.getTodos().subscribe((todos) => {
      expect(todos).toEqual(mockTodos);
      expect(service.todos()).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos',
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should update todo', () => {
    const update = { title: 'Updated Todo', completed: true };
    const updatedTodo = { ...mockTodo, ...update };

    service.updateTodo(1, update).subscribe((todo) => {
      expect(todo).toEqual(updatedTodo);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTodo);
  });

  it('should delete todo', () => {
    service.deleteTodo(1).subscribe();

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
