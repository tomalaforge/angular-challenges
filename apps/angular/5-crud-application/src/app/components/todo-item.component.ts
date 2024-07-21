import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { TodoItemStore } from '../store/todo-item/todo-item.store';
import { Todo } from '../types';

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [CommonModule],
  providers: [provideComponentStore(TodoItemStore)],
  template: `
    <div *ngIf="vm$ | async as vm">
      {{ vm.todo.title }}
      <button
        (click)="update(vm.todo.id!)"
        [disabled]="vm.status === 'loading'">
        Update
      </button>

      <button
        (click)="delete(vm.todo.id!)"
        [disabled]="vm.status === 'loading'">
        Delete
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  private store = inject(TodoItemStore);
  vm$ = this.store.vm$;

  @Input() set todo(todo: Todo) {
    this.store.setState({
      status: 'idle',
      data: todo,
    });
  }

  update(id: number) {
    this.store.updateTodo(id);
  }

  delete(id: number) {
    this.store.deleteTodo(id);
  }
}
