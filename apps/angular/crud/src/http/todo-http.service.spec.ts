import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { randText } from '@ngneat/falso';
import { firstValueFrom } from 'rxjs';
import { TodoItem } from '../models/todo';
import { TodoHttpService } from './todo-http.service';

describe('Todo Http Service', () => {
  let service: TodoHttpService;
  let httpTesting: HttpTestingController;

  const url = 'https://jsonplaceholder.typicode.com';
  const todoItems: TodoItem[] = [
    { id: 1, userId: 1, title: 't1', body: 'b1' },
    { id: 2, userId: 2, title: 't2', body: 'b2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: TodoHttpService }],
    });
    service = TestBed.inject(TodoHttpService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list', async () => {
    const res = firstValueFrom(service.getTodoList());
    const req = httpTesting.expectOne({ method: 'GET', url: `${url}/todos` });
    req.flush(todoItems);
    expect(await res).toBe(todoItems);
    httpTesting.verify();
  });

  it('should update item', async () => {
    const item = todoItems[0];
    const res = firstValueFrom(service.updateTodoItem(item));
    const req = httpTesting.expectOne({
      method: 'PUT',
      url: `${url}/todos/${item.id}`,
    });
    req.flush({ ...item, title: randText() });
    expect((await res).title).not.toEqual(item.title);
    httpTesting.verify();
  });

  it('should call delete req', () => {
    const item = todoItems[0];
    service.deleteTodoItem(item.id).subscribe();
    httpTesting.expectOne({ method: 'DELETE', url: `${url}/todos/${item.id}` });
    httpTesting.verify();
  });
});
