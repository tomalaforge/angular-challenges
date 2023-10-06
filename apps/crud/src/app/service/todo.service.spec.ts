import { TodoService } from './todo.service';
import { of } from 'rxjs';

const MOCK_TODOS = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
  },
];

// https://www.youtube.com/watch?v=FJvk9YyXTLo

describe('TodoService', () => {
  let service: TodoService;
  let httpClientSpy: any = {
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => {
    service = new TodoService(httpClientSpy);
  });

  it('created', () => {
    expect(service).toBeTruthy();
  });

  it('getTodos', () => {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(MOCK_TODOS));
    service.getTodos();
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('updateTodo', () => {
    //const url = 'https://jsonplaceholder.typicode.com/todos/2';
    jest.spyOn(httpClientSpy, 'put').mockResolvedValue(
      of({
        id: 2,
        title: 'fsfsdfsdf',
      })
    );
    service.updateTodo(2);
    expect(httpClientSpy.put).toHaveBeenCalledTimes(1);
    // expect(httpClientSpy.put).toHaveBeenCalledWith(url);
    // you get the url back plus the headers config and mockResolvedValue - have to escape the json to match it?
  });

  it('deleteTodo', () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/3';
    jest.spyOn(httpClientSpy, 'delete').mockResolvedValue(undefined);
    service.deleteTodo(3);
    expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.delete).toHaveBeenCalledWith(url);
  });
});
