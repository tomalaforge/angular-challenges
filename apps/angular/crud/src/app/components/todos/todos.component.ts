import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoService } from '../../data-access/todo.service';
import { LoadingService } from '../../data-access/loading.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
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
      <div class="single-todo" *ngFor="let todo of todos">
        <span> {{ todo.title }} </span>
        <span class="actions">
          <button (click)="this.todoService.update(todo)">Update</button>
          <button (click)="this.todoService.delete(todo)">Delete</button>
        </span>
      </div>
    </ng-container>
  </ng-template>
  `,
  styles: [
    `
    .single-todo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 5px;
        paddiing: 5px;
      }

      .actions{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .actions button {
        margin: 5px;
        padding: 5px 10px;
      }

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