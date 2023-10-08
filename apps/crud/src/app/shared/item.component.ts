import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoConfig } from '../core/Interface/todo';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, of } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-item',
  template: `
    <!-- <ng-template #showData> -->
    <div class="show-view">
      <div
        class="spinner"
        *ngIf="isShowSpinner && this.updatedId; else showView">
        <mat-spinner></mat-spinner>
      </div>
      <ng-template #showView>
        <div class="content-data">
          <div class="title-view">
            {{ todo?.title }}
          </div>
          <div class="button-view">
            <button class="update" (click)="update(todo)">Update</button>
            <button class="delete" (click)="delete(todo?.id)">Delete</button>
          </div>
        </div>
      </ng-template>
    </div>
    <!-- </ng-template> -->
  `,
  styles: [
    `
      .title-view {
        text-align: center;
        font-size: 20px;
      }
      .button-view {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      button {
        width: 80px;
        height: 30px;
        background-color: green;
        color: white;
        font-size: 20px;
        margin: 5px 10px;
      }
      .spinner {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
})
export class ItemComponent {
  todo: TodoConfig | undefined = undefined;
  isShowSpinner: Observable<boolean> = of(false);
  updatedId: number | undefined = undefined;
  @Input() set config(todo: TodoConfig) {
    this.todo = todo;
  }
  @Input() set spinnerState(spinner: Observable<boolean>) {
    this.isShowSpinner = spinner;
  }
  @Output() updateTodo = new EventEmitter<TodoConfig>();
  @Output() deleteTodo = new EventEmitter<number>();
  update(todo: TodoConfig | undefined) {
    this.updatedId = this.todo?.id;
    this.updateTodo.emit(todo);
  }
  delete(id: number | undefined) {
    this.updatedId = this.todo?.id;
    this.deleteTodo.emit(id);
  }
}
