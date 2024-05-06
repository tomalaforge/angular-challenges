import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemComponent } from './components/item.component';
import { Todo } from './interfaces/todo.interface';
import { TodosStore } from './stores/todos.store';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ItemComponent],
  selector: 'app-root',
  template: `
    @if (isLoading()) {
      <div class="global-spinner">
        <h1>Loading...</h1>
        <mat-spinner></mat-spinner>
      </div>
    }
    @for (todo of todos(); track $index) {
      <app-item
        [todo]="todo"
        (updateTodo)="update($event)"
        (deleteTodo)="deleteTodo($event)"></app-item>
    }
  `,
  styles: `
    .global-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 30%;
      left: 50%;
    }
  `,
  providers: [TodosStore],
})
export class AppComponent implements OnInit {
  store = inject(TodosStore);

  todos = this.store.todos;
  isLoading = this.store.isLoading;

  ngOnInit(): void {
    this.store.loadAll();
  }

  update(todo: Todo) {
    this.store.updateTodo(todo);
  }

  deleteTodo(todo: Todo) {
    this.store.deleteTodo(todo);
  }
}
