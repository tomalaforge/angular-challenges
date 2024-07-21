import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../todo';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable();

  addAll(todos: Todo[]) {
    this.todos.next(todos);
  }

  updateOne(todo: Todo) {
    this.todos.next(this.todos.value.map((t) => (t.id === todo.id ? todo : t)));
  }

  deleteOne(id: number) {
    this.todos.next(this.todos.value.filter((t) => t.id !== id));
  }
}
