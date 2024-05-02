import { TestBed } from '@angular/core/testing';
import { createSpyFromClass } from 'jest-auto-spies';
import { TodoService } from './todo.service';
import { TodoStore } from './todo.store';
import { Todo } from './types';

const MOCK_TODOS: Todo[] = [
  {
    id: 1,
    title: 'Todo 1',
    completed: false,
    userId: 1,
  },
  {
    id: 2,
    title: 'Todo 2',
    completed: true,
    userId: 2,
  },
];

describe('TodoStore', () => {
  function setup() {
    const mockService = createSpyFromClass(TodoService, {
      observablePropsToSpyOn: ['todos'],
    });
    mockService.todos.nextWith(MOCK_TODOS);

    TestBed.configureTestingModule({
      providers: [
        TodoStore,
        {
          provide: TodoService,
          useValue: mockService,
        },
      ],
    });
    const todoStore = TestBed.inject(TodoStore);

    return {
      todoStore,
      mockService,
    };
  }

  describe('init lifecycle', () => {
    it('loads the mock values', () => {
      // Arrange

      // Act
      const { todoStore } = setup();

      // Assert
      expect(todoStore.entities()).toEqual(MOCK_TODOS);
      expect(todoStore.callState()).toEqual('loaded');
    });
  });

  describe('load', () => {
    it('handles an error from the service', () => {
      // Arrange
      const { todoStore, mockService } = setup();
      mockService.todos.nextWithValues([
        {
          errorValue: 'oops',
        },
      ]);

      // Act
      todoStore.load();

      // Assert
      expect(todoStore.entities()).toEqual(MOCK_TODOS);
      expect(todoStore.callState()).toEqual({ error: 'oops' });
    });
  });

  describe('update', () => {
    it('updates a todo', () => {
      // Arrange
      const { todoStore } = setup();
      const updatedTodo = {
        id: 1,
        title: 'Updated Todo',
        completed: true,
        userId: 1,
      };

      // Act
      todoStore.update(updatedTodo);

      // Assert
      expect(todoStore.entities()).toEqual([updatedTodo, MOCK_TODOS[1]]);
    });
  });

  describe('delete', () => {
    it('deletes a todo', () => {
      // Arrange
      const { todoStore } = setup();
      const todoToDelete = MOCK_TODOS[0];

      // Act
      todoStore.delete(todoToDelete);

      // Assert
      expect(todoStore.entities()).toEqual([MOCK_TODOS[1]]);
    });
  });
});
