import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { ITodo } from './app.interface';
import { TodosHttpService } from './http.service';
import { TodoStore } from './todo.store';

const firstTodo: ITodo = {
  id: 1,
  userId: 1,
  title: 'First todo',
  completed: false,
};

const secondTodo: ITodo = {
  id: 2,
  userId: 1,
  title: 'Second todo',
  completed: true,
};

describe('TodoStore', () => {
  let store: TodoStore;
  let httpService: {
    getAll: jest.Mock<Observable<ITodo[]>, []>;
    update: jest.Mock<Observable<ITodo>, [ITodo]>;
    delete: jest.Mock<Observable<object>, [number]>;
  };

  beforeEach(() => {
    httpService = {
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        TodoStore,
        { provide: TodosHttpService, useValue: httpService },
      ],
    });

    store = TestBed.inject(TodoStore);
  });

  it('loads todos and clears the loading state', () => {
    httpService.getAll.mockReturnValue(of([firstTodo, secondTodo]));

    store.getAll();

    expect(httpService.getAll).toHaveBeenCalledTimes(1);
    expect(store.todos()).toEqual([firstTodo, secondTodo]);
    expect(store.isLoading()).toBe(false);
  });

  it('updates the matching todo and keeps the other todos', () => {
    const updatedTodo = { ...firstTodo, title: 'Updated todo' };
    store.todos.set([firstTodo, secondTodo]);
    httpService.update.mockReturnValue(of(updatedTodo));

    store.updateTodo(firstTodo);

    expect(httpService.update).toHaveBeenCalledWith(firstTodo);
    expect(store.todos()).toEqual([updatedTodo, secondTodo]);
    expect(store.isLoading()).toBe(false);
  });

  it('deletes a todo and keeps the remaining todos', () => {
    store.todos.set([firstTodo, secondTodo]);
    httpService.delete.mockReturnValue(of({}));

    store.deleteOne(firstTodo.id);

    expect(httpService.delete).toHaveBeenCalledWith(firstTodo.id);
    expect(store.todos()).toEqual([secondTodo]);
    expect(store.isLoading()).toBe(false);
  });

  it('logs an error when loading todos fails', () => {
    const error = new Error('Request failed');
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    httpService.getAll.mockReturnValue(throwError(() => error));

    store.getAll();

    expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred: ', error);
    consoleErrorSpy.mockRestore();
  });
});
