import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Todo } from '../model/todo.interface';
import { Store } from '@ngrx/store';
import { callDeleteTodo, callUpdateTodo } from '../state/actions/todo.actions';
import { TodoState } from '../state/todo.state';

@Component({
  standalone: true,
  selector: 'app-todo',
  template: `
    <div>
      {{ todo.title }}
      <button (click)="update(todo)">update</button>
      <button (click)="delete(todo.id)">delete</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @Input() todo!: Todo;

  todoStore: Store<TodoState> = inject(Store<TodoState>);

  update(todo: Todo) {
    this.todoStore.dispatch(callUpdateTodo({ todo: todo }));
  }

  delete(id: number) {
    this.todoStore.dispatch(callDeleteTodo({ id: id }));
  }
}
