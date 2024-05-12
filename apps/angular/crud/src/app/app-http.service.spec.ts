import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { MockBuilder, ngMocks } from 'ng-mocks';
import { AppHttpService } from './app-http.service';
import { ToDo } from './todo.interface';
describe('AppHttpService', () => {
  beforeEach(() =>
    MockBuilder(AppHttpService).replace(
      HttpClientModule,
      HttpClientTestingModule,
    ),
  );

  it('should be created', () => {
    const service = ngMocks.get(AppHttpService);
    expect(service).toBeTruthy();
  });

  it('should get todos', fakeAsync(() => {
    const service = ngMocks.get(AppHttpService);
    const mockTodos: ToDo[] = [
      { id: 1, title: 'Test', body: 'Test body', userId: 1 },
    ];

    service.getTodos$().subscribe((todos) => {
      expect(todos).toEqual(mockTodos);
    });

    const httpMock = ngMocks.get(HttpTestingController);
    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos',
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockTodos);
    tick();
  }));

  it('should update todo', () => {
    const service = ngMocks.get(AppHttpService);
    const mockTodo: ToDo = {
      id: 1,
      title: 'Test',
      body: 'Test body',
      userId: 1,
    };

    service.updateTodo$(mockTodo).subscribe((todo) => {
      expect(todo).toEqual(mockTodo);
    });
    const httpMock = ngMocks.get(HttpTestingController);
    const req = httpMock.expectOne(
      `https://jsonplaceholder.typicode.com/todos/${mockTodo.id}`,
      JSON.stringify({
        todo: mockTodo.id,
        title: mockTodo.title,
        body: mockTodo.body,
        userId: mockTodo.userId,
      }),
    );

    expect(req.request.method).toEqual('PUT');

    req.flush(mockTodo);
    tick();
  });
});
