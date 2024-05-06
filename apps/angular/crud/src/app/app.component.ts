import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoStore } from './data-access/todos.store';
import { Todo } from './model/todo.model';
import { TodoListItemComponent } from './todo-list-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, TodoListItemComponent, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (loading()) {
      <mat-spinner [diameter]="32"></mat-spinner>
    } @else {
      @for (todo of todos(); track todo.id) {
        <div>
          <app-todo-list-item
            [todo]="todo"
            [isSaving]="savingTodos().includes(todo.id)"
            (updateTodoEvent)="update($event)"
            (deleteTodoEvent)="delete($event)"></app-todo-list-item>
        </div>
      } @empty {
        There are no Todo's.
      }
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  readonly store = inject(TodoStore);
  readonly loading = this.store.loadingApp;
  readonly todos = this.store.todos;
  readonly savingTodos = this.store.savingTodos;

  ngOnInit(): void {
    this.store.loadAll();
  }

  update(todo: Todo) {
    this.store.update(todo.id);
  }

  delete(todo: Todo) {
    this.store.delete(todo.id);
  }
}
