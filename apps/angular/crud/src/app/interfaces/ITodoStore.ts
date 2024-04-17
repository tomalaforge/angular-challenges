import { ITodo } from './ITodo';

export interface ITodoStore {
  list: ITodo[];
  errorMessage: string;
  ITodo: ITodo;
}
