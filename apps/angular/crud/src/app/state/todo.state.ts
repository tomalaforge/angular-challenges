import { Todo } from '../model/todo.interface';

export interface TodoState {
  todoList: ReadonlyArray<Todo>;
}
