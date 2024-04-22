import { Todo } from '../../interfaces/todo.interface';

export interface TodoUpdateArgs {
  payload: Todo;
}

export interface TodoDeleteArgs {
  payload: number;
}
