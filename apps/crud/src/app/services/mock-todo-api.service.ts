import { TodoItem } from '../models/todo.model';
import { Observable, of, delay } from 'rxjs';
import { randText } from '@ngneat/falso';

export class MockTodoApiService {
  constructor(private _data: TodoItem[]) {}

  update(todo: TodoItem): Observable<TodoItem> {
    const mockItem: TodoItem = {
      ...todo,
      title: randText(),
    };
    return this.returnWithDelay(mockItem);
  }

  deleteTodo(todoId: number) {
    return this.returnWithDelay({ id: todoId });
  }

  getTodos() {
    return this.returnWithDelay(this._data);
  }

  returnWithDelay<T>(value: T): Observable<T> {
    return of(value);
  }
}
