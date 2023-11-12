import { Todo } from '../entity/todo.interface';
import { Observable } from 'rxjs';

export abstract class TodoService {
  abstract getAll(): Observable<Todo[]>;
  abstract update(todo: Todo): Observable<Todo>;
}
