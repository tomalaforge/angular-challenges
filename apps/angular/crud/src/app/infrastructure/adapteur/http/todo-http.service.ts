import { TodoService } from '../../../core/port/todo.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { randText } from '@ngneat/falso';
import { TodoDto } from '../../dto/todo.dto';

export class TodoHttpService extends TodoService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  getAll(): Observable<TodoDto[]> {
    return this.httpClient.get<any[]>(
      'https://jsonplaceholder.typicode.com/todos'
    );
  }

  update(todo: TodoDto): Observable<TodoDto> {
    return this.httpClient.put<any>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        body: todo.body,
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
  }
}
