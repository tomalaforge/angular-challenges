import { TestBed } from '@angular/core/testing';
import { randText } from '@ngneat/falso';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { of } from 'rxjs';
import { TodoHttpService } from '../http/todo-http.service';
import { TodoItem } from '../models/todo';
import { AppStore } from './app.store';

describe('App Store', () => {
  let store: AppStore;
  const todoItems: TodoItem[] = [
    { id: 1, userId: 1, title: 't1', body: 'b1' },
    { id: 2, userId: 2, title: 't2', body: 'b2' },
  ];
  const todoHttpService = createMockWithValues(TodoHttpService, {
    getTodoList: jest.fn(),
    updateTodoItem: jest.fn(),
    deleteTodoItem: jest.fn(),
  });
  todoHttpService.getTodoList.mockReturnValue(of(todoItems));
  todoHttpService.updateTodoItem.mockImplementation((item: TodoItem) => {
    return of({ ...item, title: randText() });
  });
  todoHttpService.deleteTodoItem.mockReturnValue(of());

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppStore,
        { provide: TodoHttpService, useValue: todoHttpService },
      ],
    });
    store = TestBed.inject(AppStore);
  });

  it('should be created and have initial state', async () => {
    expect(store).toBeTruthy();
    expect(store.state().isAppProcessing).toBe(false); // FIXME this will failed
    expect(store.state().todos).toEqual([]);
    expect(store.state().processingTodos).toEqual(new Set());
  });

  it('should set todos state after fetching', () => {
    store.getTodoItems();
    expect(store.state().todos).toEqual(todoItems);
  });

  it('should update todo item', () => {
    const prevTitle = todoItems[0].title;
    store.getTodoItems();
    store.updateTodoItem(todoItems[0]);
    expect(store.state().todos[0].title).not.toBe(prevTitle);
  });

  it('should delete todo item', () => {
    const prevLength = todoItems.length;
    store.getTodoItems();
    store.deleteTodoItem(todoItems[0].id);
    expect(prevLength - store.state().todos.length).toBe(1); // FIXME this will failed
  });
});
