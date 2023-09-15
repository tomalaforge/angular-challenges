import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoService } from './services/todo.service';
import { TodoItemComponent } from './components/todoItem/todo-item.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatProgressSpinnerModule, TodoItemComponent],
  selector: 'app-root',
  providers: [TodoService],
  template: `
    <ng-container *ngIf="todoService.viewModel$ | async as vm">
      <mat-progress-spinner
        mode="indeterminate"
        *ngIf="vm.isLoading; else todosTemplate"></mat-progress-spinner>

      <ng-template #todosTemplate>
        <app-todo-item
          *ngFor="let todo of vm.todos"
          [todo]="todo"></app-todo-item>
      </ng-template>
    </ng-container>
  `,
  styles: [],
})
export class AppComponent {
  public viewModel$ = this.todoService.viewModel$;
  constructor(public todoService: TodoService) {
    todoService.loadTodos();
  }
}
