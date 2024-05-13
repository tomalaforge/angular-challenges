import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(TodoService);
    httpController = TestBed.inject(HttpTestingController);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should get todos', () => {
    service.getTodos().subscribe((todos) => {
      expect(todos).toBeTruthy();
    });
  });

  xtest('should return all todos with get method', () => {
    const req = httpController.expectOne(service.baseUrl);

    expect(req.request.method).toBe('GET');

    req.flush({});
  });
});
