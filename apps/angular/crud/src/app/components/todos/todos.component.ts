import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoService } from '../../data-access/todo.service';
import { LoadingService } from '../../data-access/loading.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TodoItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-todos',
  template: `
  <ng-container *ngIf="loadingService.isLoading$ | async as isLoading; else isLoadedTemplate">
    <div class="spinner-container">
      <mat-spinner></mat-spinner>
    </div>
  </ng-container>

  <ng-template #isLoadedTemplate >
    <ng-container *ngIf="this.todoService.todos$ | async as todos" >
      <app-todo-item *ngFor="let todo of todos" [todoItem]="todo"></app-todo-item>
    </ng-container>
  </ng-template>
  `,
  styles: [
    `
   .spinner-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    `
  ],
})

export class TodosComponent implements OnInit {
  todoService = inject(TodoService);
  loadingService = inject(LoadingService);
  ngOnInit(): void {
    this.todoService.get()
  }

  


}