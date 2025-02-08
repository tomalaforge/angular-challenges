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
});
