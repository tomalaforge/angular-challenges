import { TestBed } from '@angular/core/testing';
import { Todo } from './todo.models';
import { TodoStore } from './todo.store';

describe('TodoStore', () => {
  const mockTodos: Todo[] = [
    {
      id: 1,
      userId: 1,
      title: 'Test Todo 1',
      body: 'First todo body content',
    },
    {
      id: 2,
      userId: 1,
      title: 'Test Todo 2',
      body: 'Second todo body content',
    },
    {
      id: 3,
      userId: 2,
      title: 'Test Todo 3',
      body: 'Third todo body content',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoStore],
    });
  });

  it('should be created', () => {
    const store = TestBed.inject(TodoStore);
    expect(store).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have empty todos array', () => {
      const store = TestBed.inject(TodoStore);
      const todos = store.todos();
      expect(todos).toEqual([]);
    });
  });

  describe('setTodos', () => {
    it('should set todos array', () => {
      const store = TestBed.inject(TodoStore);
      store.setTodos(mockTodos);
      const todos = store.todos();
      expect(todos).toEqual(mockTodos);
    });

    it('should replace existing todos', () => {
      const store = TestBed.inject(TodoStore);
      store.setTodos(mockTodos);

      const newTodos: Todo[] = [
        {
          id: 4,
          userId: 2,
          title: 'New Todo',
          body: 'New todo body content',
        },
      ];
      store.setTodos(newTodos);

      const todos = store.todos();
      expect(todos).toEqual(newTodos);
    });
  });

  describe('updateTodo', () => {
    beforeEach(() => {
      const store = TestBed.inject(TodoStore);
      store.setTodos(mockTodos);
    });

    it('should update existing todo', () => {
      const store = TestBed.inject(TodoStore);
      const updatedTodo: Todo = {
        ...mockTodos[0],
        title: 'Updated Todo Title',
        body: 'Updated todo body content',
      };

      store.updateTodo(updatedTodo);

      const todos = store.todos();
      expect(todos.find((t) => t.id === updatedTodo.id)).toEqual(updatedTodo);
      expect(todos.length).toBe(mockTodos.length);
    });

    it('should not modify state if todo id does not exist', () => {
      const store = TestBed.inject(TodoStore);
      const nonExistentTodo: Todo = {
        id: 999,
        userId: 1,
        title: 'Non-existent',
        body: 'This todo should not be added',
      };
      store.updateTodo(nonExistentTodo);

      const todos = store.todos();
      expect(todos).toEqual(mockTodos);
    });
  });

  describe('deleteTodo', () => {
    beforeEach(() => {
      const store = TestBed.inject(TodoStore);
      store.setTodos(mockTodos);
    });

    it('should remove todo by id', () => {
      const idToDelete = mockTodos[0].id;
      const store = TestBed.inject(TodoStore);
      store.deleteTodo(idToDelete);

      const todos = store.todos();
      expect(todos.length).toBe(mockTodos.length - 1);
      expect(todos.find((t) => t.id === idToDelete)).toBeUndefined();
    });

    it('should not modify state if todo id does not exist', () => {
      const store = TestBed.inject(TodoStore);
      const nonExistentId = 999;
      store.deleteTodo(nonExistentId);

      const todos = store.todos();
      expect(todos).toEqual(mockTodos);
    });

    it('should maintain order of remaining todos', () => {
      const store = TestBed.inject(TodoStore);
      const middleId = mockTodos[1].id;
      store.deleteTodo(middleId);

      const expectedTodos = [mockTodos[0], mockTodos[2]];
      const todos = store.todos();
      expect(todos).toEqual(expectedTodos);
    });
  });
});
