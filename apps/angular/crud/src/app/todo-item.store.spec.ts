import { TestBed } from '@angular/core/testing';
import { patchState } from '@ngrx/signals';
import { createSpyFromClass } from 'jest-auto-spies';
import { TodoItemStore } from './todo-item.store';
import { TodoService } from './todo.service';
import { TodoStore } from './todo.store';
import { setError, setLoaded, setLoading } from './util/call-state.feature';

describe('TodoItemStore', () => {
  function setup() {
    const mockService = createSpyFromClass(TodoService);
    const todoStore = createSpyFromClass(TodoStore, {
      methodsToSpyOn: ['update', 'delete'],
    });

    TestBed.configureTestingModule({
      providers: [
        TodoItemStore,
        {
          provide: TodoService,
          useValue: mockService,
        },
        {
          provide: TodoStore,
          useValue: todoStore,
        },
      ],
    });
    const todoItemStore = TestBed.inject(TodoItemStore);

    return {
      todoItemStore,
      todoStore,
      mockService,
    };
  }

  describe('update', () => {
    it('updates a todo', () => {
      // Arrange
      const { mockService, todoItemStore, todoStore } = setup();
      const todo = {
        id: 1,
        title: 'Original Todo',
        completed: true,
        userId: 1,
      };
      const updatedTodo = { ...todo, title: 'Updated Todo' };
      mockService.update.nextWith(updatedTodo);

      // Act
      todoItemStore.update(todo);

      // Assert
      expect(mockService.update).toHaveBeenCalledWith(todo);
      expect(todoStore.update).toHaveBeenCalledWith(updatedTodo);
      expect(todoItemStore.callState()).toEqual('loaded');
    });

    it('handles an error from the service', () => {
      // Arrange
      const { mockService, todoItemStore, todoStore } = setup();
      const todo = {
        id: 1,
        title: 'Original Todo',
        completed: true,
        userId: 1,
      };
      mockService.update.nextWithValues([
        {
          errorValue: 'oops',
        },
      ]);

      // Act
      todoItemStore.update(todo);

      // Assert
      expect(mockService.update).toHaveBeenCalledWith(todo);
      expect(todoStore.update).not.toHaveBeenCalled();
      expect(todoItemStore.callState()).toEqual({ error: 'oops' });
    });
  });

  describe('delete', () => {
    it('deletes a todo', () => {
      // Arrange
      const { mockService, todoItemStore, todoStore } = setup();
      const todo = {
        id: 1,
        title: 'Original Todo',
        completed: true,
        userId: 1,
      };
      mockService.delete.nextWith();

      // Act
      todoItemStore.delete(todo);

      // Assert
      expect(mockService.delete).toHaveBeenCalledWith(todo);
      expect(todoStore.delete).toHaveBeenCalledWith(todo);
      expect(todoItemStore.callState()).toEqual('loaded');
    });

    it('handles an error from the service', () => {
      // Arrange
      const { mockService, todoItemStore, todoStore } = setup();
      const todo = {
        id: 1,
        title: 'Original Todo',
        completed: true,
        userId: 1,
      };
      mockService.delete.nextWithValues([
        {
          errorValue: 'oops',
        },
      ]);

      // Act
      todoItemStore.delete(todo);

      // Assert
      expect(mockService.delete).toHaveBeenCalledWith(todo);
      expect(todoStore.delete).not.toHaveBeenCalled();
      expect(todoItemStore.callState()).toEqual({ error: 'oops' });
    });
  });

  describe('onHold', () => {
    it('handles init', () => {
      // Arrange
      const { todoItemStore } = setup();

      // Act

      // Assert
      expect(todoItemStore.onHold()).toEqual(false);
    });

    it('handles loading', () => {
      // Arrange
      const { todoItemStore } = setup();

      // Act
      patchState(todoItemStore, setLoading());

      // Assert
      expect(todoItemStore.onHold()).toEqual(true);
    });

    it('handles loaded', () => {
      // Arrange
      const { todoItemStore } = setup();

      // Act
      patchState(todoItemStore, setLoaded());

      // Assert
      expect(todoItemStore.onHold()).toEqual(false);
    });

    it('handles error', () => {
      // Arrange
      const { todoItemStore } = setup();

      // Act
      patchState(todoItemStore, setError('oops'));

      // Assert
      expect(todoItemStore.onHold()).toEqual(true);
    });
  });
});
