import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from '../models/todo.model';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

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

  it('should fetch todos', () => {
    const mockTodos: Todo[] = [
      {
        id: 1,
        title: 'Test Todo',
        completed: false,
        userId: 1,
      },
    ];

    service.getTodos().subscribe((todos) => {
      expect(todos.length).toBe(1);
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should update a todo', () => {
    const updatedTodo: Todo = {
      id: 1,
      title: 'Updated Todo',
      completed: false,
      userId: 0,
    };

    service.updateTodo(updatedTodo).subscribe((todo) => {
      expect(todo).toEqual(updatedTodo);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTodo);
  });

  it('should delete a todo', () => {
    const todo: Todo = {
      id: 1,
      title: 'Updated Todo',
      completed: false,
      userId: 0,
    };

    service.deleteTodo(todo).subscribe(() => {
      // api returns nothing because we are doing a soft delete
      service.getTodos().subscribe((todos) => {
        expect(todos).not.toContain(todo);
      });
    });

    const deleteReq = httpMock.expectOne(`${apiUrl}/1`);
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({});

    const getReq = httpMock.expectOne(apiUrl);
    expect(getReq.request.method).toBe('GET');
    getReq.flush([]);
  });

  it('should handle errors', () => {
    service.getTodos().subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => expect(error.status).toBe(500),
    });
    const req = httpMock.expectOne(apiUrl);
    req.flush('Something went wrong', {
      status: 500,
      statusText: 'Server Error',
    });
  });
});
