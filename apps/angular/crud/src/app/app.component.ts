import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodosComponent } from './components/todos/todos.component';
import { LoadingService } from './data-access/loading.service';
import { TodoService } from './data-access/todo.service';


@Component({
  standalone: true,
  imports: [CommonModule, TodosComponent, MatProgressSpinnerModule],

  selector: 'app-root',
  template: `
  <ng-container *ngIf="loadingService.isLoading$ | async as isLoading; else loadingTemplate">
    <div class="spinner-container">
      <mat-spinner></mat-spinner>
    </div>
  </ng-container>
  <ng-template #loadingTemplate>
   <app-todos></app-todos>
  </ng-template>
   `,
  styles: [
    `.spinner-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }`

  ],

})
export class AppComponent {
  loadingService = inject(LoadingService)
  todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.get()
  }

}
