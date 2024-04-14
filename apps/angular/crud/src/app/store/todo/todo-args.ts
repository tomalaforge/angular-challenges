import { Todo } from '../../interfaces/todo.interface';
import { OperationType } from '../enums/actions.enum';

export interface TodoUpdateArgs {
  type: OperationType.UPDATE;
  payload: Todo;
}

export interface TodoDeleteArgs {
  type: OperationType.DELETE;
  payload: number;
}

export interface TodoGethArgs {
  type: OperationType.GET;
}

// Define a union type combining both interfaces
export type TodoStateArgs = TodoDeleteArgs | TodoUpdateArgs | TodoGethArgs;
