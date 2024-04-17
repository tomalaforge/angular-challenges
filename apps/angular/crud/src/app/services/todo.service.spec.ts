import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ITodo } from '../interfaces/ITodo';
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all todos from the API', () => {
    const mockData = [
      { id: 1, title: 'Test todo 1' },
      { id: 2, title: 'Test todo 2' },
    ];

    service.getTodos().subscribe((todo) => {
      expect(todo.length).toBe(2);
      expect(todo).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos',
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should update todo via API', () => {
    const updateTodo: ITodo = {
      id: 1,
      userId: 1,
      title: 'Task 1',
      completed: true,
    };

    service.updateTodo(updateTodo).subscribe((value) => {
      expect(value).toEqual(updateTodo);
    });

    const req = httpMock.expectOne(
      `https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`,
    );
    expect(req.request.method).toBe('PUT');
    req.flush(updateTodo);
  });

  it('should delete todo via API', () => {
    const deleteTodo: ITodo = {
      id: 1,
      userId: 1,
      title: 'Task 1',
      completed: true,
    };

    service.deleteTodo(deleteTodo).subscribe((value) => {
      expect(value).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `https://jsonplaceholder.typicode.com/todos/${deleteTodo.id}`,
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
