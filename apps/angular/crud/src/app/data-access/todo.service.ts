import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ITodo } from '../models/todo.model';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private _http = inject(HttpClient);
  private _todos$$ = new BehaviorSubject<ITodo[]>([]);

  loadingService = inject(LoadingService);

  destroyRef$ = new Subject();
  todos$ = this._todos$$.asObservable();

  httpUrl: string = 'https://jsonplaceholder.typicode.com/todos';

  get() {
    this.loadingService.startLoading();
    return this._http.get<ITodo[]>(this.httpUrl).subscribe((todos) => {
      this._todos$$.next(todos);
      this.loadingService.stopLoading();
    });
  }

  update(updatedTodo: ITodo) {
    return this._http
      .put<ITodo>(
        `${this.httpUrl}/${updatedTodo.id}`,
        JSON.stringify(updatedTodo),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
      .subscribe();
  }

  delete(todo: ITodo) {
    return this._http.delete(`${this.httpUrl}/${todo.id}`).subscribe();
  }
}
