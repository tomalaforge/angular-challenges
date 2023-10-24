import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { randText } from '@ngneat/falso';
import { ITodo } from '../models/todo.model';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })


export class TodoService {

  private _http = inject(HttpClient);
  loadingService = inject(LoadingService)
  private _todos$$ = new BehaviorSubject<ITodo[]>([]);

  destroyRef$ = new Subject();
  httpUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todos$ = this._todos$$.asObservable();

  get() {
    this.loadingService.startLoading()
    return this._http.get<ITodo[]>(this.httpUrl)
      .subscribe(todos => {
        this._todos$$.next(todos);
        this.loadingService.stopLoading();
      });
  }

  update(todo: ITodo) {
    this.loadingService.startLoading()
    this._http
      .put<ITodo>(
        `${this.httpUrl}/${todo.id}`,
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
        this.loadingService.stopLoading()
      });
  }

  delete(todo:ITodo){
    this.loadingService.startLoading()
    this._http.delete(`${this.httpUrl}/${todo.id}`).subscribe(res =>{
      const todos = this._todos$$.value;
      this._todos$$.next(todos.filter(t => t.id!== todo.id));
      this.loadingService.stopLoading();
    })
  }



}