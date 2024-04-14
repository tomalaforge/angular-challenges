import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Todo } from '../interfaces/todo.interface';
import { TodoService } from './todo.service';

class MockHttpClient {
  get = jest.fn();
  put = jest.fn();
  delete = jest.fn();
}
const httpClientMock = new MockHttpClient();
const BASE_URL = 'api_url';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get method', () => {
    it('should return observable of Todo array', () => {
      const dummyTodos = [
        { id: 1, title: 'Todo 1' },
        { id: 2, title: 'Todo 2' },
      ];
      httpClientMock.get.mockReturnValue(of(dummyTodos));
      service.get().subscribe((todos) => {
        expect(todos).toEqual(dummyTodos);
      });
    });

    it('should delay response by 1 second', () => {
      const dummyTodos = [
        { id: 1, title: 'Todo 1' },
        { id: 2, title: 'Todo 2' },
      ];
      httpClientMock.get.mockReturnValue(of(dummyTodos).pipe(delay(1000)));
      const start = Date.now();
      service.get().subscribe(() => {
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(1000);
      });
    });
  });

  describe('update method', () => {
    it('should call HttpClient.put with correct URL and payload', () => {
      const todo: Todo = {
        id: 1,
        title: 'Updated Todo',
        completed: false,
        userId: 1,
      };
      httpClientMock.put.mockReturnValue(of(todo));
      service.update(todo).subscribe(() => {
        expect(httpClientMock.put).toHaveBeenCalledWith(
          `${BASE_URL}/${todo.id}`,
          JSON.stringify(todo),
          { headers: { 'Content-type': 'application/json; charset=UTF-8' } },
        );
      });
    });
  });

  describe('delete method', () => {
    it('should call HttpClient.delete with correct URL', () => {
      const todoId = 1;
      httpClientMock.delete.mockReturnValue(of(null));
      service.delete(todoId).subscribe(() => {
        expect(httpClientMock.delete).toHaveBeenCalledWith(
          `${BASE_URL}/${todoId.toString()}`,
        );
      });
    });
  });
});
