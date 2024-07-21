import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoStore } from './data/todo.store';
import { Todo } from './todo';
import { TodosService } from './todos.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <ul [class.loading]="loading()">
      <li *ngFor="let todo of todos()">
        {{ todo.title }}
        <button (click)="update(todo)" [disabled]="loading()">Update</button>
        <button (click)="delete(todo.id)" [disabled]="loading()">Delete</button>
      </li>
    </ul>
  `,
  styles: `
    .loading {
      color: #a6a6a6;
    }
  `,
})
export class AppComponent implements OnInit {
  todos: Signal<Todo[]>;
  loading = signal(false);
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
    this.loading.set(true);
    this.service.updateTodo(todo).subscribe((t) => {
      this.store.updateOne(t);
      this.loading.set(false);
    });
  }
  delete(id: number) {
    this.loading.set(true);
    this.service.deleteTodo(id).subscribe(() => {
      this.store.deleteOne(id);
      this.loading.set(false);
    });
  }
}
