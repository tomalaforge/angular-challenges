import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoConfig } from './core/Interface/todo';
import { GetToDoService } from './services/getTodo.service';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemComponent } from './shared/item.component';
import { ToDoStore } from './store/todo.store';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ItemComponent],
  providers: [ToDoStore],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <div class="spinner" *ngIf="globalLoader | async; else showData">
        <mat-spinner></mat-spinner>
      </div>
      <ng-template #showData>
        <div class="show-view" *ngFor="let todo of viewData$ | async">
          <app-item
            [config]="todo"
            (deleteTodo)="delete($event)"
            (updateTodo)="update($event)">
          </app-item>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
      html,
      body {
        height: 100vh;
      }
      .container {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .show-view {
        border: 1px solid gray;
      }
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
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 50%;
        width: 100%;
        top: 50%;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  viewData$ = this.getTodoService.data$;
  isShowSpinner: Observable<boolean> = this.getTodoService.localLoader$;
  globalLoader: Observable<boolean> = this.getTodoService.globalLoader$;
  isFirstTimeLoading = false;
  constructor(private getTodoService: GetToDoService) {}

  ngOnInit(): void {
    this.getTodoService.getTodoData();
  }

  update(todo: TodoConfig) {
    this.getTodoService.updateTodo(todo);
  }
  delete(id: number) {
    this.getTodoService.deleteTodo(id);
  }
}
