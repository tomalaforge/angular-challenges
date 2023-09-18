import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TodosService } from './todos.service';
import { Todo } from '../models/interface.todo';

describe('TodosService', () => {
  let service: TodosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService],
    });
    service = TestBed.inject(TodosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize todoList$', () => {
    const mockResponse = [
      {
        id: 1,
        title: 'title',
        body: 'desc',
        userId: 1,
      },
    ];

    service.initTodos();

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    service.todoList$.subscribe((response: Todo[]) => {
      expect(response).toEqual(mockResponse);
    });
  });
});
