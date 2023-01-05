import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LetModule } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { TodoItemComponent } from './todo-item.component';
import { TodosStore } from './todos.store';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatProgressSpinnerModule,
    LetModule,
    TodoItemComponent,
  ],
  providers: [provideComponentStore(TodosStore)],
  selector: 'app-todos',
  template: `
    <ng-container *ngrxLet="vm$ as vm">
      <mat-spinner [diameter]="20" color="blue" *ngIf="vm.loading">
      </mat-spinner>
      <ng-container *ngIf="vm.error; else noError">
        Error has occured: {{ vm.error }}
      </ng-container>
      <ng-template #noError>
        <div class="todo-container">
          <app-todo-item *ngFor="let todo of vm.todos" [todo]="todo">
          </app-todo-item>
        </div>
      </ng-template>
    </ng-container>
  `,
  styles: [
    `
      .todo-container {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private todosStore = inject(TodosStore);

  vm$ = this.todosStore.vm$;
}
