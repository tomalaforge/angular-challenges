import { Injectable, computed, signal } from '@angular/core';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private _todos = signal<Todo[]>([]);
  todos = computed(this._todos);
}
