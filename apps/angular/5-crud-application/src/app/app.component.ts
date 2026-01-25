import { Component, inject, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { todo } from './app.model';
import { ServiceApp } from './app.service';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
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
}
