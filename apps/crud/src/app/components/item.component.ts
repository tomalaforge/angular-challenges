import { Component, Input } from '@angular/core';
import { Todo } from '../models/interface.todo';
import { TodosService } from '../services/todos.service';
import { TodosStore } from '../store/todos.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-item',
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `<div>
      <p>{{ todo.title }}</p>
      <button (click)="update(todo)" [disabled]="todo.id === processingItemId">
        Update
      </button>
      <button (click)="delete(todo)" [disabled]="todo.id === processingItemId">
        Delete
      </button>
    </div>
    <div *ngIf="loadingText">
      <p>{{ loadingText }}</p>
      <mat-spinner></mat-spinner>
    </div> `,
  styles: [],
  providers: [],
})
export class ItemComponent {
  @Input() todo!: Todo;
  @Input() processingItemId: number | null = null;
  loadingText = '';

  constructor(
    private todosService: TodosService,
    private todosStore: TodosStore
  ) {}

  update(todo: Todo) {
    const updatedTodo = this.todosService.updateTodo(todo);
    this.loadingText = 'Updating...';
    this.todosStore.startProcessing(todo.id);
    this.todosStore.updateTodoInList(updatedTodo);
  }

  delete(todo: Todo) {
    this.loadingText = 'Deleting...';
    this.todosStore.startProcessing(todo.id);
    this.todosService.deleteTodo(todo);
    this.todosStore.removeTodoFromList(todo.id);
  }
}
