import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Todo } from './todo.model';
import { TodoItemStore } from './todo-item.store';
import { provideComponentStore } from '@ngrx/component-store';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div>
        {{ vm.todo?.title }}
      </div>

      <div *ngIf="vm.loading">
        {{ vm.status }}
      </div>

      <div>
        <button [disabled]="vm.loading" (click)="update(vm.todo!)">
          Update
        </button>
        <button [disabled]="vm.loading" (click)="remove(vm.todo!)">
          Delete
        </button>
      </div>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(TodoItemStore)],
})
export class TodoItemComponent {
  private todoItemStore = inject(TodoItemStore);
  @Input() set todo(todo: Todo) {
    this.todoItemStore.patchState({ todo: todo });
  }

  vm$ = this.todoItemStore.vm$;

  update(todo: Todo) {
    this.todoItemStore.updateTodo(todo);
  }

  remove(todo: Todo) {
    this.todoItemStore.deleteTodo(todo.id);
  }
}
