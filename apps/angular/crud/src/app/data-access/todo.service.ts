import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { randText } from '@ngneat/falso';
import { ITodo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })


export class TodoService {

  private _http = inject(HttpClient);
  private _todos$$ = new BehaviorSubject<ITodo[]>([]);

  destroyRef$ = new Subject();
  httpUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todos$ = this._todos$$.asObservable();

  get() {
    return this._http.get<ITodo[]>(this.httpUrl)
      .subscribe(todos => {
        this._todos$$.next(todos);
      });
  }

  update(todo: ITodo) {
    this._http
      .put<ITodo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
      .subscribe((todoUpdated: ITodo) => {
        const todos = this._todos$$.value;
        this._todos$$.next(todos.map(t => t.id === todoUpdated.id? todoUpdated : t));
      });
  }



}