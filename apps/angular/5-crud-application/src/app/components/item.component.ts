import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TODO } from '../models/todo.model';
import { todoItemStore } from '../todo-item.store';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatCardModule,
    MatButton,
    MatProgressSpinnerModule,
    MatCheckboxModule,
  ],
  template: `
    @if (todoItemStore.todos().get(todo().id)?.isUpdating) {
      <mat-spinner [diameter]="20" color="blue"></mat-spinner>
    }
    <mat-card>
      <mat-card-title>
        {{ todo().title }}
        <span style="margin-left: 1rem;margin-right: 0.1rem;">Completed:</span>
        <mat-checkbox
          (change)="onComplete($event, todo())"
          [checked]="todo().completed"
          class="example-margin">
          {{ todo().completed }}
        </mat-checkbox>
      </mat-card-title>
      <mat-card-actions>
        <button
          mat-raised-button
          [disabled]="todoItemStore.todos().get(todo().id)?.isUpdating"
          (click)="update(todo())">
          Update
        </button>
        <button
          mat-raised-button
          color="warn"
          [disabled]="todoItemStore.todos().get(todo().id)?.isUpdating"
          (click)="delete(todo())">
          Delete
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {
  todo = input.required<TODO>();
  todoItemStore = inject(todoItemStore);
  update(todo: TODO) {
    this.todoItemStore.updateTodo(todo);
  }

  delete(todo: TODO): void {
    this.todoItemStore.deleteTodo(todo);
  }

  ngOnInit(): void {
    this.todoItemStore.getTodos();
  }

  onComplete(data: MatCheckboxChange, todo: TODO): void {
    this.todoItemStore.updateComplete(data.checked, todo);
  }
}
