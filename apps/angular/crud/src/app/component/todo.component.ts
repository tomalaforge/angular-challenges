import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Todo } from '../model/todo.interface';
import { Store } from '@ngrx/store';
import { TodoActions } from '../state/actions/todo.actions';
import { TodoState } from '../state/todo.state';
import { LoadingComponent } from './loading.component';

@Component({
  standalone: true,
  selector: 'app-todo',
  imports: [LoadingComponent],
  template: `
    <div class="todo-container">
      {{ todo.title }}
      <button (click)="update(todo)" [disabled]="todo.loading">update</button>
      <button (click)="delete(todo.id)" [disabled]="todo.loading">
        delete
      </button>
      @if (todo.loading) {
        <app-loading />
      }
      @if (todo.errorMsg) {
        <span>{{ todo.errorMsg }}</span>
      }
    </div>
  `,
  styles: `
    .todo-container {
      display: flex;
    }

    span {
      color: red;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @Input() todo!: Todo;

  todoStore: Store<TodoState> = inject(Store<TodoState>);

  update(todo: Todo) {
    this.todoStore.dispatch(TodoActions.callUpdateTodo({ todo: todo }));
  }

  delete(id: number) {
    this.todoStore.dispatch(TodoActions.callDeleteTodo({ id: id }));
  }
}
