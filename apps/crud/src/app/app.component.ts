import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { TodoStore } from './todos/todo.store';
import { TodoItem } from './todos/todo-item.component';
import { randText } from '@ngneat/falso';
import { Todo } from './todos/todo.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    LetDirective,
    TodoItem,
    MatProgressSpinnerModule,
    JsonPipe,
  ],
  selector: 'app-root',
  providers: [provideComponentStore(TodoStore)],
  template: `
    <ng-container *ngrxLet="vm$ as vm">
      <mat-spinner [diameter]="40" color="accent" *ngIf="vm.loading">
      </mat-spinner>

      <ng-container *ngIf="vm.error; else noerror">
        Something went wrong!
      </ng-container>

      <ng-template #noerror>
        <app-todo-item
          [todo]="todo"
          [laoding]="vm.loading"
          (update)="updateTodo($event)"
          (delete)="deleteToDo($event)"
          *ngFor="let todo of vm.todos" />
      </ng-template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class AppComponent {
  #store = inject(TodoStore);
  vm$ = this.#store.vm$;

  updateTodo(todo: Todo) {
    todo.title = randText();
    this.#store.updateToDo(todo);
  }

  deleteToDo(id: number) {
    this.#store.deleteTodo(id);
  }
}
