import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoItem } from '../models/todo';
import { AppStore } from '../stores/app.store';
import { TodoItemComponent } from './todo-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TodoItemComponent],
  selector: 'app-root',
  template: `
    <div *ngIf="isAppProcessing$ | async" class="indicator">
      <mat-spinner></mat-spinner>
    </div>
    @for (todo of todos$ | async; track todo.id) {
      <app-todo-item
        [title]="todo.title"
        [isProcessing]="isTodoItemProcessing(todo.id)"
        (update)="update(todo)"
        (delete)="delete(todo.id)"></app-todo-item>
    }
  `,
  styles: [
    `
      .indicator {
        position: absolute;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        background: rgba(100, 100, 100, 0.5);
      }
    `,
  ],
  host: {
    styles: 'position: relative',
  },
  providers: [AppStore],
})
export class AppComponent implements OnInit {
  constructor(private readonly appStore: AppStore) {}

  todos$ = this.appStore.todos$;
  isAppProcessing$ = this.appStore.isAppProcessing$;

  ngOnInit(): void {
    this.appStore.getTodoItems();
  }

  update(todo: TodoItem) {
    this.appStore.updateTodoItem(todo);
  }

  delete(id: number) {
    this.appStore.deleteTodoItem(id);
  }

  isTodoItemProcessing(id: number): boolean {
    return this.appStore.isTodoItemProcessing(id);
  }
}
