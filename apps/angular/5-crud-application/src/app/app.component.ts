import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoStore } from './data/todo.store';
import { Todo } from './todo';
import { TodosService } from './todos.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos: Signal<Todo[]>;

  constructor(
    private service: TodosService,
    private store: TodoStore,
  ) {
    this.todos = toSignal(store.todos$, { initialValue: [] });
  }

  ngOnInit(): void {
    this.service.getTodos().subscribe((t) => this.store.addAll(t));
  }

  update(todo: Todo) {
    this.service.updateTodo(todo).subscribe((t) => this.store.updateOne(t));
  }
}
