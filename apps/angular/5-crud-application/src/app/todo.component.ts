import { Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';
import { todo } from './todo.model';
import { ServiceApp } from './todo.service';

@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'app-todo',
  template: `
    @if (isLoading()) {
      <mat-spinner></mat-spinner>
    } @else {
      @for (todo of todos(); track todo.id) {
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      }
    }
  `,
  styles: [],
})
export class TodoComponent implements OnInit {
  dataStore = inject(ServiceApp);
  todos = signal<todo[]>([]);
  isLoading = signal(true);

  async ngOnInit() {
    const todos = await firstValueFrom(this.dataStore.getTodos());
    this.todos.set(todos);
    this.isLoading.set(false);
  }

  update(todo: todo) {
    this.isLoading.set(true);
    this.dataStore.updateTodo(todo).subscribe((todoUpdated: todo) => {
      this.todos.update((todos) =>
        todos.map((t) => (t.id === todoUpdated.id ? todoUpdated : t)),
      );
      this.isLoading.set(false);
    });
  }

  delete(todo: todo) {
    this.isLoading.set(true);
    this.dataStore.deleteTodo(todo).subscribe(() => {
      this.todos.update((todos) => todos.filter((t) => t.id !== todo.id));
      this.isLoading.set(false);
    });
  }
}
