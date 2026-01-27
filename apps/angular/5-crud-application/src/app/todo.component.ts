import { Component, inject, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { todo } from './todo.model';
import { ServiceApp } from './todo.service';

@Component({
  imports: [],
  selector: 'app-todo',
  template: `
    @for (todo of todos(); track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    }
  `,
  styles: [],
})
export class TodoComponent implements OnInit {
  dataStore = inject(ServiceApp);
  todos = signal<todo[]>([]);

  async ngOnInit() {
    const todos = await firstValueFrom(this.dataStore.getTodos());
    this.todos.set(todos);
  }

  update(todo: todo) {
    this.dataStore.updateTodo(todo).subscribe((todoUpdated: todo) => {
      this.todos.update((todos) =>
        todos.map((t) => (t.id === todoUpdated.id ? todoUpdated : t)),
      );
    });
  }

  delete(todo: todo) {
    this.dataStore.deleteTodo(todo).subscribe(() => {
      this.todos.update((todos) => todos.filter((t) => t.id !== todo.id));
    });
  }
}
