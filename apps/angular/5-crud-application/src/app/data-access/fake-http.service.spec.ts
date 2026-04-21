import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FakeHttpService } from './fake-http.service';

describe('FakeHTTPService', () => {
  let service: FakeHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FakeHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
  test('should fetch all todos and update signals', () => {
    // Arrange
    const mockTodos = [
      {
        id: 1,
        title: 'Test todo',
        body: 'Todo body',
        completed: 'false',
      },
    ];

    // Act
    service.getAllTodos();

    // Assert request
    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos',
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);

    // Assert signal update
    expect(service.todoSignal()).toEqual(mockTodos);
  });

  test('should pass updated todo and update signal', () => {
    // Arrange
    const initialTodo = [
      {
        id: 1,
        title: 'old',
        completed: false,
      },
    ];
    service.todoSignal.set(initialTodo);

    const updatedTodo = {
      id: 1,
      title: 'new',
      completed: true,
    };

    service.updateTodo(updatedTodo);

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTodo);

    expect(service.todoSignal()[0]).toEqual(updatedTodo);
  });

  test('should delete the delted todo and update the signal', () => {
    const initalTodo = [
      {
        id: 1,
        title: 'old',
        completed: false,
      },
    ];
    service.todoSignal.set(initalTodo);
    service.deleteTodo(initalTodo[0]);

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
    expect(service.todoSignal().length).toBe(0);
  });
});
