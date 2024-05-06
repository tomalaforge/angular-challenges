import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let todosService: TodosService;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    todosService = TestBed.inject(TodosService);
    httpClient = TestBed.inject(HttpClient);
  });
  it('test service has been created', () => {
    expect(todosService).toBeTruthy();
  });
  it('Test that it calls the api to get the todos', () => {
    const getRequestSpy = jest.spyOn(httpClient, 'get');
    todosService.getTodos();
    expect(getRequestSpy).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos',
    );
  });
  it('should call the api to update a todo', () => {
    const patchRequestSpy = jest.spyOn(httpClient, 'put');
    const todoMock = {
      id: 1,
      title: 'text',
      body: 'body',
      userId: 1,
    };
    todosService.updateTodo(todoMock);
    expect(patchRequestSpy).toHaveBeenCalled();
  });
  it('should call the api to delete a todo', () => {
    const deleteRequestSpy = jest.spyOn(httpClient, 'delete');
    const todoMock = {
      id: 1,
      title: 'text',
      body: 'body',
      userId: 1,
    };
    todosService.deleteTodo(todoMock);
    expect(deleteRequestSpy).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/' + todoMock.id,
    );
  });
});
