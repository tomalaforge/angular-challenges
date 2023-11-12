import { HttpClient } from '@angular/common/http';
import { TodoService } from './todo.service';
import { TodoHttpService } from '../../infrastructure/adapteur/http/todo-http.service';
import { TodoApplication } from '../application/todo.application';
import { TodoStore } from '../../infrastructure/+state/todo.store';

export const providers = [
  {
    provide: TodoService,
    useFactory: (httpClient: HttpClient) => new TodoHttpService(httpClient),
    deps: [HttpClient],
  },
  {
    provide: TodoStore,
    useFactory: (todoService: TodoService) => new TodoStore(todoService),
    deps: [TodoService],
  },
  {
    provide: TodoApplication,
    useFactory: () => new TodoApplication(),
    deps: [TodoStore],
  },
];
