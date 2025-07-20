import { Observable } from 'rxjs';
import { ITodo } from '../interfaces/todo.interface';

export abstract class Todo {
  abstract getAll(): Observable<ITodo[]>;
  abstract updateTodo(todo: ITodo): Observable<ITodo>;
  abstract deleteTodo(id: number): Observable<object>;
}
