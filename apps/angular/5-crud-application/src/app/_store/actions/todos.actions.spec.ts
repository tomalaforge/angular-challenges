import { Todo } from '../../_interfaces/todo.interface';
import {
  deleteTodoActions,
  loadTodosActions,
  updateTodoActions,
} from '../actions';
describe('Todos Actions', () => {
  describe('loadTodosActions', () => {
    it('should create a load action', () => {
      const action = loadTodosActions.load();
      expect(action).toEqual({ type: '[Todos/Load] Load' });
    });

    it('should create a success action', () => {
      const todos: Todo[] = [
        { userId: 1, id: 1, title: 'Test Todo', completed: false },
      ];
      const action = loadTodosActions.success({ todos });
      expect(action).toEqual({
        type: '[Todos/Load] Success',
        todos: [{ userId: 1, id: 1, title: 'Test Todo', completed: false }],
      });
    });

    it('should create a failure action', () => {
      const error = 'Error loading todos';
      const action = loadTodosActions.failure({ error });
      expect(action).toEqual({
        type: '[Todos/Load] Failure',
        error: 'Error loading todos',
      });
    });
  });

  describe('updateTodoActions', () => {
    it('should create an update action', () => {
      const update = { id: 1, changes: { title: 'Updated Todo' } };
      const action = updateTodoActions.update({ update });
      expect(action).toEqual({
        type: '[Todos/Update] Update',
        update: { id: 1, changes: { title: 'Updated Todo' } },
      });
    });

    it('should create a success action', () => {
      const update = { id: 1, changes: { title: 'Updated Todo' } };
      const action = updateTodoActions.success({ update });
      expect(action).toEqual({
        type: '[Todos/Update] Success',
        update: { id: 1, changes: { title: 'Updated Todo' } },
      });
    });

    it('should create a failure action', () => {
      const error = 'Error updating todo';
      const action = updateTodoActions.failure({ error });
      expect(action).toEqual({
        type: '[Todos/Update] Failure',
        error: 'Error updating todo',
      });
    });
  });

  describe('deleteTodoActions', () => {
    it('should create a delete action', () => {
      const todo: Todo = {
        userId: 1,
        id: 1,
        title: 'Test Todo',
        completed: false,
      };
      const action = deleteTodoActions.delete({ todo });
      expect(action).toEqual({
        type: '[Todos/Delete] Delete',
        todo: { userId: 1, id: 1, title: 'Test Todo', completed: false },
      });
    });

    it('should create a success action', () => {
      const todo: Todo = {
        userId: 1,
        id: 1,
        title: 'Test Todo',
        completed: false,
      };
      const action = deleteTodoActions.success({ todo });
      expect(action).toEqual({
        type: '[Todos/Delete] Success',
        todo: { userId: 1, id: 1, title: 'Test Todo', completed: false },
      });
    });

    it('should create a failure action', () => {
      const error = 'Error deleting todo';
      const action = deleteTodoActions.failure({ error });
      expect(action).toEqual({
        type: '[Todos/Delete] Failure',
        error: 'Error deleting todo',
      });
    });
  });
});
