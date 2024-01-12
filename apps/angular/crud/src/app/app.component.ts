import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TodoStore } from './data-access/todo.store';
import { Todo } from './model/todo.model';

@Component({
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  selector: 'app-root',
  template: `
    <app-spinner></app-spinner>
    @for (todo of todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo.id)">Delete</button>
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
  delete(id: number) {
    this.todoStore.delete(id);
  }
}
