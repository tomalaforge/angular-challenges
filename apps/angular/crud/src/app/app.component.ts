import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TodoStore } from './data-access/todo.store';
import { Todo } from './model/todo.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent {
  todoStore = inject(TodoStore);
  todos = this.todoStore.todos;

  update(todo: Todo) {
    this.todoStore.update(todo);
  }
}
