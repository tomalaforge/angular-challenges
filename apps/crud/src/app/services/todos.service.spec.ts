import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TodosService } from './todos.service';
import { Todo } from '../models/interface.todo';

describe('TodosService', () => {
  let service: TodosService;
  let httpController: HttpTestingController;

  let url = 'https://jsonplaceholder.typicode.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService],
    });
    service = TestBed.inject(TodosService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call initTodos and return an array of Todos', () => {
    const mockResponse = [
      {
        id: 1,
        title: 'title',
        body: 'desc',
        userId: 1,
      },
    ];

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/todos`,
    });

    req.flush(mockResponse);
  });
});
